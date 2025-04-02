import { createContext } from "react";

export const DataContext = createContext({
  mainData: null,
  symbolsData: null,
  ordersData: null,
  tradingStatus: null,
  status: null,
  send: () => {},
});
