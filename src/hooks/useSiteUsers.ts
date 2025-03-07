import { useState, useEffect } from "react";
import { SiteUser } from "@/types";
import { db } from "@/app/firebase/config";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export function useSiteUsers(siteId: string) {
  const [siteUsers, setSiteUsers] = useState<SiteUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSiteUsers = async () => {
    if (!siteId) return;

    try {
      const q = query(collection(db, `sites/${siteId}/users`));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        email: doc.id,
        ...doc.data(),
      })) as SiteUser[];
      setSiteUsers(usersData);
    } catch (error) {
      console.error("Error fetching site users:", error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData: Omit<SiteUser, "id">) => {
    if (!siteId) return;

    try {
      // Add user to site's users collection
      await setDoc(doc(db, `sites/${siteId}/users`, userData.email), {
        permissions: userData.permissions,
      });

      // Add site to user's sites collection
      await updateDoc(doc(db, "users", userData.email), {
        [`sites.${siteId}`]: {
          role: "member",
          permissions: userData.permissions,
        },
      });

      setSiteUsers([...siteUsers, userData]);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSiteUsers();
  }, [siteId]);

  return { siteUsers, loading, addUser };
}