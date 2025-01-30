import {SocketClient} from "./components/SocketClient.jsx";

function App() {
    const LOCAL_SOCKET_START_PORT = 5000
    const LOCAL_SOCKET_HOST = 'localhost'
    const urls = [
     `ws://${LOCAL_SOCKET_HOST}:${LOCAL_SOCKET_START_PORT}/`
    ]

    return (
        <section className="flex flex-col">
            <header className="p-5">
                <h1 className="text">Binance bot</h1>
            </header>
            <SocketClient url={urls[0]} />
        </section>
    );
}

export default App
