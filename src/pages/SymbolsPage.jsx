import { SymbolsGroup } from "../components/SymbolsGroup.jsx";
import { useContext } from "react";
import { DataContext } from "../contexts/main.js";

export const SymbolsPage = () => {
  const { symbolsData } = useContext(DataContext);
  if (!symbolsData) return null;

  return (
    <>
      {Object.values(symbolsData).map((group, index) => (
        <SymbolsGroup key={index} index={index + 1} data={group} />
      ))}
    </>
  );
};
