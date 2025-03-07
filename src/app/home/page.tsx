"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaTools, FaClipboardList, FaUsers } from "react-icons/fa";
import { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="flex flex-col pt-28 items-center justify-center text-center py-20 px-10 bg-black text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            SiteOps: Smart Site Management
          </h1>
          <p className="text-xl mt-8 md:mt-4 mb-6 max-w-2xl">
            Track your construction sites, manage inventory, and collaborate
            effortlessly.
          </p>
          <div className="flex flex-col my-10 sm:flex-row gap-4">
            <Button
              asChild
              className="px-10 py-6 text-lg w-full bg-black sm:w-auto"
              variant="outline"
            >
              <Link href={user ? "/" : "/login"}>Get Started</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="px-6 py-6 text-lg text-black w-full sm:w-auto"
            >
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaTools size={40} className="text-blue-500" />}
            title="Site Management"
            description="Monitor and manage all your construction sites in one place."
          />
          <FeatureCard
            icon={<FaClipboardList size={40} className="text-green-500" />}
            title="Inventory Tracking"
            description="Keep track of material usage and deliveries with ease."
          />
          <FeatureCard
            icon={<FaUsers size={40} className="text-purple-500" />}
            title="Team Collaboration"
            description="Invite team members and manage projects efficiently."
          />
        </section>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center p-6">
      <CardContent className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
