"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

type Material = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  dateAdded: Timestamp;
};

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

export default function SiteDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];

  const [materials, setMaterials] = useState<Material[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date");
  const [useInventory, setUseInventory] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    price: "",
    date: "",
  });
  const [quantityError, setQuantityError] = useState<string>("");
  const [selectedInventoryItem, setSelectedInventoryItem] =
    useState<InventoryItem | null>(null);

  useEffect(() => {
    if (id) fetchMaterials();
    fetchInventory();
  }, [id]);

  useEffect(() => {
    sortMaterials(sortOption);
  }, [sortOption]);

  const fetchMaterials = async () => {
    if (!id) return;

    const querySnapshot = await getDocs(
      collection(db, `sites/${id}/materials`)
    );
    const materialsData: Material[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Material[];

    setMaterials(materialsData);
    setLoading(false);
  };

  const fetchInventory = async () => {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const inventoryData: InventoryItem[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as InventoryItem[];

    setInventory(inventoryData);
  };

  const handleAddMaterial = async () => {
    if (
      !id ||
      !newMaterial.name ||
      !newMaterial.quantity ||
      !newMaterial.price ||
      !newMaterial.date
    )
      return;

    const selectedItem = inventory.find(
      (item) => item.name === newMaterial.name
    );
    if (!selectedItem) {
      setQuantityError("Material not found in inventory!");
      return;
    }

    const requestedQuantity = Number(newMaterial.quantity);
    if (requestedQuantity > selectedItem.quantity) {
      setQuantityError(
        `Exceeds available quantity (${selectedItem.quantity} units)`
      );
      return;
    }

    const newMaterialData = {
      name: newMaterial.name,
      quantity: requestedQuantity,
      price: Number(newMaterial.price),
      dateAdded: Timestamp.fromDate(new Date(newMaterial.date)),
    };

    const docRef = await addDoc(
      collection(db, `sites/${id}/materials`),
      newMaterialData
    );

    // Update inventory quantity
    const updatedInventory = inventory.map((item) =>
      item.id === selectedItem.id
        ? { ...item, quantity: item.quantity - requestedQuantity }
        : item
    );

    setInventory(updatedInventory);
    setMaterials([...materials, { id: docRef.id, ...newMaterialData }]);
    setNewMaterial({ name: "", quantity: "", price: "", date: "" });
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!id || !confirm("Are you sure you want to delete this material?"))
      return;

    await deleteDoc(doc(db, `sites/${id}/materials`, id));
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const sortMaterials = (option: string) => {
    const sortedMaterials = [...materials];

    if (option === "date") {
      sortedMaterials.sort(
        (a, b) => b.dateAdded.toMillis() - a.dateAdded.toMillis()
      );
    } else if (option === "name") {
      sortedMaterials.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "price") {
      sortedMaterials.sort((a, b) => a.price - b.price);
    }

    setMaterials(sortedMaterials);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Card className="px-12 pt-16">
          <CardHeader>
            <CardTitle>Site Materials Log</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Inventory Selection Button */}
            <div className="mb-2 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setUseInventory(!useInventory)}
              >
                {useInventory ? "Enter Manually" : "Choose from Inventory"}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-12 mb-4 mt-4">
              {/* Conditional Rendering: Show Inventory Dropdown OR Manual Input */}

              <div>
                {useInventory ? (
                  <Select
                    onValueChange={(value) => {
                      const selected = inventory.find(
                        (item) => item.name === value
                      );
                      setSelectedInventoryItem(selected || null);
                      setNewMaterial({ ...newMaterial, name: value });
                      setQuantityError(""); // Clear any existing errors
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select from Inventory" />
                    </SelectTrigger>

                    <SelectContent>
                      {inventory.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    placeholder="Material Name"
                    value={newMaterial.name}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, name: e.target.value })
                    }
                  />
                )}
                {selectedInventoryItem && (
                  <p className="text-sm text-gray-500 ml-2 mt-2">
                    Available: {selectedInventoryItem.quantity} units
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Quantity"
                  type="number"
                  value={newMaterial.quantity}
                  onChange={(e) => {
                    const requestedQuantity = Number(e.target.value);
                    if (
                      selectedInventoryItem &&
                      requestedQuantity > selectedInventoryItem.quantity
                    ) {
                      setQuantityError(
                        `Exceeds available quantity (${selectedInventoryItem.quantity} units)`
                      );
                    } else {
                      setQuantityError("");
                    }
                    setNewMaterial({
                      ...newMaterial,
                      quantity: e.target.value,
                    });
                  }}
                  className={quantityError ? "border-red-500" : ""}
                />
                {quantityError && (
                  <div className="text-red-500 text-sm mt-1">
                    {quantityError}
                  </div>
                )}
              </div>

              <Input
                placeholder="Price"
                type="number"
                value={newMaterial.price}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, price: e.target.value })
                }
              />
              <Input
                type="date"
                value={newMaterial.date}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, date: e.target.value })
                }
              />
            </div>

            <Button
              onClick={handleAddMaterial}
              className="cursor-pointer"
              disabled={
                useInventory &&
                (!!quantityError || !newMaterial.quantity || !newMaterial.name)
              }
            >
              Log Material
            </Button>

            {/* Sort Dropdown */}
            <div className="mb-4 mt-12">
              <Select onValueChange={setSortOption} defaultValue="date">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest First)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price">Price (Lowest First)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex justify-between items-center p-2 border rounded mt-2"
                  >
                    <span>
                      {material.name} - {material.quantity} units - $
                      {material.price} -{" "}
                      <span className="text-gray-500 text-sm">
                        {new Date(
                          material.dateAdded.toMillis()
                        ).toLocaleDateString()}
                      </span>
                    </span>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteMaterial(material.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
