import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const useAuthState = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  return { user, isLoading };
};

export default useAuthState;