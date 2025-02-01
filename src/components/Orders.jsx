import { formatPrice } from "../utils/format-price.js";

export const Orders = ({ orders, symbolPrice }) => {
  return (
    <ul className="grid grid-cols-3">
      {Object.entries(orders).map(([price, amount], index) => (
        <li key={index} className="flex items-center gap-2">
          <div>{price}:</div>
          <div>{formatPrice(amount * symbolPrice)} $</div>
        </li>
      ))}
    </ul>
  );
};
