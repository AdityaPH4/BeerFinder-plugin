import { ChevronRight, Clock3, MapPin } from "lucide-react";
import { IoIosBeer } from "react-icons/io";
import { PiWineFill } from "react-icons/pi";
import type { Outlet } from "../types";

interface OutletCardProps {
  outlet: Outlet;
  selected: boolean;
  onSelect: (outlet: Outlet) => void;
}

export function OutletCard({
  outlet,
  selected,
  onSelect,
}: OutletCardProps) {
  return (
    <button
      type="button"
      className={`outlet-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(outlet)}
      aria-label={`View ${outlet.name}`}
    >
      <div className="outlet-card-main">

        {/* Number */}
        <div className="outlet-number">
          {getOutletNumber(outlet)}
        </div>

        <div className="outlet-card-content">

          {/* Outlet name */}
          <div className="outlet-card-title-row">
            <span className="outlet-card-name">
              {outlet.name}
            </span>

            <ChevronRight
              className="outlet-card-arrow"
              size={18}
              strokeWidth={2}
            />
          </div>

          {/* Distance + time */}
          <div className="outlet-meta">
            <span className="outlet-meta-item">
              <MapPin size={14} strokeWidth={2} />
              {outlet.distanceKm} km
            </span>

            <span className="outlet-meta-dot">•</span>

            <span className="outlet-meta-item">
              <Clock3 size={14} strokeWidth={2} />
              {outlet.travelTimeMinutes} min
            </span>
          </div>

          {/* Address */}
          <div className="outlet-address">
            {outlet.address}
          </div>

          {/* Beer icons */}
          <div
            className="outlet-beer-icons"
            aria-label="Available beer categories"
          >
            <IoIosBeer className="beer-icon lager" />
            <IoIosBeer className="beer-icon pale-ale" />
            <IoIosBeer className="beer-icon stout" />
            <PiWineFill className="beer-icon cider" />
          </div>

        </div>
      </div>
    </button>
  );
}

function getOutletNumber(outlet: Outlet): number {
  const match = outlet.id.match(/(\d+)$/);

  return match ? Number(match[1]) : 1;
}