import { useContext } from "react";
import { DataContext } from "../contexts/main.js";
import { formatPrice } from "../utils/format-price.js";
import { Orders } from "../components/Orders.jsx";

export const SymbolsPage = ({ search }) => {
  const { symbolsData } = useContext(DataContext);
  if (!symbolsData) return null;

  return (
    <section className="container flex flex-col gap-4 py-4">
      {search && <div className="">{search}</div>}
      <ul className="">
        <li className="flex items-center justify-between border-b border-gray-300 py-2">
          <div className="w-32 border-r border-gray-300 px-2">Name</div>
          <div className="w-32 border-r border-gray-300 px-2">Price</div>
          <div className="w-32 border-r border-gray-300 px-2">Limit USD</div>
          <div className="w-32 border-r border-gray-300 px-2">Price change</div>
          <div className="w-44 border-r border-gray-300 px-2">Volume USD</div>
          <div className="w-32 grow border-r border-gray-300 px-2">Bids</div>
          <div className="w-32 grow px-2">Asks</div>
        </li>
        {Object.values(symbolsData).map(([name, price, amount_limit_usd, price_change, volume, bids, asks], index) => (
          <li key={index} className="flex justify-between border-b border-gray-300 py-2">
            <div className="w-32 border-r border-gray-300 px-2">{name}</div>
            <div className="w-32 border-r border-gray-300 px-2">{formatPrice(price, "auto")} $</div>
            <div className="w-32 border-r border-gray-300 px-2">{formatPrice(amount_limit_usd)} $</div>
            <div className="w-32 border-r border-gray-300 px-2">{price_change} %</div>
            <div className="w-44 border-r border-gray-300 px-2">{formatPrice(volume)} $</div>
            <div className="w-32 grow border-r border-gray-300 px-2">{<Orders symbolPrice={price} orders={bids} />}</div>
            <div className="w-32 grow px-2">{<Orders symbolPrice={price} orders={asks} />}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
