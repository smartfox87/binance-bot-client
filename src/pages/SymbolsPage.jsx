import { SocketClient } from "../components/SocketClient.jsx";

const LOCAL_SOCKET_START_PORT = 5000;
const LOCAL_SOCKET_HOST = "localhost";
const urls = Array(40)
  .fill(LOCAL_SOCKET_HOST)
  .map((host, index) => `ws://${host}:${LOCAL_SOCKET_START_PORT + index}`);

export const SymbolsPage = () => {
  return (
    <>
      {urls.map((url, index) => (
        <SocketClient key={index} url={url} />
      ))}
    </>
  );
};
