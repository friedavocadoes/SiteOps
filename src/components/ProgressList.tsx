import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type ProgressEntry = {
  id: string;
  siteId: string;
  date: string;
  materialName: string;
  manhours: number;
  expenses: number;
};

type ProgressListProps = {
  progressEntries: ProgressEntry[];
  onDeleteProgress: (id: string) => void;
};

export default function ProgressList({
  progressEntries,
  onDeleteProgress,
}: ProgressListProps) {
  return (
    <div className="space-y-4">
      {progressEntries.map((entry) => (
        <div
          key={entry.id}
          className="p-4 border rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{entry.materialName}</p>
            <p className="text-sm">
              Date: {entry.date} | Manhours: {entry.manhours} | Expenses: $
              {entry.expenses}
            </p>
          </div>
          <Button
            onClick={() => onDeleteProgress(entry.id)}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
