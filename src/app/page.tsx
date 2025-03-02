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
  materialName: string;
  manhours: number;
  expenses: number;
};

export default function MaintenanceTracker() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [newSite, setNewSite] = useState({ name: "", location: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newProgress, setNewProgress] = useState({
    date: "",
    materialName: "",
    manhours: 0,
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
      materialName: "",
      manhours: 0,
      expenses: 0,
    });
    setShowCustomForm(false);
    setShowAddModal(false);
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
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Progress
            </Button>

            {/* Add Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Add Progress</CardTitle>
                    <CardDescription>
                      Choose how to add progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Add from Inventory (do nothing for now)
                        setShowAddModal(false);
                      }}
                    >
                      Add from Inventory
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setShowCustomForm(true);
                      }}
                    >
                      Add Custom
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Custom Form */}
            {showCustomForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Add Custom Progress</CardTitle>
                    <CardDescription>
                      Enter details for the progress entry
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newProgress.date}
                        onChange={(e) =>
                          setNewProgress({
                            ...newProgress,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Material Name</Label>
                      <Input
                        value={newProgress.materialName}
                        onChange={(e) =>
                          setNewProgress({
                            ...newProgress,
                            materialName: e.target.value,
                          })
                        }
                        placeholder="Enter material name"
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
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCustomForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleLogProgress}>Save</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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
                        <Label>Material</Label>
                        <p>{entry.materialName}</p>
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
