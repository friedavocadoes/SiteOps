"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import SiteCard from "../components/SiteCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

type Site = {
  id: number;
  name: string;
  location: string;
};

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);
  const [newSite, setNewSite] = useState({ name: "", location: "" });
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleCreateSite = () => {
    const site = {
      id: Date.now(),
      ...newSite,
    };
    setSites([...sites, site]);
    setNewSite({ name: "", location: "" });
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="container mx-auto p-4 px-12 pt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Management</CardTitle>
            <CardDescription>Create and manage your sites</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Site Name</Label>
                <Input
                  value={newSite.name}
                  onChange={(e) =>
                    setNewSite({ ...newSite, name: e.target.value })
                  }
                  placeholder="Enter site name"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={newSite.location}
                  onChange={(e) =>
                    setNewSite({ ...newSite, location: e.target.value })
                  }
                  placeholder="Enter location"
                />
              </div>
            </div>
            <Button onClick={handleCreateSite}>
              <Plus className="mr-2 h-4 w-4" />
              Create Site
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sites.map((site) => (
                <Link key={site.id} href={`/sites/${site.id}`}>
                  <SiteCard site={site} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
