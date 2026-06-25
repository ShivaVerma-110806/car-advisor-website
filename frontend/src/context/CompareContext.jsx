import { createContext, useContext, useState } from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (carId) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) return prev;
      if (prev.length >= 2) return [prev[1], carId];
      return [...prev, carId];
    });
  };

  const removeFromCompare = (carId) => {
    setCompareList((prev) => prev.filter((id) => id !== carId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (carId) => compareList.includes(carId);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
