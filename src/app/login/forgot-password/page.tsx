"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ForgotPasswordPage() {
  const { sendPasswordResetEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(resetEmail);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Failed to send password reset email. Please try again.");
      console.log(error);
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
            <CardTitle className="text-white">Forgot Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email to reset password"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <Button
                onClick={handlePasswordReset}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
