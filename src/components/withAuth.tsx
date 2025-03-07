import { useRouter } from "next/navigation";
import useAuthState from "@/hooks/useAuthState";
import { ComponentType, useEffect } from "react";
import Navbar from "./Navbar";

const withAuth = (WrappedComponent: ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user, isLoading } = useAuthState();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
      return (
        <>
          <Navbar />
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
