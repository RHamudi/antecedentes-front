"use client";

import Dashboard from "@/components/dashboard";
import Sidebar from "@/components/sidebar";
import { useAppContext } from "@/context/context";
import withAuth from "@/context/withAuth";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

function gerar({ params }) {
  const { id } = use(params);
  const { auth } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login"); // Redireciona para login
    }
  }, [auth, router]);

  if (!auth) {
    return null; // Pode exibir um loading aqui se quiser
  }

  return (
    <main className="flex flex-row w-screen h-screen">
      <Sidebar />
      <Dashboard id={id} />
    </main>
  );
}

export default withAuth(gerar);
