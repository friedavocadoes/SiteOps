import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { InventoryItem } from "@/types";

interface MaterialsFormProps {
  useInventory: boolean;
  inventory: InventoryItem[];
  onAddMaterial: (material: any) => Promise<void>;
  onToggleInventory: () => void;
}

export function MaterialsForm({
  useInventory,
  inventory,
  onAddMaterial,
  onToggleInventory,
}: MaterialsFormProps) {
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    price: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [quantityError, setQuantityError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (useInventory) {
      const selectedItem = inventory.find(
        (item) => item.name === newMaterial.name
      );
      if (!selectedItem) {
        setQuantityError("Item not found in inventory");
        return;
      }
      if (Number(newMaterial.quantity) > selectedItem.quantity) {
        setQuantityError(
          `Exceeds available quantity (${selectedItem.quantity})`
        );
        return;
      }
    }
    await onAddMaterial(newMaterial);
    setNewMaterial({
      name: "",
      quantity: "",
      price: "",
      date: new Date().toISOString().split("T")[0],
    });
    setQuantityError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-end space-x-2">
        <Label htmlFor="useInventory">Use Inventory</Label>
        <Switch
          id="useInventory"
          checked={useInventory}
          onCheckedChange={onToggleInventory}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {useInventory ? (
          <div className="space-y-2">
            <Label>Material</Label>
            <Select
              value={newMaterial.name}
              onValueChange={(value) =>
                setNewMaterial({ ...newMaterial, name: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {inventory.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name} ({item.quantity} available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Material Name</Label>
            <Input
              value={newMaterial.name}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, name: e.target.value })
              }
              placeholder="Enter material name"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            value={newMaterial.quantity}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, quantity: e.target.value })
            }
            placeholder="Enter quantity"
            required
          />
          {quantityError && (
            <p className="text-red-500 text-sm">{quantityError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            type="number"
            value={newMaterial.price}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, price: e.target.value })
            }
            placeholder="Enter price"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={newMaterial.date}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, date: e.target.value })
            }
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Material
      </Button>
    </form>
  );
}
