import { Navigation } from "./Navigation.jsx";
import { UserInfo } from "./UserInfo.jsx";
import { ToggleTradingStatus } from "./ToggleTradingStatus.jsx";

export function Header() {
  return (
    <header className="container sticky top-0 z-50 flex items-baseline justify-between gap-8 border-b border-gray-300 bg-white py-4">
      {/*<h1 className="text-2xl font-black">Binance bot</h1>*/}
      <UserInfo />
      <ToggleTradingStatus />
      <Navigation />
    </header>
  );
}
