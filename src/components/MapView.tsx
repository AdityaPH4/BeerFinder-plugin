/// <reference types="google.maps" />

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import type {
  Cluster,
  ClusterStats,
  Renderer,
} from "@googlemaps/markerclusterer";
import type { Outlet } from "../types";

interface MapViewProps {
  outlets: Outlet[];
  selectedOutletId: string | null;
  onSelectOutlet: (
    outlet: Outlet
  ) => void;
}

const API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MAP_ID =
  import.meta.env.VITE_GOOGLE_MAP_ID ||
  "DEMO_MAP_ID";

const BENGALURU = {
  lat: 12.9716,
  lng: 77.5946,
};

function getCurrentLocation(): Promise<
  { lat: number; lng: number } | null
> {

  return new Promise((resolve) => {

    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      },
      {
        timeout: 6000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });
}

export function MapView({
  outlets,
  selectedOutletId,
  onSelectOutlet,
}: MapViewProps) {

  const mapContainerRef =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<google.maps.Map | null>(null);

  const markersRef =
    useRef<
      google.maps.marker.AdvancedMarkerElement[]
    >([]);

  const clustererRef =
    useRef<MarkerClusterer | null>(null);

  const [mapError, setMapError] =
    useState<string | null>(null);

  const [mapReady, setMapReady] =
    useState(false);

  /*
   * ------------------------------------------------
   * INITIALIZE GOOGLE MAP
   * ------------------------------------------------
   */

  useEffect(() => {

    let cancelled = false;

    async function initializeMap() {

      if (!mapContainerRef.current) {
        return;
      }

      if (!API_KEY) {

        setMapError(
          "Google Maps API key is missing."
        );

        return;
      }

      try {

        setOptions({
          key: API_KEY,
          v: "weekly",
        });

        const { Map } =
          await importLibrary("maps");

        if (cancelled) {
          return;
        }

        const currentLocation =
          await getCurrentLocation();

        if (cancelled) {
          return;
        }

        const map =
          new Map(
            mapContainerRef.current,
            {
              center:
                currentLocation ||
                BENGALURU,

              zoom: 11,

              mapId: MAP_ID,

              streetViewControl: false,

              fullscreenControl: true,

              mapTypeControl: false,

              clickableIcons: false,

              gestureHandling: "greedy",
            }
          );

        mapRef.current = map;

        setMapReady(true);

      } catch (error) {

        console.error(
          "Google Maps failed:",
          error
        );

        setMapError(
          "Google Maps could not be loaded."
        );
      }
    }

    void initializeMap();

    return () => {
      cancelled = true;
    };

  }, []);

  /*
   * ------------------------------------------------
   * CREATE / UPDATE MARKERS
   * ------------------------------------------------
   */

  useEffect(() => {

    async function updateMarkers() {

      const map = mapRef.current;

      if (!map) {
        return;
      }

      try {

        const {
          AdvancedMarkerElement,
        } =
          await importLibrary("marker");

        /*
         * Remove previous cluster
         */

        if (clustererRef.current) {

          clustererRef.current.clearMarkers();

          clustererRef.current = null;
        }

        /*
         * Remove previous markers
         */

        markersRef.current.forEach(
          (marker) => {
            marker.map = null;
          }
        );

        markersRef.current = [];

        /*
         * Create markers
         */

        const markers =
          outlets.map((outlet) => {

            const markerElement =
              createMarkerElement(
                outlet,
                outlet.id ===
                  selectedOutletId
              );

            const marker =
              new AdvancedMarkerElement({
                map,

                position: {
                  lat: outlet.lat,
                  lng: outlet.lng,
                },

                title: outlet.title,

                content:
                  markerElement,
              });

            marker.addListener(
              "click",
              () => {
                onSelectOutlet(
                  outlet
                );
              }
            );

            return marker;
          });

        markersRef.current =
          markers;

        /*
         * Cluster markers
         */

        if (markers.length > 0) {

          clustererRef.current =
            new MarkerClusterer({
              map,
              markers,

              algorithm:
                new SuperClusterAlgorithm({
                  radius: 80,
                  maxZoom: 14,
                }),

              renderer:
                createBeerClusterRenderer(
                  AdvancedMarkerElement
                ),
            });
        }

      } catch (error) {

        console.error(
          "Marker creation failed:",
          error
        );
      }
    }

    void updateMarkers();

  }, [
    outlets,
    selectedOutletId,
    onSelectOutlet,
    mapReady,
  ]);

  /*
   * ------------------------------------------------
   * FOCUS SELECTED OUTLET
   * ------------------------------------------------
   */

  useEffect(() => {

    if (
      !mapRef.current ||
      !selectedOutletId
    ) {
      return;
    }

    const outlet =
      outlets.find(
        (item) =>
          item.id ===
          selectedOutletId
      );

    if (!outlet) {
      return;
    }

    mapRef.current.panTo({
      lat: outlet.lat,
      lng: outlet.lng,
    });

    mapRef.current.setZoom(14);

  }, [
    selectedOutletId,
    outlets,
    mapReady,
  ]);

  /*
   * ------------------------------------------------
   * FIT MAP TO OUTLETS
   * ------------------------------------------------
   */

  useEffect(() => {

    const map =
      mapRef.current;

    if (
      !map ||
      outlets.length === 0 ||
      selectedOutletId
    ) {
      return;
    }

    const bounds =
      new google.maps.LatLngBounds();

    outlets.forEach(
      (outlet) => {

        bounds.extend({
          lat: outlet.lat,
          lng: outlet.lng,
        });

      }
    );

    map.fitBounds(bounds, 70);

  }, [
    outlets,
    selectedOutletId,
    mapReady,
  ]);

  return (

    <div className="map-wrapper">

      <div
        ref={mapContainerRef}
        className="google-map"
      />

      {mapError && (

        <div className="map-error">

          <strong>
            Map unavailable
          </strong>

          <span>
            {mapError}
          </span>

        </div>

      )}

      <div className="map-overlay-badge">

        <span className="live-dot" />

        <strong>
          {outlets.length}
        </strong>

        <span>
          outlets
        </span>

      </div>

    </div>
  );
}

/*
 * ==================================================
 * CUSTOM MARKER
 * ==================================================
 */

function createMarkerElement(
  outlet: Outlet,
  selected: boolean
): HTMLDivElement {

  const element =
    document.createElement("div");

  element.className =
    "beer-map-marker";

  if (selected) {
    element.classList.add(
      "selected"
    );
  }

  element.innerHTML = `
    <div class="beer-marker-pin">

      <div class="beer-marker-icon">
        🍺
      </div>

    </div>

    <div class="beer-marker-label">
      ${escapeHtml(outlet.title)}
    </div>
  `;

  return element;
}

/*
 * ==================================================
 * CUSTOM CLUSTER MARKER (beer-themed, replaces the
 * library's default blue/red circles)
 * ==================================================
 */

function createBeerClusterRenderer(
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
): Renderer {

  return {
    render(
      cluster: Cluster,
      stats: ClusterStats
    ) {

      const { count, position } =
        cluster;

      const tier =
        count >=
        Math.max(
          40,
          stats.clusters.markers
            .mean * 2
        )
          ? "lg"
          : count >=
            Math.max(
              10,
              stats.clusters.markers
                .mean
            )
          ? "md"
          : "sm";

      const element =
        document.createElement(
          "div"
        );

      element.className =
        "beer-cluster-marker";

      element.dataset.tier = tier;

      element.innerHTML = `
        <div class="beer-cluster-count">
          ${count}
        </div>
      `;

      return new AdvancedMarkerElement(
        {
          position,
          content: element,
          zIndex:
            1000 + count,
        }
      );
    },
  };
}

/*
 * Avoid injecting outlet names as raw HTML.
 */

function escapeHtml(
  value: string
): string {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}