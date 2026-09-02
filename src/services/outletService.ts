import { mockOutlets } from "../data/mockData";
import type {
  BeerFinderFilters,
  Outlet,
} from "../types";

export async function getOutlets(
  filters: BeerFinderFilters
): Promise<Outlet[]> {

  // Fake network latency
  await new Promise((resolve) =>
    setTimeout(resolve, 250)
  );

  const query =
    filters.query.trim().toLowerCase();

  return mockOutlets.filter((outlet) => {

    const matchesQuery =
      !query ||
      outlet.name
        .toLowerCase()
        .includes(query) ||
      outlet.area
        .toLowerCase()
        .includes(query) ||
      outlet.city
        .toLowerCase()
        .includes(query) ||
      outlet.address
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      filters.category ===
        "All Categories" ||
      outlet.inventory.some(
        (item) =>
          item.category ===
          filters.category
      );

    const matchesSpeciality =
      filters.speciality ===
        "All Specialities" ||
      outlet.inventory.some(
        (item) =>
          item.speciality ===
          filters.speciality
      );

    const matchesStock =
      !filters.stockOnly ||
      outlet.inventory.some(
        (item) => item.available
      );

    return (
      matchesQuery &&
      matchesCategory &&
      matchesSpeciality &&
      matchesStock
    );
  });
}