import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { SymbolOrders } from "./SymbolOrders.jsx";

export const OrdersSocketClient = () => {
  const url = `ws://${import.meta.env.VITE_LOCAL_SOCKET_HOST}:${import.meta.env.VITE_LOCAL_SOCKET_START_PORT}`;
  const [orders, setOrders] = useState();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    try {
      if (!lastJsonMessage || lastJsonMessage.type !== "orders") return;
      console.log(`Process socket ${url} message`, lastJsonMessage.items);
      return setOrders(lastJsonMessage.items);
    } catch (e) {
      console.error(`Process socket ${url} message error`, e);
    }
  }, [lastJsonMessage]);

  if (readyState === 3) return null;

  return (
    <section className="container py-4">
      <ul className="">
        {orders &&
          Object.entries(orders).map(([symbol, orders]) => (
            <li key={symbol}>
              <SymbolOrders symbol={symbol} orders={orders} />
            </li>
          ))}
      </ul>
    </section>
  );
};
