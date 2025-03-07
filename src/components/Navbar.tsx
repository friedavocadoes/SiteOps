"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 px-6 bg-black text-white shadow-md">
      {/* Left - Logo */}
      <Link
        href={user ? "/" : "/home"}
        className="text-xl font-bold tracking-wide"
      >
        SiteOps
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/docs" className="hover:underline">
          Docs
        </Link>
        <Link href="/support" className="hover:underline">
          Support
        </Link>

        {user && (
          <>
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/inventory" className="hover:underline">
              Inventory
            </Link>
          </>
        )}
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:block">
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
      </div>

      {/* Mobile Menu (Hamburger + Sidebar) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-black text-white px-4 pt-10">
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              className="text-xl font-bold mb-10"
              onClick={() => setIsOpen(false)}
            >
              SiteOps
            </Link>
            <Link
              href="/docs"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/support"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>

            {user && (
              <>
                <Link
                  href="/"
                  className="hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/inventory"
                  className="hover:underline mb-10"
                  onClick={() => setIsOpen(false)}
                >
                  Inventory
                </Link>
              </>
            )}

            {/* Mobile Auth Buttons */}
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
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
