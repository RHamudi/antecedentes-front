"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ id }) {
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/tasks/${id}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Selecione um arquivo primeiro!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/upload/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Upload concluído com sucesso!");
      } else {
        alert("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className="w-full bg-white text-black">
      <header className="flex justify-between p-6">
        <input
          type="search"
          id="search"
          className="block w-96 p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          required
        />

        <div>Logout</div>
      </header>
      <section>
        <div className="flex flex-row justify-between p-5">
          <h1>Dashboard</h1>
          <div>
            <input
              placeholder="Escolha um arquivo"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
            >
              Enviar
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Dowload
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium tex-black whitespace-nowrap"
                  >
                    {task.fileName}
                  </th>
                  <td className="px-6 py-4">{task.status}</td>
                  <td className="px-6 py-4">
                    <a
                      target="_blank"
                      href={`http://127.0.0.1:8000/uploads/${task.id}/download`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Baixar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
