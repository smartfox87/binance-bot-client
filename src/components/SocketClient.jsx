import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Symbols } from "./Symbols.jsx";

export const SocketClient = ({ url }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    try {
      if (!lastMessage?.data) return;
      const data = JSON.parse(lastMessage.data);
      if (!data) return;
      setMessageHistory((prev) => prev.concat(data));
      setMessage(data);
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
          {message && (
            <>
              <div className="">
                Iteration: <span className="">{message.iteration}</span>
              </div>
              <div className="">
                Duration: <span className="">{message.duration}</span>
              </div>
            </>
          )}
          <div className="">
            Status: <span className="">{connectionStatus}</span>
          </div>
        </div>
      </header>
      {message && <Symbols data={message} />}
    </section>
  );
};
