import { ReadyState } from "react-use-websocket";
import { formatDate } from "../utils/format-date.js";
import { formatPrice } from "../utils/format-price.js";
import { useContext } from "react";
import { DataContext } from "../contexts/main.js";

export const UserInfo = () => {
  const { mainData, status } = useContext(DataContext);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[status];

  return (
    <section className="flex gap-4">
      {mainData && (
        <>
          <div className="flex flex-col gap-1">
            {Object.entries(mainData.balance).map(([symbol, { balance, availableBalance, crossUnPnl }]) => (
              <div className="flex gap-4" key={symbol}>
                <div className="font-black">{symbol}</div>
                <div className="">
                  Total balance: <span className="">{formatPrice(balance, 3)} $</span>
                </div>
                <div className="">
                  Available balance: <span className="">{formatPrice(availableBalance, 3)} $</span>
                </div>
                <div className="">
                  PnL: <span className="">{formatPrice(crossUnPnl, 4)} $</span>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            Start time: <span className="">{formatDate(mainData.start_timestamp)}</span>
          </div>
        </>
      )}
      <div className="">
        Status: <span className="">{connectionStatus}</span>
      </div>
    </section>
  );
};
