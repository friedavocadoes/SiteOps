import { Card, CardHeader, CardContent, CardTitle } from ".//ui/card";
import { Label } from "./ui/label";
import { Clock } from "lucide-react";

type ProgressEntry = {
  id: number;
  siteId: number;
  date: string;
  materialName: string;
  manhours: number;
  expenses: number;
};

export default function ProgressList({
  progressEntries,
}: {
  progressEntries: ProgressEntry[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Progress Overview</h2>
      {progressEntries.map((entry) => (
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
  );
}
