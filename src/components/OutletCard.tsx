import { ChevronRight, MapPin } from "lucide-react";
import type { Outlet } from "../types";

interface OutletCardProps {
  outlet: Outlet;
  number: number;
  selected: boolean;
  onSelect: (outlet: Outlet) => void;
}

export function OutletCard({
  outlet,
  number,
  selected,
  onSelect,
}: OutletCardProps) {

  const location = [outlet.city, outlet.state]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      className={`outlet-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(outlet)}
      aria-label={`View ${outlet.title}`}
    >
      <div className="outlet-card-main">

        {/* Number */}
        <div className="outlet-number">
          {number}
        </div>

        <div className="outlet-card-content">

          {/* Outlet name */}
          <div className="outlet-card-title-row">
            <span className="outlet-card-name">
              {outlet.title}
            </span>

            <ChevronRight
              className="outlet-card-arrow"
              size={18}
              strokeWidth={2}
            />
          </div>

          {/* Address */}
          <div className="outlet-address-row">
            <div className="outlet-address">
              {outlet.street}
            </div>
          </div>

          {/* City / state */}
          {location && (
            <div className="outlet-meta">
              <span className="outlet-meta-item">
                <MapPin size={14} strokeWidth={2} />
                {location}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
