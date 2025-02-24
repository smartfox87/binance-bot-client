import { SocketSymbolsClient } from "../components/SocketSymbolsClient.jsx";

const urls = Array(10)
  .fill(import.meta.env.VITE_LOCAL_SOCKET_HOST)
  .map(
    (host, index) =>
      `ws://${host}:${parseInt(import.meta.env.VITE_LOCAL_SOCKET_START_PORT) + index + 1}`,
  );
// const urls2 = Array(2)
//   .fill(LOCAL_SOCKET_HOST)
//   .map(
//     (host, index) => `ws://${host}:${LOCAL_SOCKET_START_PORT + index + 1000}`,
//   );

export const SymbolsPage = () => {
  return (
    <>
      {urls.map((url, index) => (
        <SocketSymbolsClient key={index} url={url} />
      ))}
      {/*{urls2.map((url, index) => (*/}
      {/*  <SocketClient key={index} url={url} />*/}
      {/*))}*/}
    </>
  );
};
