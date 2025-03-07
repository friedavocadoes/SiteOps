"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
// import { UserCredential } from "firebase/auth";

type UserData = {
  email: string | null;
  name: string | null;
  sites: {
    [siteId: string]: {
      role: "owner" | "member";
      permissions?: {
        addLogs: boolean;
        editInventory: boolean;
        deleteLogs: boolean;
      };
    };
  };
  createdAt: string;
};

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await login(); // Remove the type assertion, it's handled by AuthContext

      if (userCredential.user?.email) {
        const userRef = doc(db, "users", userCredential.user.email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          const userData: UserData = {
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            sites: {},
            createdAt: new Date().toISOString(),
          };

          await setDoc(userRef, userData);
        }
      } else {
        throw new Error("Failed to get user email");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
