import { Material } from "@/types";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Trash2 } from "lucide-react";

interface MaterialsListProps {
  materials: Material[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export function MaterialsList({
  materials,
  loading,
  onDelete,
}: MaterialsListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map((material) => (
          <TableRow key={material.id}>
            <TableCell>{material.name}</TableCell>
            <TableCell>{material.quantity}</TableCell>
            <TableCell>${material.price}</TableCell>
            <TableCell>
              {material.dateAdded.toDate().toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                className=" cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(material.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
