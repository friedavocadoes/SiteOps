"use client";
import { useState, useEffect } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import SiteCard from "../components/SiteCard";
import Navbar from "../components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Skeleton } from "../components/ui/skeleton";
import { Site } from "@/types";

// Remove the local Site type definition
// Delete or comment out:
// type Site = {
//   id: string;
//   name: string;
//   location: string;
// };

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);
  const [newSite, setNewSite] = useState({ name: "", location: "" });
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchSites();
    }
  }, [user, router]);

  // Fetch sites from Firestore
  const fetchSites = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "sites"));
    const sitesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Site[];
    setSites(sitesList);
    setLoading(false);
  };

  // Add site to Firestore
  const handleCreateSite = async () => {
    if (!newSite.name || !newSite.location) return;

    const docRef = await addDoc(collection(db, "sites"), newSite);
    setSites([...sites, { id: docRef.id, ...newSite }]);
    setNewSite({ name: "", location: "" });
  };

  // Delete site from Firestore
  const handleDeleteSite = async (siteId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this site?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "sites", siteId));
      setSites(sites.filter((site) => site.id !== siteId)); // Update UI after deletion
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 px-12 pt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Management</CardTitle>
            <CardDescription>Create and manage your sites</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Site Creation Form */}
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

            {/* Site List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-32 w-full rounded-lg"
                      />
                    ))
                : sites.map((site) => (
                    <div key={site.id} className="relative group">
                      <Link href={`/sites/${site.id}`}>
                        <SiteCard site={site} />
                      </Link>
                      {/* Delete Button */}
                      <Button
                        onClick={() => handleDeleteSite(site.id)}
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
