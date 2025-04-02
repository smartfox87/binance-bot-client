import { useContext } from "react";
import { DataContext } from "../contexts/main.js";

export const ToggleTradingStatus = () => {
  const { mainData, status, send } = useContext(DataContext);

  const handleToggleStatus = () => {
    send("toggle_trading_status");
  };

  if (status === 3) return null;

  return (
    <button
      className={`cursor-pointer border px-3 py-2 font-black ${mainData?.is_running_trading ? "bg-black text-white" : ""}`}
      type="button"
      onClick={handleToggleStatus}
    >
      Trading {mainData?.is_running_trading ? "On" : "Off"}
    </button>
  );
};
