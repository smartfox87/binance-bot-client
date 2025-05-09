import { Route, Routes, useSearchParams } from "react-router";
import { SymbolsPage } from "./pages/SymbolsPage.jsx";
import { NAVIGATION_ROUTES } from "./constants/navigation.js";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { Header } from "./components/Header.jsx";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DataContext } from "./contexts/main.js";
import { Switch } from "./components/Switch.jsx";
import { ThreadsPage } from "./pages/ThreadsPage.jsx";
import { Search } from "./components/Search.jsx";
import { ORDERS_AMOUNT_LIMIT_MULTIPLIER } from "./config.js";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const url = `ws://${import.meta.env.VITE_LOCAL_SOCKET_HOST}:${import.meta.env.VITE_LOCAL_SOCKET_START_PORT}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url);

  const [mainData, setMainData] = useState();
  const [symbolsData, setSymbolsData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [threadsData, setThreadsData] = useState([]);
  const [tradingStatus, setTradingStatus] = useState();
  const [searchParams] = useSearchParams();
  const [isCanceled, setIsCanceled] = useLocalStorage("isCanceled", true);
  const [isLimitedSymbols, setIsLimitedSymbols] = useLocalStorage("isLimitedSymbols", false);

  useEffect(() => {
    try {
      if (!lastJsonMessage) return;
      if (lastJsonMessage.type === "main") {
        setMainData(lastJsonMessage.data);
      } else if (lastJsonMessage.type === "symbols") {
        const data = Object.entries(lastJsonMessage.data).map(([index, data]) => ({ index, data: JSON.parse(data) }));
        const symbols = data.reduce(
          (acc, { data: { items } }) => ({
            ...acc,
            ...items
              .filter(([symbol]) => !searchParams.get("symbols_query") || symbol.includes(searchParams.get("symbols_query").toUpperCase()))
              .reduce((acc, item) => {
                const bids = Object.keys(item[5]).sort((a, b) => parseFloat(b) - parseFloat(a));
                const asks = Object.keys(item[6]).sort((a, b) => parseFloat(a) - parseFloat(b));
                item[5] = bids.reduce((acc, key) => ({ ...acc, [key]: item[5][key] }), {});
                item[6] = asks.reduce((acc, key) => ({ ...acc, [key]: item[6][key] }), {});
                const order = bids.length ? bids[0] : asks[0];
                const orderAmount = bids.length ? item[5][order] : item[6][order];
                console.log(`orderAmount`, orderAmount);
                // if (isLimitedSymbols && orderAmount < item[4] * ORDERS_AMOUNT_LIMIT_MULTIPLIER) return acc;
                return { ...acc, [item[0]]: [...item, order] };
              }, {}),
          }),
          {},
        );
        const threads = data.map(
          ({ index, data: { iteration, duration, items } }) => ({
            index,
            iteration,
            duration,
            items: items.length,
          }),
          {},
        );
        setSymbolsData(symbols);
        setThreadsData(threads);
      } else if (lastJsonMessage.type === "orders") {
        const orders = Object.values(lastJsonMessage.data).reduce(
          (acc, orders) => acc.concat(Object.values(orders).filter(({ status }) => isCanceled || (status !== "CANCELED" && !isCanceled))),
          [],
        );
        if (orders?.length) setOrdersData(orders);
      } else if (lastJsonMessage.type === "trading") {
        setTradingStatus(lastJsonMessage.data);
      }
    } catch (e) {
      console.error(`Process socket ${url} message error`, e);
    }
  }, [lastJsonMessage]);

  const ordersActions = (
    <div className="flex gap-4">
      <Search param="symbols_query" />
      <Switch name="Limited Orders" value={isLimitedSymbols} onChange={() => setIsLimitedSymbols((prev) => !prev)} />
    </div>
  );

  return (
    <DataContext.Provider
      value={{
        mainData,
        threadsData,
        symbolsData,
        ordersData,
        tradingStatus,
        status: readyState,
        send: sendJsonMessage,
      }}
    >
      <Header data={mainData} status={readyState} />
      <Routes>
        <Route path={NAVIGATION_ROUTES.SYMBOLS} element={<SymbolsPage actions={ordersActions} />} />
        <Route
          path={NAVIGATION_ROUTES.ORDERS}
          element={<OrdersPage actions={<Switch name="Canceled Orders" value={isCanceled} onChange={() => setIsCanceled((prev) => !prev)} />} />}
        />
        <Route path={NAVIGATION_ROUTES.THREADS} element={<ThreadsPage />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
