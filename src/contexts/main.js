import { createContext } from "react";

export const DataContext = createContext({
  mainData: null,
  symbolsData: null,
  status: null,
});
