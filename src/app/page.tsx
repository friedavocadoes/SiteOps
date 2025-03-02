"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Plus, Clock, Search } from "lucide-react";

type Site = {
  id: number;
  name: string;
  location: string;
};

type ProgressEntry = {
  id: number;
  siteId: number;
  date: string;
  manhours: number;
  materials: string;
  expenses: number;
};

export default function MaintenanceTracker() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [newSite, setNewSite] = useState({ name: "", location: "" });
  const [newProgress, setNewProgress] = useState({
    date: "",
    manhours: 0,
    materials: "",
    expenses: 0,
  });

  const handleCreateSite = () => {
    const site = {
      id: Date.now(),
      ...newSite,
    };
    setSites([...sites, site]);
    setNewSite({ name: "", location: "" });
  };

  const handleLogProgress = () => {
    if (!selectedSite) return;

    const entry = {
      id: Date.now(),
      siteId: selectedSite.id,
      ...newProgress,
    };
    setProgressEntries([...progressEntries, entry]);
    setNewProgress({
      date: "",
      manhours: 0,
      materials: "",
      expenses: 0,
    });
  };

  const filteredProgress = selectedSite
    ? progressEntries.filter((entry) => entry.siteId === selectedSite.id)
    : [];

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Site Management */}
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
              <Card
                key={site.id}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedSite?.id === site.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedSite(site)}
              >
                <CardHeader>
                  <CardTitle>{site.name}</CardTitle>
                  <CardDescription>{site.location}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Entry */}
      {selectedSite && (
        <Card>
          <CardHeader>
            <CardTitle>Log Progress</CardTitle>
            <CardDescription>
              Track daily progress for {selectedSite.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newProgress.date}
                  onChange={(e) =>
                    setNewProgress({ ...newProgress, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Manhours</Label>
                <Input
                  type="number"
                  value={newProgress.manhours}
                  onChange={(e) =>
                    setNewProgress({
                      ...newProgress,
                      manhours: +e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Materials</Label>
                <Input
                  value={newProgress.materials}
                  onChange={(e) =>
                    setNewProgress({
                      ...newProgress,
                      materials: e.target.value,
                    })
                  }
                  placeholder="Enter materials used"
                />
              </div>
              <div className="space-y-2">
                <Label>Expenses</Label>
                <Input
                  type="number"
                  value={newProgress.expenses}
                  onChange={(e) =>
                    setNewProgress({
                      ...newProgress,
                      expenses: +e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button onClick={handleLogProgress}>
              <Plus className="mr-2 h-4 w-4" />
              Log Progress
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Data Display */}
      {selectedSite && (
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>
              Tracked progress for {selectedSite.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProgress.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{entry.date}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{entry.manhours} hours</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Materials</Label>
                        <p>{entry.materials}</p>
                      </div>
                      <div>
                        <Label>Expenses</Label>
                        <p>${entry.expenses}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
