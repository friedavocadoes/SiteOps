import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

type ProgressEntry = {
  date: string;
  materialName: string;
  manhours: number;
  expenses: number;
};

type ProgressFormProps = {
  onLogProgress: (newProgress: ProgressEntry) => void;
  materials: string[];
};

export default function ProgressForm({
  onLogProgress,
  materials,
}: ProgressFormProps) {
  const [newProgress, setNewProgress] = useState<ProgressEntry>({
    date: "",
    materialName: "",
    manhours: 0,
    expenses: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!newProgress.date || !newProgress.materialName) return;
    onLogProgress(newProgress);
    setNewProgress({ date: "", materialName: "", manhours: 0, expenses: 0 });
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Progress</Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="p-6 w-96 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Log Progress</h2>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                ✖
              </Button>
            </div>

            <Label>Date</Label>
            <Input
              type="date"
              value={newProgress.date}
              onChange={(e) =>
                setNewProgress({ ...newProgress, date: e.target.value })
              }
            />

            <Label>Material</Label>
            <select
              className="w-full p-2 border rounded"
              value={newProgress.materialName}
              onChange={(e) =>
                setNewProgress({ ...newProgress, materialName: e.target.value })
              }
            >
              <option value="">Select material</option>
              {materials.map((mat, idx) => (
                <option key={idx} value={mat}>
                  {mat}
                </option>
              ))}
            </select>

            <Label>Manhours</Label>
            <Input
              type="number"
              value={newProgress.manhours}
              onChange={(e) =>
                setNewProgress({
                  ...newProgress,
                  manhours: Number(e.target.value),
                })
              }
            />

            <Label>Expenses</Label>
            <Input
              type="number"
              value={newProgress.expenses}
              onChange={(e) =>
                setNewProgress({
                  ...newProgress,
                  expenses: Number(e.target.value),
                })
              }
            />

            <Button onClick={handleSubmit}>Save</Button>
          </Card>
        </div>
      )}
    </>
  );
}
