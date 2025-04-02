import { useContext } from "react";
import { SymbolOrders } from "../components/SymbolOrders.jsx";
import { DataContext } from "../contexts/main.js";

export const OrdersPage = () => {
  const { ordersData, status } = useContext(DataContext);

  if (status === 3) return null;

  return (
    <section className="container py-4">
      <ul className="">
        {ordersData &&
          Object.entries(ordersData)
            .filter(([_, orders]) => Object.keys(orders).length)
            .map(([symbol, orders]) => (
              <li key={symbol}>
                <SymbolOrders symbol={symbol} orders={orders} />
              </li>
            ))}
      </ul>
    </section>
  );
};
