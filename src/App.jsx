import { Navigation } from "./components/Navigation.jsx";
import { Route, Routes } from "react-router";
import { SymbolsPage } from "./pages/SymbolsPage.jsx";
import { NAVIGATION_ROUTES } from "./constants/navigation.js";
import { OrdersPage } from "./pages/OrdersPage.jsx";

function App() {
  return (
    <>
      <header className="container flex items-center justify-between border-b border-gray-300 py-4">
        <h1 className="text-2xl font-black">Binance bot</h1>
        <Navigation />
      </header>
      <Routes>
        <Route path={NAVIGATION_ROUTES.SYMBOLS} element={<SymbolsPage />} />
        <Route path={NAVIGATION_ROUTES.ORDERS} element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
