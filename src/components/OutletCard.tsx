import {
  Clock3,
  MapPin,
  Package,
  ChevronRight,
} from "lucide-react";

import type { Outlet } from "../types";

interface OutletCardProps {
  outlet: Outlet;
  selected: boolean;
  onSelect: () => void;
}

const statusLabels = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export function OutletCard({
  outlet,
  selected,
  onSelect,
}: OutletCardProps) {

  const availableProducts =
    outlet.inventory.filter(
      (item) => item.available
    );

  const availableCount =
    availableProducts.length;

  return (
    <button
      className={`outlet-card ${
        selected ? "selected" : ""
      }`}
      onClick={onSelect}
    >

      {/* TOP */}

      <div className="outlet-card-top">

        <div className="outlet-marker">
          {outlet.code.slice(-1)}
        </div>

        <div className="outlet-heading">

          <div className="outlet-name">
            {outlet.name}
          </div>

          <div
            className="status-pill"
            data-status={
              outlet.inventoryStatus
            }
          >
            {
              statusLabels[
                outlet.inventoryStatus
              ]
            }
          </div>

        </div>

      </div>

      {/* ADDRESS */}

      <div className="outlet-address">
        {outlet.address}
      </div>

      {/* DISTANCE */}

      <div className="outlet-meta">

        <span>
          <MapPin size={14} />

          {outlet.distanceKm.toFixed(1)}
          {" km"}
        </span>

        <span>
          <Clock3 size={14} />

          {outlet.travelTimeMinutes}
          {" min"}
        </span>

      </div>

      {/* INVENTORY */}

      <div className="inventory-strip">

        <div>

          <div className="inventory-title">

            <Package size={14} />

            Available beers

          </div>

          <div className="inventory-count">

            {availableCount}
            {" brands currently available"}

          </div>

        </div>

        <div className="bottle-row">

          {availableProducts
            .slice(0, 3)
            .map((item) => (
              <span
                key={item.productId}
              >
                🍺
              </span>
            ))}

          {availableCount > 3 && (
            <strong>
              +{availableCount - 3}
            </strong>
          )}

        </div>

        <span className="details-button">

          View details

          <ChevronRight size={16} />

        </span>

      </div>

    </button>
  );
}   