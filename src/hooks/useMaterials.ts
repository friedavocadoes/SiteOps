import { useState, useEffect } from "react";
import { Material } from "@/types";
import { db } from "@/app/firebase/config";
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";

export function useMaterials(siteId: string) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    if (!siteId) return;
    
    try {
      const q = query(
        collection(db, `sites/${siteId}/materials`),
        orderBy("dateAdded", "desc")
      );
      const querySnapshot = await getDocs(q);
      const materialsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Material[];
      setMaterials(materialsData);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async (materialData: any) => {
    if (!siteId) return;

    try {
      const docRef = await addDoc(collection(db, `sites/${siteId}/materials`), {
        ...materialData,
        dateAdded: Timestamp.fromDate(new Date(materialData.date)),
      });
      const newMaterial = {
        id: docRef.id,
        ...materialData,
        dateAdded: Timestamp.fromDate(new Date(materialData.date)),
      };
      setMaterials([newMaterial, ...materials]);
    } catch (error) {
      console.error("Error adding material:", error);
      throw error;
    }
  };

  const deleteMaterial = async (materialId: string) => {
    if (!siteId) return;

    try {
      await deleteDoc(doc(db, `sites/${siteId}/materials`, materialId));
      setMaterials(materials.filter((m) => m.id !== materialId));
    } catch (error) {
      console.error("Error deleting material:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [siteId]);

  return { materials, loading, addMaterial, deleteMaterial };
}