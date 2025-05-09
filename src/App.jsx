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
import { useLocalStorage } from "@uidotdev/usehooks";
import { processOrders } from "./utils/process-orders.js";
import { processSymbols } from "./utils/process-symbols.js";
import { processThreads } from "./utils/process-threads.js";
import { ArchivePage } from "./pages/ArchivePage.jsx";

function App() {
  const url = `ws://${import.meta.env.VITE_LOCAL_SOCKET_HOST}:${import.meta.env.VITE_LOCAL_SOCKET_START_PORT}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url);

  const [mainData, setMainData] = useState();
  const [symbolsData, setSymbolsData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
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
        const symbols = processSymbols(data, searchParams);
        const threads = processThreads(data);
        setSymbolsData(symbols);
        setThreadsData(threads);
      } else if (lastJsonMessage.type === "orders") {
        const orders = processOrders(lastJsonMessage.data, isCanceled);
        if (orders?.length) setOrdersData(orders);
      } else if (lastJsonMessage.type === "archive") {
        const orders = processOrders(lastJsonMessage.data, isCanceled);
        if (orders?.length) setArchiveData(orders);
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
        archiveData,
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
        <Route
          path={NAVIGATION_ROUTES.ARCHIVE}
          element={<ArchivePage actions={<Switch name="Canceled Orders" value={isCanceled} onChange={() => setIsCanceled((prev) => !prev)} />} />}
        />
        <Route path={NAVIGATION_ROUTES.THREADS} element={<ThreadsPage />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
