import { useEffect } from "react";
import RoutesApp from "./Routes";
import { socket } from "./lib";
import "./lib/i18n";
import WebSocketProvider from "./providers/WebSocketProvider";

export const App = () => {
  useEffect(() => {
    const webSocketProvider = new WebSocketProvider(socket);
    webSocketProvider.connect();

    return () => {
      webSocketProvider.disconnect();
    };
  }, []);

  return <RoutesApp />;
};
