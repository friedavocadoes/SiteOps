"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const {
    user,
    loginWithGoogle,
    // loginWithGitHub,
    loginWithEmail,
    registerWithEmail,
    // sendEmailVerification,
  } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    router.push("/");
    return null;
  }

  const handleLoginOrRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      await loginWithEmail(email, password);
      router.push("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code.includes("auth/invalid-credential")) {
        const confirmRegister = confirm(
          "User not found. Do you want to create an account?"
        );
        if (confirmRegister) {
          try {
            await registerWithEmail(email, password);
            // await sendEmailVerification();
            // alert(
            //   "A verification email has been sent. Please verify before logging in."
            // );
          } catch (regError) {
            setError("Failed to register. Please try again.");
            console.error(regError);
          }
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
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
              onClick={() => loginWithGoogle()}
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
            {/* <Button
              onClick={() => loginWithGitHub()}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign in with GitHub"
              )}
            </Button> */}

            <div className="relative flex items-center justify-center py-2">
              <div className="w-full border-b border-gray-600"></div>
              <span className="absolute px-2 bg-black text-gray-400">OR</span>
            </div>

            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLoginOrRegister}
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login / Register"
                )}
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="space-y-2">
              <Link
                href="/login/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
