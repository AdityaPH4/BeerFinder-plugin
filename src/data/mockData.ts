import type { Outlet } from "../types";

const inventory = (
  rows: Array<
    [string, string, string, string, number]
  >
) =>
  rows.map(
    ([
      productId,
      productName,
      category,
      speciality,
      quantity,
    ]) => ({
      productId,
      productName,
      category,
      speciality,
      quantity,
      available: quantity > 0,
    })
  );

export const mockOutlets: Outlet[] = [
  {
    id: "outlet-001",
    code: "BLR001",

    name: "Chinmaya Mission Hospital Rd",

    address:
      "487/2, Chinmaya Mission Hospital Rd, Indira Nagar 1st Stage, Bengaluru, Karnataka 560038",

    area: "Indiranagar",
    city: "Bengaluru",

    latitude: 12.971891,
    longitude: 77.641151,

    status: "OPEN",
    inventoryStatus: "IN_STOCK",

    distanceKm: 0.5,
    travelTimeMinutes: 3,

    inventoryUpdatedAt:
      new Date().toISOString(),

    inventory: inventory([
      [
        "KF-PREM-500",
        "Kingfisher Premium 500ml",
        "Beer",
        "Premium Lager",
        24,
      ],
      [
        "KF-ULTRA-500",
        "Kingfisher Ultra 500ml",
        "Beer",
        "Premium Lager",
        16,
      ],
      [
        "BUD-500",
        "Budweiser 500ml",
        "Beer",
        "Lager",
        11,
      ],
      [
        "CORONA-330",
        "Corona Extra 330ml",
        "Beer",
        "Imported",
        8,
      ],
      [
        "HEINE-500",
        "Heineken 500ml",
        "Beer",
        "Imported",
        5,
      ],
    ]),
  },

  {
    id: "outlet-002",
    code: "BLR002",

    name: "Indiranagar 100 Feet Road",

    address:
      "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",

    area: "Indiranagar",
    city: "Bengaluru",

    latitude: 12.9699,
    longitude: 77.6412,

    status: "OPEN",
    inventoryStatus: "IN_STOCK",

    distanceKm: 0.8,
    travelTimeMinutes: 4,

    inventoryUpdatedAt:
      new Date().toISOString(),

    inventory: inventory([
      [
        "KF-PREM-500",
        "Kingfisher Premium 500ml",
        "Beer",
        "Premium Lager",
        32,
      ],
      [
        "BUD-500",
        "Budweiser 500ml",
        "Beer",
        "Lager",
        18,
      ],
      [
        "CORONA-330",
        "Corona Extra 330ml",
        "Beer",
        "Imported",
        13,
      ],
      [
        "HEINE-500",
        "Heineken 500ml",
        "Beer",
        "Imported",
        7,
      ],
    ]),
  },

  {
    id: "outlet-003",
    code: "BLR003",

    name: "Koramangala 5th Block",

    address:
      "80 Feet Road, Koramangala 5th Block, Bengaluru, Karnataka 560095",

    area: "Koramangala",
    city: "Bengaluru",

    latitude: 12.9345,
    longitude: 77.6139,

    status: "OPEN",
    inventoryStatus: "LOW_STOCK",

    distanceKm: 5.2,
    travelTimeMinutes: 17,

    inventoryUpdatedAt:
      new Date().toISOString(),

    inventory: inventory([
      [
        "KF-PREM-500",
        "Kingfisher Premium 500ml",
        "Beer",
        "Premium Lager",
        4,
      ],
      [
        "BUD-500",
        "Budweiser 500ml",
        "Beer",
        "Lager",
        2,
      ],
      [
        "CORONA-330",
        "Corona Extra 330ml",
        "Beer",
        "Imported",
        0,
      ],
    ]),
  },

  {
    id: "outlet-004",
    code: "BLR004",

    name: "HSR Layout",

    address:
      "27th Main Road, HSR Layout, Bengaluru, Karnataka 560102",

    area: "HSR Layout",
    city: "Bengaluru",

    latitude: 12.9121,
    longitude: 77.6446,

    status: "OPEN",
    inventoryStatus: "OUT_OF_STOCK",

    distanceKm: 8.4,
    travelTimeMinutes: 26,

    inventoryUpdatedAt:
      new Date().toISOString(),

    inventory: inventory([
      [
        "KF-PREM-500",
        "Kingfisher Premium 500ml",
        "Beer",
        "Premium Lager",
        0,
      ],
      [
        "BUD-500",
        "Budweiser 500ml",
        "Beer",
        "Lager",
        0,
      ],
    ]),
  },

  {
    id: "outlet-005",
    code: "BLR005",

    name: "Whitefield Main Road",

    address:
      "Whitefield Main Road, Bengaluru, Karnataka 560066",

    area: "Whitefield",
    city: "Bengaluru",

    latitude: 12.9698,
    longitude: 77.7499,

    status: "OPEN",
    inventoryStatus: "IN_STOCK",

    distanceKm: 11.8,
    travelTimeMinutes: 34,

    inventoryUpdatedAt:
      new Date().toISOString(),

    inventory: inventory([
      [
        "KF-PREM-500",
        "Kingfisher Premium 500ml",
        "Beer",
        "Premium Lager",
        52,
      ],
      [
        "KF-ULTRA-500",
        "Kingfisher Ultra 500ml",
        "Beer",
        "Premium Lager",
        23,
      ],
      [
        "BUD-500",
        "Budweiser 500ml",
        "Beer",
        "Lager",
        17,
      ],
    ]),
  },
];