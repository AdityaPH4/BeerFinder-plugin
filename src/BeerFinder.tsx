import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  LocateFixed,
  Navigation,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { SearchHeader }
  from "./components/SearchHeader";

import { OutletCard }
  from "./components/OutletCard";

import { OutletDetails }
  from "./components/OutletDetails";

import { useOutlets }
  from "./hooks/useOutlets";

import type {
  BeerFinderFilters,
  Outlet,
} from "./types";
import { MapView }
  from "./components/MapView";

import { IoIosBeer } from "react-icons/io";
import { PiWineFill } from "react-icons/pi";
import { BeerKey } from "./components/BeerKey";

const initialFilters:
  BeerFinderFilters = {
    query: "",
    category: "All Categories",
    speciality: "All Specialities",
    stockOnly: false,
  };

export default function BeerFinder() {

  const [filters, setFilters] =
    useState<BeerFinderFilters>(
      initialFilters
    );

  const [selectedOutletId, setSelectedOutletId] =
    useState<string | null>(
      "outlet-001"
    );

  const {
    outlets,
    loading,
    error,
    reload,
  } = useOutlets(filters);

  const selectedOutlet =
    useMemo(
      () =>
        outlets.find(
          (outlet) =>
            outlet.id ===
            selectedOutletId
        ) ?? null,

      [
        outlets,
        selectedOutletId,
      ]
    );

  const handleSelect =
    useCallback(
      (outlet: Outlet) => {
        setSelectedOutletId(
          outlet.id
        );
      },
      []
    );

  return (

    <main className="beer-finder">

      {/* HEADER */}

      <SearchHeader
        filters={filters}
        onChange={setFilters}
        resultCount={
          outlets.length
        }
      />

      {/* MAIN AREA */}

      <section className="finder-body">

        {/* SIDEBAR */}

        <aside className="outlet-sidebar">

          <div className="sidebar-heading">

            <div>

              <div className="sidebar-kicker">

                <Navigation size={15} />

                NEAREST OUTLETS

              </div>

              <h1>
                {outlets.length}
                {" outlets found"}
              </h1>

              <p>
                Showing outlets around
                your search area
              </p>

            </div>

            <button
              className="icon-button"
              onClick={() =>
                void reload()
              }
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>

          </div>

          <div className="sidebar-tools">

            <span>
              Sort:{" "}
              <strong>
                Nearest
              </strong>
            </span>

            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  stockOnly:
                    !filters.stockOnly,
                })
              }
            >
              {filters.stockOnly
                ? "All stock"
                : "In stock only"}
            </button>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="loading-state">
              Loading outlets...
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="error-state">
              {error}
            </div>
          )}

          {/* OUTLETS */}

          {/* <div className="outlet-list">

            {!loading &&
              outlets.map(
                (outlet) => (

                  <OutletCard
                    key={outlet.id}
                    outlet={outlet}
                    selected={
                      selectedOutletId ===
                      outlet.id
                    }
                    onSelect={() =>
                      handleSelect(
                        outlet
                      )
                    }
                  />

                )
              )}

          </div> */}
          <div className="outlet-results">
  <div className="outlet-list">
    {outlets.map((outlet) => (
      <OutletCard
        key={outlet.id}
        outlet={outlet}
        selected={outlet.id === selectedOutletId}
        onSelect={handleSelect}
      />
    ))}
  </div>
</div>

{/* <BeerKey /> */}

<div className="beer-key">
  <div className="beer-key-title">Beer key</div>

  <div className="beer-key-items">
    <div className="beer-key-item">
      <IoIosBeer className="beer-key-icon lager" />
      <span>Lager</span>
    </div>

    <div className="beer-key-item">
      <IoIosBeer className="beer-key-icon pale-ale" />
      <span>Pale Ale</span>
    </div>

    <div className="beer-key-item">
      <IoIosBeer className="beer-key-icon stout" />
      <span>Stout</span>
    </div>

    <div className="beer-key-item">
      <PiWineFill className="beer-key-icon cider" />
      <span>Cider</span>
    </div>
  </div>
</div>

          {/* EMPTY */}

          {!loading &&
            outlets.length === 0 && (

              <div className="empty-state">

                <div>🍺</div>

                <h3>
                  No matching outlets
                </h3>

                <p>
                  Try a wider area or
                  remove one of the
                  filters.
                </p>

              </div>

            )}

        </aside>

        {/* TEMPORARY MAP AREA */}

        <section className="map-section">

  <MapView
    outlets={outlets}
    selectedOutletId={
      selectedOutletId
    }
    onSelectOutlet={
      handleSelect
    }
  />

  <div className="map-trust-bar">

            <div>

              <RefreshCw size={18} />

              <strong>
                Real-time Inventory
              </strong>

              <span>
                Live stock updates
              </span>

            </div>

            <div>

              <LocateFixed size={18} />

              <strong>
                Nearest Outlets
              </strong>

              <span>
                Find closest stores
              </span>

            </div>

            <div>

              <span className="trust-icon">
                ◉
              </span>

              <strong>
                Wide Selection
              </strong>

              <span>
                100+ beer brands
              </span>

            </div>

            <div>

              <ShieldCheck size={18} />

              <strong>
                Verified Outlets
              </strong>

              <span>
                Trusted & reliable
              </span>

            </div>

          </div>

        </section>

      </section>

      {/* DETAILS */}

      {selectedOutlet && (

        <OutletDetails
          outlet={selectedOutlet}
          onClose={() =>
            setSelectedOutletId(
              null
            )
          }
        />

      )}

      {/* FOOTER */}

      <footer className="finder-footer">

        <span>
          Powered by Google Maps
        </span>

        <span>
          © 2026 Beer Finder
        </span>

      </footer>

    </main>
  );
}   