import { Route, Routes } from "react-router";
import { SymbolsPage } from "./pages/SymbolsPage.jsx";
import { NAVIGATION_ROUTES } from "./constants/navigation.js";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { Header } from "./components/Header.jsx";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DataContext } from "./contexts/main.js";

function App() {
  const url = `ws://${import.meta.env.VITE_LOCAL_SOCKET_HOST}:${import.meta.env.VITE_LOCAL_SOCKET_START_PORT}`;
  const [mainData, setMainData] = useState();
  const [symbolsData, setSymbolsData] = useState();
  const [ordersData, setOrdersData] = useState();
  const [tradingStatus, setTradingStatus] = useState();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    try {
      if (!lastJsonMessage) return;
      if (lastJsonMessage.type === "main") {
        setMainData(lastJsonMessage.data);
        console.log("main", lastJsonMessage.data);
      } else if (lastJsonMessage.type === "symbols")
        setSymbolsData(lastJsonMessage.data);
      else if (lastJsonMessage.type === "orders")
        setOrdersData(lastJsonMessage.data);
      else if (lastJsonMessage.type === "trading")
        setTradingStatus(lastJsonMessage.data);
    } catch (e) {
      console.error(`Process socket ${url} message error`, e);
    }
  }, [lastJsonMessage]);

  return (
    <DataContext.Provider
      value={{
        mainData,
        symbolsData,
        ordersData,
        tradingStatus,
        status: readyState,
        send: sendJsonMessage,
      }}
    >
      <Header data={mainData} status={readyState} />
      <Routes>
        <Route path={NAVIGATION_ROUTES.SYMBOLS} element={<SymbolsPage />} />
        <Route path={NAVIGATION_ROUTES.ORDERS} element={<OrdersPage />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
