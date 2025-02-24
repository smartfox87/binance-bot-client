import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Symbols } from "./Symbols.jsx";

export const SocketSymbolsClient = ({ url }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [processingData, setProcessingData] = useState();

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    try {
      if (!lastJsonMessage) return;
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
      if (lastJsonMessage.type !== "symbols") return;
      return setProcessingData(lastJsonMessage);
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
          <div className="">
            Status: <span className="">{connectionStatus}</span>
          </div>
        </div>
      </header>
      {processingData && <Symbols data={processingData} />}
    </section>
  );
};
