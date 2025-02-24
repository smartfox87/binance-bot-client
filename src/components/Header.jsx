import { Navigation } from "./Navigation.jsx";
import { SocketUserClient } from "./SocketUserClient.jsx";

function App() {
  return (
    <header className="container flex items-center justify-between gap-8 border-b border-gray-300 py-4">
      <h1 className="text-2xl font-black">Binance bot</h1>
      <SocketUserClient />
      <Navigation />
    </header>
  );
}

export default App;
