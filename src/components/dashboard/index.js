"use client";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ id }) {
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { Logout } = useAppContext();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/tasks/${id}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

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
        setRefresh((prev) => prev + 1);
      } else {
        alert("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className="w-full bg-white text-black z-0">
      <header className="flex justify-between p-6">
        <input
          type="search"
          id="search"
          className="block w-96 p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          required
        />

        <button
          type="button"
          onClick={() => Logout()}
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Sair
        </button>
      </header>
      <section>
        <div className="flex flex-row justify-between p-5">
          <button
            onClick={() => {
              setRefresh((prev) => prev + 1);
            }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded text-sm px-5 py-2.5 "
          >
            Atualizar
          </button>
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
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded text-sm px-5 py-2.5"
            >
              Enviar
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                <tr key={index} className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {task.fileName}
                  </th>
                  {task.status == "Concluido" ? (
                    <td className="px-6 py-4 text-green-700">{task.status}</td>
                  ) : (
                    <td className="px-6 py-4">{task.status}</td>
                  )}
                  <td className="px-6 py-4">
                    {task.status === "processando" ? (
                      <span className="font-medium text-gray-400 cursor-not-allowed">
                        Baixar
                      </span>
                    ) : (
                      <a
                        target="_blank"
                        href={`http://127.0.0.1:8000/uploads/${task.id}/download`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Baixar
                      </a>
                    )}
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
