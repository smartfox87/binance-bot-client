import { Navigation } from "./Navigation.jsx";
import { UserInfo } from "./UserInfo.jsx";

export function Header() {
  return (
    <header className="container flex items-baseline justify-between gap-8 border-b border-gray-300 py-4">
      <h1 className="text-2xl font-black">Binance bot</h1>
      <UserInfo />
      <Navigation />
    </header>
  );
}
