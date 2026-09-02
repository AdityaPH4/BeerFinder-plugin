import {
  Clock3,
  MapPin,
  Package,
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

  const availableCount =
    outlet.inventory.filter(
      (item) => item.available
    ).length;

  return (
    <aside className="details-panel">

      {/* HEADER */}

      <div className="details-header">

        <div>

          <div className="eyebrow">
            OUTLET DETAILS
          </div>

          <h2>
            {outlet.name}
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

      {/* STATUS */}

      <div
        className="detail-status"
        data-status={
          outlet.inventoryStatus
        }
      >

        {outlet.inventoryStatus ===
          "IN_STOCK" &&
          "Currently in stock"}

        {outlet.inventoryStatus ===
          "LOW_STOCK" &&
          "Limited stock"}

        {outlet.inventoryStatus ===
          "OUT_OF_STOCK" &&
          "Currently out of stock"}

      </div>

      {/* ADDRESS */}

      <div className="detail-address">

        <MapPin size={17} />

        <span>
          {outlet.address}
        </span>

      </div>

      {/* STATS */}

      <div className="detail-stats">

        <div>

          <MapPin size={16} />

          <strong>
            {outlet.distanceKm.toFixed(1)}
            {" km"}
          </strong>

          <span>
            away
          </span>

        </div>

        <div>

          <Clock3 size={16} />

          <strong>
            {outlet.travelTimeMinutes}
            {" min"}
          </strong>

          <span>
            drive
          </span>

        </div>

        <div>

          <Package size={16} />

          <strong>
            {availableCount}
          </strong>

          <span>
            brands
          </span>

        </div>

      </div>

      {/* INVENTORY HEADER */}

      <div className="inventory-heading">

        <div>

          <div className="eyebrow">
            CURRENT INVENTORY
          </div>

          <h3>
            Available products
          </h3>

        </div>

        <span>
          Live test data
        </span>

      </div>

      {/* PRODUCTS */}

      <div className="inventory-list">

        {outlet.inventory.map(
          (item) => (

            <div
              key={item.productId}
              className={`inventory-row ${
                item.available
                  ? ""
                  : "unavailable"
              }`}
            >

              <div className="product-icon">
                🍺
              </div>

              <div className="product-info">

                <strong>
                  {item.productName}
                </strong>

                <span>
                  {item.speciality}
                </span>

              </div>

              <div className="product-stock">

                {item.available
                  ? `${item.quantity} left`
                  : "Out of stock"}

              </div>

            </div>

          )
        )}

      </div>

      {/* UPDATED */}

      <div className="updated-note">

        Inventory updated{" "}

        {new Date(
          outlet.inventoryUpdatedAt
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}

      </div>

    </aside>
  );
}