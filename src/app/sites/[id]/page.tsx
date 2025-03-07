"use client";

import { useState } from "react";
import { AddUserDialog } from "@/components/AddUserDialog";
import { MaterialsForm } from "@/components/MaterialsForm";
import { MaterialsList } from "@/components/MaterialsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useMaterials } from "@/hooks/useMaterials";
import { useSiteUsers } from "@/hooks/useSiteUsers";
import { useInventory } from "@/hooks/useInventory";
import { SiteUser } from "@/types";
import { doc, updateDoc } from "firebase/firestore"; // Add this import
import { db } from "@/app/firebase/config";

export default function SiteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];

  if (!id) {
    return <div>Error: Site ID is required</div>;
  }

  const [showAddUser, setShowAddUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [useInventoryState, setUseInventoryState] = useState(false);

  const { materials, loading, addMaterial, deleteMaterial } = useMaterials(id);
  const { addUser } = useSiteUsers(id);
  const { inventory, updateInventoryQuantity } = useInventory();

  const handleAddUser = async (userData: Omit<SiteUser, "id">) => {
    try {
      await addUser(userData);
      setShowAddUser(false);
      setUserError(null);
    } catch (error) {
      setUserError("Failed to add user. Please try again.");
    }
  };

  const handleAddMaterial = async (materialData: any) => {
    try {
      if (useInventoryState) {
        const selectedItem = inventory.find(
          (item) => item.name === materialData.name
        );
        if (selectedItem) {
          const newQuantity =
            selectedItem.quantity - Number(materialData.quantity);
          await updateDoc(doc(db, "inventory", selectedItem.id), {
            quantity: newQuantity,
          });
          updateInventoryQuantity(selectedItem.id, newQuantity);
        }
      }
      await addMaterial(materialData);
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-20 cursor-pointer"
          >
            ← Back
          </Button>
          <Button
            onClick={() => setShowAddUser(true)}
            variant="outline"
            className="cursor-pointer"
          >
            + Add User
          </Button>
        </div>

        {showAddUser && (
          <AddUserDialog
            onAddUser={handleAddUser}
            onClose={() => setShowAddUser(false)}
            error={userError}
          />
        )}

        <Card className="px-12 pt-16">
          <CardHeader>
            <CardTitle>Site Materials Log</CardTitle>
          </CardHeader>
          <CardContent>
            <MaterialsForm
              useInventory={useInventoryState}
              inventory={inventory}
              onAddMaterial={handleAddMaterial}
              onToggleInventory={() => setUseInventoryState(!useInventoryState)}
            />

            <MaterialsList
              materials={materials}
              loading={loading}
              onDelete={deleteMaterial}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
