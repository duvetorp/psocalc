import { createContext, useContext, useState } from "react";

const AreaContext = createContext();

const initialAreas = [
  { id: "head", palms: 20 },
  { id: "torso", palms: 60 },
  { id: "arm", palms: 40 },
  { id: "leg", palms: 80 },
].map((area) => ({
  ...area,
  value: 0,
  redness: 0,
  thickness: 0,
  scaling: 0,
  done: false,
}));

export function AreaProvider({ children }) {
  const [areas, setAreas] = useState(initialAreas);

  // Spara ett områdes värden och markera det som klart
  const saveArea = (id, values) => {
    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, ...values, done: true } : area
      )
    );
  };

  const resetAreas = () => setAreas(initialAreas);

  const doneAreas = areas.filter((area) => area.done);

  return (
    <AreaContext.Provider value={{ areas, doneAreas, saveArea, resetAreas }}>
      {children}
    </AreaContext.Provider>
  );
}

export function useArea() {
  return useContext(AreaContext);
}
