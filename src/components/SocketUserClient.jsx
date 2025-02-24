import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { formatDate } from "../utils/format-date.js";
import { formatPrice } from "../utils/format-price.js";

export const SocketUserClient = () => {
  const url = `ws://${import.meta.env.VITE_LOCAL_SOCKET_HOST}:${import.meta.env.VITE_LOCAL_SOCKET_START_PORT}`;
  const [messageHistory, setMessageHistory] = useState([]);
  const [mainData, setConfigData] = useState();

  const { getWebSocket, sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(url);

  useEffect(() => {
    const ws = getWebSocket();
    console.log("ws", ws);
  }, [readyState]);

  useEffect(() => {
    try {
      if (!lastJsonMessage) return;
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
      console.log("lastJsonMessage", lastJsonMessage);
      if (lastJsonMessage.type !== "main") return;
      return setConfigData(lastJsonMessage);
    } catch (e) {
      console.error(`Process socket ${url} message error`, e);
    }
  }, [lastJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  if (readyState === 3) return null;

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
              {formatPrice(mainData.main.balance.balance, 2)} $
            </span>
          </div>
          <div className="">
            Available balance:{" "}
            <span className="">
              {formatPrice(mainData.main.balance.availableBalance, 2)} $
            </span>
          </div>
          <div className="">
            PnL:{" "}
            <span className="">
              {formatPrice(mainData.main.balance.crossUnPnl, 2)} $
            </span>
          </div>
          <div className="">
            Start time:{" "}
            <span className="">
              {formatDate(mainData.main.start_timestamp)}
            </span>
          </div>
        </>
      )}
      <div className="">
        Status: <span className="">{connectionStatus}</span>
      </div>
    </section>
  );
};
