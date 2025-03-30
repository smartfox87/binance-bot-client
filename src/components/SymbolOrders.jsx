import { formatDate } from "../utils/format-date.js";
import { formatPrice } from "../utils/format-price.js";

export const SymbolOrders = ({ symbol, orders }) => {
  return (
    <section>
      <header className="font-black">{symbol}</header>
      <ul>
        <li className="flex border-b border-gray-300 py-2">
          <div className="w-1/12 grow border-r border-gray-300 px-2">Id</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">
            Status
          </div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Type</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Side</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Price</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">
            Avg price
          </div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">
            Stop price
          </div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Qty</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">
            Executed qty
          </div>
          <div className="w-1/12 grow px-2">Time</div>
        </li>
        {Object.values(orders).map(
          ({
            id,
            status,
            type,
            side,
            price,
            avg_price,
            stop_price,
            orig_qty,
            executed_qty,
            update_time,
          }) => (
            <li key={id} className="flex border-b border-gray-300 py-2">
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {id}
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {status}
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {type}
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {side}
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {formatPrice(price, "auto")} $
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {formatPrice(avg_price, "auto")} $
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {formatPrice(stop_price, "auto")} $
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {formatPrice(orig_qty, "auto")}
              </div>
              <div className="w-1/12 grow border-r border-gray-300 px-2">
                {formatPrice(executed_qty, "auto")}
              </div>
              <div className="w-1/12 grow px-2">{formatDate(update_time)}</div>
            </li>
          ),
        )}
      </ul>
    </section>
  );
};
