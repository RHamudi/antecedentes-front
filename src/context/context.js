"use client"; // Context precisa rodar no client

import { useRouter } from "next/navigation";
import axios from "axios";
import { createContext, useContext, useState } from "react";

// Cria o contexto
const AppContext = createContext();

// Criar Provider
export function AppProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [nome, setNome] = useState("");
  const [userId, setUserId] = useState();
  const route = useRouter();
  function Logout() {
    setAuth(false);
  }

  function Authenticate(email, senha) {
    axios
      .post(`http://82.29.56.109/login`, {
        email: email,
        senha: senha,
      })
      .then((e) => {
        setAuth(true);
        setNome(e.name);
        setUserId(e.id);
        route.push(`/gerarAntecedentes/${e.data.idUser}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <AppContext.Provider value={{ auth, nome, userId, Authenticate, Logout }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook para facilitar o acesso ao contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}
