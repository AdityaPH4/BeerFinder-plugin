export interface Outlet {
  id: string;
  title: string;
  street: string;
  city: string | null;
  state: string;
  postalCode: string | null;
  country: string;
  lat: number;
  lng: number;
  categories: string[];
}

export interface BeerFinderFilters {
  query: string;
  category: string;
}
