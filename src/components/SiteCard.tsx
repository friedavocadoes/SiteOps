"use client";
import { Card, CardHeader, CardTitle, CardDescription } from ".//ui/card";
import { Site } from "@/types";

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <Card className="cursor-pointer hover:bg-gray-50">
      <CardHeader>
        <CardTitle>{site.name}</CardTitle>
        <CardDescription>{site.location}</CardDescription>
      </CardHeader>
    </Card>
  );
}
