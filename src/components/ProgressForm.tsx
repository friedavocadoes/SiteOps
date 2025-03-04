import { useState } from "react";
import { Button } from ".//ui/button";
import { Input } from ".//ui/input";
import { Label } from ".//ui/label";
import { Plus } from "lucide-react";

type ProgressEntry = {
  date: string;
  materialName: string;
  manhours: number;
  expenses: number;
};

export default function ProgressForm({
  onLogProgress,
}: {
  onLogProgress: (entry: ProgressEntry) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newProgress, setNewProgress] = useState<ProgressEntry>({
    date: "",
    materialName: "",
    manhours: 0,
    expenses: 0,
  });

  const handleLogProgress = () => {
    onLogProgress(newProgress);
    setNewProgress({
      date: "",
      materialName: "",
      manhours: 0,
      expenses: 0,
    });
    setShowCustomForm(false);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowAddModal(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Progress
      </Button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Progress</h2>
            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      )}

      {/* Custom Form */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Custom Progress</h2>
            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
