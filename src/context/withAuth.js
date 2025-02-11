import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./context";

const withAuth = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const { auth } = useAppContext();
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.push("/"); // Redireciona para login se não estiver autenticado
      }
    }, [auth, router]);

    if (!auth) {
      return null; // Pode exibir um loading aqui se quiser
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
