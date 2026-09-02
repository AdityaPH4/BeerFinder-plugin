/// <reference types="google.maps" />

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
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

        const map =
          new Map(
            mapContainerRef.current,
            {
              center: BENGALURU,

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
                  lat: outlet.latitude,
                  lng: outlet.longitude,
                },

                title: outlet.name,

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
      lat: outlet.latitude,
      lng: outlet.longitude,
    });

    mapRef.current.setZoom(14);

  }, [
    selectedOutletId,
    outlets,
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
          lat: outlet.latitude,
          lng: outlet.longitude,
        });

      }
    );

    map.fitBounds(bounds, 70);

  }, [
    outlets,
    selectedOutletId,
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

  /*
   * Different marker appearance
   * based on inventory status.
   */

  element.dataset.status =
    outlet.inventoryStatus;

  const availableCount =
    outlet.inventory.filter(
      (item) => item.available
    ).length;

  element.innerHTML = `
    <div class="beer-marker-pin">

      <div class="beer-marker-icon">
        🍺
      </div>

      <div class="beer-marker-count">
        ${availableCount}
      </div>

    </div>

    <div class="beer-marker-label">
      ${escapeHtml(outlet.name)}
    </div>
  `;

  return element;
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