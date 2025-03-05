"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config"; // Firebase setup
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

type Material = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const materialsData: Material[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "Unknown", // Ensure name exists
        quantity: data.quantity ?? 0, // Default to 0 if undefined
        price: data.price ?? 0, // Default to 0 if undefined
      };
    });
    setMaterials(materialsData);
    setLoading(false);
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.name || !newMaterial.quantity || !newMaterial.price)
      return;

    const newMaterialData = {
      name: newMaterial.name,
      quantity: Number(newMaterial.quantity), // Ensure quantity is a number
      price: Number(newMaterial.price), // Ensure price is a number
    };

    const docRef = await addDoc(collection(db, "inventory"), newMaterialData);

    setMaterials([...materials, { id: docRef.id, ...newMaterialData }]);
    setNewMaterial({ name: "", quantity: "", price: "" });
  };

  const handleDeleteMaterial = async (id: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      await deleteDoc(doc(db, "inventory", id));
      setMaterials(materials.filter((material) => material.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4 w-20 cursor-pointer"
        >
          ← Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Material Name"
                value={newMaterial.name}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, name: e.target.value })
                }
              />
              <Input
                placeholder="Quantity"
                type="number"
                value={newMaterial.quantity}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, quantity: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={newMaterial.price}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, price: e.target.value })
                }
              />
            </div>
            <Button onClick={handleAddMaterial}>Add Material</Button>
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
                      {material.price}
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
