"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 px-12 bg-black text-white shadow-md">
      {/* Left - Logo */}
      <Link href="/" className="text-xl font-bold tracking-wide">
        SiteOps
      </Link>

      {/* Middle - Links */}
      <div className="space-x-6">
        <Link href="/docs" className="hover:underline">
          Docs
        </Link>
        <Link href="/support" className="hover:underline">
          Support
        </Link>

        {user ? (
          <Link href="/inventory" className="hover:underline">
            Inventory
          </Link>
        ) : null}
      </div>

      {/* Right - Auth Button */}
      {user ? (
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-red-900 cursor-pointer"
        >
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}
