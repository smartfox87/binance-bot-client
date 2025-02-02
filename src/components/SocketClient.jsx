import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Symbols } from "./Symbols.jsx";
import { formatDate } from "../utils/format-date.js";

export const SocketClient = ({ url }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [processingData, setProcessingData] = useState();
  const [configData, setConfigData] = useState();

  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    try {
      if (!lastMessage?.data) return;
      const data = JSON.parse(lastMessage.data);
      if (!data) return;
      setMessageHistory((prev) => prev.concat(data));
      if (data.type === "process") {
        return setProcessingData(data);
      } else if (data.type === "config") {
        return setConfigData(data);
      }
    } catch (e) {
      console.error(`Process socket ${url} message error`, e);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  if (readyState === 3) return null;

  return (
    <section className="container py-4">
      <header className="flex items-center justify-between">
        <h2 className="font-black">{url}</h2>
        <div className="flex gap-4">
          {processingData && (
            <>
              <div className="">
                Iteration: <span className="">{processingData.iteration}</span>
              </div>
              <div className="">
                Duration: <span className="">{processingData.duration}</span>
              </div>
            </>
          )}
          {configData && (
            <>
              <div className="">
                Start time:{" "}
                <span className="">
                  {formatDate(configData.config.start_timestamp)}
                </span>
              </div>
            </>
          )}
          <div className="">
            Status: <span className="">{connectionStatus}</span>
          </div>
        </div>
      </header>
      {processingData && <Symbols data={processingData} />}
    </section>
  );
};
