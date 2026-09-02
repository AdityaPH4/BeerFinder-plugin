import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { BeerFinderFilters } from "../types";

interface SearchHeaderProps {
  filters: BeerFinderFilters;
  onChange: (filters: BeerFinderFilters) => void;
  resultCount: number;
}

const categories = [
  "All Categories",
  "Beer",
];

const specialities = [
  "All Specialities",
  "Premium Lager",
  "Lager",
  "Imported",
];

export function SearchHeader({
  filters,
  onChange,
  resultCount,
}: SearchHeaderProps) {
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
        {categories.map((category) => (
          <option key={category}>
            {category}
          </option>
        ))}
      </select>

      {/* SPECIALITY */}

      <select
        className="select-control"
        value={filters.speciality}
        onChange={(event) =>
          onChange({
            ...filters,
            speciality: event.target.value,
          })
        }
      >
        {specialities.map((speciality) => (
          <option key={speciality}>
            {speciality}
          </option>
        ))}
      </select>

      {/* STOCK */}

      <button
        className={`stock-toggle ${
          filters.stockOnly
            ? "active"
            : ""
        }`}
        onClick={() =>
          onChange({
            ...filters,
            stockOnly:
              !filters.stockOnly,
          })
        }
      >
        <SlidersHorizontal size={16} />

        In stock
      </button>

      <div className="result-count">
        {resultCount} outlets
      </div>

    </header>
  );
}