"use client";

import { useState, use } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import ProgressForm from "../../../components/ProgressForm";
import ProgressList from "../../../components/ProgressList";
import Navbar from "@/components/Navbar";

type ProgressEntry = {
  id: number;
  siteId: number;
  date: string;
  materialName: string;
  manhours: number;
  expenses: number;
};

export default function SiteDetails() {
  const params = useParams(); // Unwrapping the params using useParams()
  const siteId = parseInt(params.id as string, 10);

  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);

  const handleLogProgress = (
    newProgress: Omit<ProgressEntry, "id" | "siteId">
  ) => {
    const entry: ProgressEntry = {
      id: Date.now(),
      siteId,
      ...newProgress,
    };
    setProgressEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-8 px-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Details</CardTitle>
            <CardDescription>Manage progress for this site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ProgressForm onLogProgress={handleLogProgress} />
            <ProgressList progressEntries={progressEntries} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
