import {
  MapPin,
  Search,
  X,
} from "lucide-react";

import type { BeerFinderFilters } from "../types";

interface SearchHeaderProps {
  filters: BeerFinderFilters;
  onChange: (filters: BeerFinderFilters) => void;
  categories: string[];
  resultCount: number;
}

export function SearchHeader({
  filters,
  onChange,
  categories,
  resultCount,
}: SearchHeaderProps) {

  const categoryOptions = [
    "All Categories",
    ...categories,
  ];

  return (
    <header className="finder-header">

      {/* BRAND */}

      <div className="brand-block">
        <div className="brand-bottle">
          🍺
        </div>

        <div>
          <div className="brand-name">
            BEER FINDER
          </div>

          <div className="brand-subtitle">
            FIND YOUR NEAREST OUTLET
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="search-wrap">

        <MapPin size={18} />

        <input
          value={filters.query}
          onChange={(event) =>
            onChange({
              ...filters,
              query: event.target.value,
            })
          }
          placeholder="Search city, area or outlet"
        />

        {filters.query && (
          <button
            className="icon-button ghost"
            onClick={() =>
              onChange({
                ...filters,
                query: "",
              })
            }
          >
            <X size={18} />
          </button>
        )}

        <button
          className="search-button"
          aria-label="Search"
        >
          <Search size={21} />
        </button>
      </div>

      {/* CATEGORY */}

      <select
        className="select-control"
        value={filters.category}
        onChange={(event) =>
          onChange({
            ...filters,
            category: event.target.value,
          })
        }
      >
        {categoryOptions.map((category) => (
          <option key={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="result-count">
        {resultCount} outlets
      </div>

    </header>
  );
}
