"use client";

import { useAppContext } from "@/context/context";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { Authenticate } = useAppContext();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-gray-100 justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center px-32 py-24 shadow-xl rounded bg-white text-black">
        <h1 className="font-bold text-3xl">Login</h1>
        <label title="Email">
          <h2 className="font-medium">Email</h2>
          <input
            id="Email"
            type="text"
            value={email}
            className="text-black p-1 border-2 border-solid shadow-xl rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label title="senha">
          <h2 className="font-medium">Senha</h2>
          <input
            id="senha"
            type="password"
            className="text-black p-1 border-2 border-solid shadow-xl rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <button
          className="border-2l rounded border-solid bg-blue-700 text-white px-10 py-2"
          onClick={() => Authenticate(email, senha)}
        >
          Login
        </button>
      </main>
    </div>
  );
}
