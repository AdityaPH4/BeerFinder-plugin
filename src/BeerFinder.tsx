import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  LocateFixed,
  MapPinned,
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

import { getAllCategories }
  from "./services/outletService";

const initialFilters:
  BeerFinderFilters = {
    query: "",
    category: "All Categories",
  };

export default function BeerFinder() {

  const [filters, setFilters] =
    useState<BeerFinderFilters>(
      initialFilters
    );

  const [selectedOutletId, setSelectedOutletId] =
    useState<string | null>(
      null
    );

  const {
    outlets,
    loading,
    error,
    reload,
  } = useOutlets(filters);

  const categories = useMemo(
    () => getAllCategories(),
    []
  );

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

  /*
   * Open the first result once, on initial load, so the map/details
   * aren't empty. Doesn't re-fire after the user closes the panel.
   */

  const autoSelectedRef =
    useRef(false);

  useEffect(() => {

    if (
      !autoSelectedRef.current &&
      outlets.length > 0
    ) {

      autoSelectedRef.current = true;

      setSelectedOutletId(
        outlets[0].id
      );
    }

  }, [outlets]);

  return (

    <main className="beer-finder">

      {/* HEADER */}

      <SearchHeader
        filters={filters}
        onChange={setFilters}
        categories={categories}
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

                <MapPinned size={15} />

                OUTLETS

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

          <div className="outlet-results">
            <div className="outlet-list">
              {outlets.map(
                (outlet, index) => (
                  <OutletCard
                    key={outlet.id}
                    outlet={outlet}
                    number={index + 1}
                    selected={
                      outlet.id ===
                      selectedOutletId
                    }
                    onSelect={handleSelect}
                  />
                )
              )}
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

        {/* MAP */}

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

              <MapPinned size={18} />

              <strong>
                Real Location Data
              </strong>

              <span>
                Sourced from verified
                records
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
                Wide Coverage
              </strong>

              <span>
                Bengaluru &amp; Goa
              </span>

            </div>

            <div>

              <ShieldCheck size={18} />

              <strong>
                Verified Outlets
              </strong>

              <span>
                Trusted &amp; reliable
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
