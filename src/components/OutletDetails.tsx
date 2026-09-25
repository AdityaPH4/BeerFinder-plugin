import {
  MapPin,
  Navigation,
  X,
} from "lucide-react";

import type { Outlet } from "../types";

interface OutletDetailsProps {
  outlet: Outlet;
  onClose: () => void;
}

export function OutletDetails({
  outlet,
  onClose,
}: OutletDetailsProps) {

  const addressLine2 = [
    outlet.city,
    outlet.state,
    outlet.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const directionsUrl =
    `https://www.google.com/maps/search/?api=1&query=${outlet.lat},${outlet.lng}`;

  return (
    <aside className="details-panel">

      {/* HEADER */}

      <div className="details-header">

        <div>

          <div className="eyebrow">
            OUTLET DETAILS
          </div>

          <h2>
            {outlet.title}
          </h2>

        </div>

        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

      </div>

      {/* CATEGORIES */}

      {outlet.categories.length > 0 && (
        <div className="detail-categories">
          {outlet.categories.map((category) => (
            <span
              key={category}
              className="detail-category-tag"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* ADDRESS */}

      <div className="detail-address">

        <MapPin size={17} />

        <span>
          {outlet.street}
          {addressLine2 && (
            <>
              <br />
              {addressLine2}
            </>
          )}
          {outlet.country && (
            <>
              <br />
              {outlet.country}
            </>
          )}
        </span>

      </div>

      {/* DIRECTIONS */}

      <a
        className="details-button"
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
      >
        <Navigation size={15} />
        Get directions
      </a>

    </aside>
  );
}
