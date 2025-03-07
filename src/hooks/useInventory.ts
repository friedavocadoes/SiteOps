import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { InventoryItem } from "@/types";

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "inventory"), orderBy("name"));
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
    fetchInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    refreshInventory: fetchInventory,
    updateInventoryQuantity,
  };
}