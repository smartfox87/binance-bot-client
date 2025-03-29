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

  // {
  //   "accountAlias": "fWAuuXTiFzTiTioC",
  //     "asset": "USDT",
  //     "balance": "100.00000000",
  //     "crossWalletBalance": "100.00000000",
  //     "crossUnPnl": "0.00000000",
  //     "availableBalance": "100.00000000",
  //     "maxWithdrawAmount": "100.00000000",
  //     "marginAvailable": true,
  //     "updateTime": 1738507786898
  // }

  return (
    <section className="flex gap-4">
      {mainData && (
        <>
          <div className="">
            Total balance:{" "}
            <span className="">
              {formatPrice(mainData.balance.balance, 2)} $
            </span>
          </div>
          <div className="">
            Available balance:{" "}
            <span className="">
              {formatPrice(mainData.balance.availableBalance, 2)} $
            </span>
          </div>
          <div className="">
            PnL:{" "}
            <span className="">
              {formatPrice(mainData.balance.crossUnPnl, 2)} $
            </span>
          </div>
          <div className="">
            Start time:{" "}
            <span className="">{formatDate(mainData.start_timestamp)}</span>
          </div>
        </>
      )}
      <div className="">
        Status: <span className="">{connectionStatus}</span>
      </div>
    </section>
  );
};
