import { useContext } from "react";
import { DataContext } from "../contexts/main.js";
import { Switch } from "./Switch.jsx";

export const ToggleTradingStatus = () => {
  const { mainData, status, send } = useContext(DataContext);

  const handleToggleStatus = () => {
    send("toggle_trading_status");
  };

  if (status === 3) return null;

  return (
    <Switch
      name="Trading"
      value={mainData?.is_running_trading}
      onChange={handleToggleStatus}
    />
  );
};
