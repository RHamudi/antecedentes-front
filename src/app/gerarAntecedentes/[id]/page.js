import Dashboard from "@/components/dashboard";
import Sidebar from "@/components/sidebar";

export default function gerar({ params }) {
  return (
    <main className="flex flex-row w-screen h-screen">
      <Sidebar />
      <Dashboard id={params.id} />
    </main>
  );
}
