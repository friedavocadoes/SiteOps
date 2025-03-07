import { Timestamp } from "firebase/firestore";

export type Site = {
  id: string;
  name: string;
  location: string;
  userId: string;
  createdAt: string;
};

export type Material = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  dateAdded: Timestamp;
};

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

export type SiteUser = {
  email: string;
  permissions: {
    addLogs: boolean;
    editInventory: boolean;
    deleteLogs: boolean;
  };
};