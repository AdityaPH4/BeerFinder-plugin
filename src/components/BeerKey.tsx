import { IoIosBeer } from "react-icons/io";
import { PiWineFill } from "react-icons/pi";

export function BeerKey() {
  return (
    <div className="beer-key">
      <div className="beer-key-title">
        Beer key
      </div>

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
  );
}