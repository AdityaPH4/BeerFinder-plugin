export type InventoryStatus =
  | "IN_STOCK"
  | "LOW_STOCK"
  | "OUT_OF_STOCK";

export interface InventoryItem {
  productId: string;
  productName: string;
  category: string;
  speciality: string;
  quantity: number;
  available: boolean;
}

export interface Outlet {
  id: string;
  code: string;

  name: string;
  address: string;
  area: string;
  city: string;

  latitude: number;
  longitude: number;

  phone?: string;

  status: "OPEN" | "CLOSED";

  inventoryStatus: InventoryStatus;

  distanceKm: number;
  travelTimeMinutes: number;

  inventoryUpdatedAt: string;

  inventory: InventoryItem[];
}

export interface BeerFinderFilters {
  query: string;
  category: string;
  speciality: string;
  stockOnly: boolean;
}