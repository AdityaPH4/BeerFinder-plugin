import outletsData from "../data/outlets.json";
import type { BeerFinderFilters, Outlet } from "../types";

const outlets = outletsData as Outlet[];

export function getAllCategories(): string[] {
  const set = new Set<string>();

  outlets.forEach((outlet) =>
    outlet.categories.forEach((category) => set.add(category))
  );

  return Array.from(set).sort();
}

export async function getOutlets(
  filters: BeerFinderFilters
): Promise<Outlet[]> {

  const query = filters.query.trim().toLowerCase();

  return outlets.filter((outlet) => {

    const matchesQuery =
      !query ||
      outlet.title.toLowerCase().includes(query) ||
      outlet.street.toLowerCase().includes(query) ||
      (outlet.city ?? "").toLowerCase().includes(query) ||
      outlet.state.toLowerCase().includes(query);

    const matchesCategory =
      filters.category === "All Categories" ||
      outlet.categories.includes(filters.category);

    return matchesQuery && matchesCategory;
  });
}
