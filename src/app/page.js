"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const route = useRouter();

  function Authenticate() {
    axios
      .post(`http://127.0.0.1:8000/login`, {
        email: email,
        senha: senha,
      })
      .then((e) => {
        route.push(`/gerarAntecedentes/${e.data.idUser}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-gray-900 justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Login</h1>
        <label title="Email">
          <h2>Email</h2>
          <input
            id="Email"
            type="text"
            value={email}
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label title="senha">
          <h2>Senha</h2>
          <input
            id="senha"
            type="text"
            className="text-black"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <button onClick={Authenticate}>Login</button>
      </main>
    </div>
  );
}
