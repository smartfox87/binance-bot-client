import { useContext } from "react";
import { DataContext } from "../contexts/main.js";
import { formatPrice } from "../utils/format-price.js";
import { formatDate } from "../utils/format-date.js";
import { Link } from "react-router";

export const OrdersPage = ({ actions }) => {
  const { symbolsData, ordersData, status } = useContext(DataContext);
  if (!ordersData) return null;

  return (
    <section className="container flex flex-col gap-4 py-4">
      {actions && <div className="flex">{actions}</div>}
      <ul>
        <li className="flex border-y border-gray-300 py-2">
          <div className="w-[7%] grow border-r border-gray-300 px-2">Symbol</div>
          <div className="w-[4%] grow border-r border-gray-300 px-2">Status</div>
          <div className="w-[7.5%] grow border-r border-gray-300 px-2">Type</div>
          <div className="w-0 grow border-r border-gray-300 px-2">Side</div>
          <div className="w-[2%] grow border-r border-gray-300 px-2">Price</div>
          <div className="w-[2%] grow border-r border-gray-300 px-2">Amount</div>
          <div className="w-[2%] grow border-r border-gray-300 px-2">Distance</div>
          <div className="w-[2%] grow border-r border-gray-300 px-2">Avg price</div>
          <div className="w-[2%] grow border-r border-gray-300 px-2">Stop price</div>
          <div className="w-[1%] grow border-r border-gray-300 px-2">Qty</div>
          <div className="w-[1%] grow border-r border-gray-300 px-2">Exec. qty</div>
          <div className="w-[1%] grow border-r border-gray-300 px-2">Result</div>
          <div className="w-[3%] grow border-r border-gray-300 px-2">Limit</div>
          <div className="w-[6%] grow px-2">Liquidity</div>
        </li>
        {ordersData.map(({ symbol, id, status, type, side, price, avg_price, stop_price, orig_qty, executed_qty, result, leverage, update_time }) => (
          <li key={id} className="flex border-b border-gray-300 py-2">
            <div className="w-[7%] grow border-r border-gray-300 px-2 font-black">
              <Link to={`/?symbols_query=${symbol}`} className="hover:underline">
                {symbol}
              </Link>
            </div>
            <div className="w-[4%] grow border-r border-gray-300 px-2">{status}</div>
            <div className="w-[7.5%] grow border-r border-gray-300 px-2">{type}</div>
            <div className="w-0 grow border-r border-gray-300 px-2">{side}</div>
            <div className="w-[2%] grow border-r border-gray-300 px-2">{formatPrice(price, "auto")} $</div>
            <div className="w-[2%] grow border-r border-gray-300 px-2">{formatPrice((price * orig_qty).toFixed(10), "auto")} $</div>
            <div className="w-[2%] grow border-r border-gray-300 px-2">
              {status !== "CANCELED" && symbolsData[symbol] ? ((Math.abs(price - symbolsData[symbol][1]) / symbolsData[symbol][1]) * 100).toFixed(5) : 0} %
            </div>
            <div className="w-[2%] grow border-r border-gray-300 px-2">{formatPrice(avg_price, "auto")} $</div>
            <div className="w-[2%] grow border-r border-gray-300 px-2">{formatPrice(stop_price, "auto")} $</div>
            <div className="w-[1%] grow border-r border-gray-300 px-2">{formatPrice(orig_qty, "auto")}</div>
            <div className="w-[1%] grow border-r border-gray-300 px-2">{formatPrice(executed_qty, "auto")}</div>
            <div className="w-[1%] grow border-r border-gray-300 px-2">{result && `${formatPrice(result, "auto")} $`}</div>
            <div className="w-[3%] grow border-r border-gray-300 px-2">{symbolsData[symbol] && `${formatPrice(symbolsData[symbol][2], 0)} $`}</div>
            <div className="w-[6%] grow px-2">
              {symbolsData[symbol]?.[side === "BUY" ? 5 : 6] &&
                Object.keys(symbolsData[symbol]?.[side === "BUY" ? 5 : 6]).length > 0 &&
                `${Object.keys(symbolsData[symbol][side === "BUY" ? 5 : 6])[0]} $ : ${formatPrice(Object.values(symbolsData[symbol][side === "BUY" ? 5 : 6])[0] * price, 0)} $`}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
