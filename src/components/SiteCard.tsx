"use client";
import { Card, CardHeader, CardTitle, CardDescription } from ".//ui/card";

type Site = {
  id: number;
  name: string;
  location: string;
};

export default function SiteCard({ site }: { site: Site }) {
  return (
    <Card className="cursor-pointer hover:bg-gray-50">
      <CardHeader>
        <CardTitle>{site.name}</CardTitle>
        <CardDescription>{site.location}</CardDescription>
      </CardHeader>
    </Card>
  );
}
