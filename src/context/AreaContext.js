import { createContext, useContext, useState } from "react";

const AreaContext = createContext();

export function AreaProvider({ children }) {
  const [areas, setAreas] = useState([
    {
      id: "head",
      value: 0,
      palms: 20,
      redness: 0,
      thickness: 0,
      scaling: 0,
      done: false,
    },
    {
      id: "torso",
      value: 0,
      palms: 60,
      redness: 0,
      thickness: 0,
      scaling: 0,
      done: false,
    },
    {
      id: "arm",
      value: 0,
      palms: 40,
      redness: 0,
      thickness: 0,
      scaling: 0,
      done: false,
    },
    {
      id: "leg",
      value: 0,
      palms: 80,
      redness: 0,
      thickness: 0,
      scaling: 0,
      done: false,
    },
  ]);

  return (
    <AreaContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreaContext.Provider>
  );
}

export function useArea() {
  return useContext(AreaContext);
}
