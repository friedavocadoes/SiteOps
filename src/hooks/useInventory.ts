import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { InventoryItem } from "@/types";

export function useInventory(userId: string) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "inventory"), where("users", "array-contains", userId));
      const querySnapshot = await getDocs(q);
      
      const inventoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as InventoryItem[];

      setInventory(inventoryData);
      setError(null);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const updateInventoryQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateDoc(doc(db, "inventory", itemId), {
        quantity: newQuantity,
      });
      setInventory((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating inventory quantity:", err);
      throw new Error("Failed to update inventory quantity");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchInventory();
    }
  }, [userId]);

  return {
    inventory,
    loading,
    error,
    refreshInventory: fetchInventory,
    updateInventoryQuantity,
  };
}