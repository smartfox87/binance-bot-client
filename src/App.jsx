import { Route, Routes } from "react-router";
import { SymbolsPage } from "./pages/SymbolsPage.jsx";
import { NAVIGATION_ROUTES } from "./constants/navigation.js";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={NAVIGATION_ROUTES.SYMBOLS} element={<SymbolsPage />} />
        <Route path={NAVIGATION_ROUTES.ORDERS} element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
