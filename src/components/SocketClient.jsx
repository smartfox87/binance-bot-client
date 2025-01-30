import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Symbols } from "./Symbols.jsx";

export const SocketClient = ({ url }) => {
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    console.log(lastMessage);
    if (lastMessage !== null)
      setMessageHistory((prev) => prev.concat(JSON.parse(lastMessage.data)));
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <section className="container py-4">
      <header className="flex items-center justify-between">
        <h2 className="font-black">{url}</h2>
        <span className="">{connectionStatus}</span>
      </header>
      {/*{<Symbols items={messageHistory} />}*/}
    </section>
  );
};
