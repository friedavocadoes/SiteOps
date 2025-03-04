"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleLogin = async () => {
    setLoading(true);
    await login();
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-6 text-center bg-black shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
