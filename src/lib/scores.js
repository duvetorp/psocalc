import usePasiCalculation from "@/hooks/usePasiCalculation";
import useZPasiCalculation from "@/hooks/useZPasiCalculation";
import useBsaCalculation from "@/hooks/useBsaCalculation";

export const CALCULATIONS = ["PASI", "zPASI", "BSA"];

// Beräkningarna är rena funktioner trots "use"-prefixet
export const getTotalScore = (calculation, areas) => {
  if (calculation === "zPASI") return useZPasiCalculation(areas).totalZPasi;
  if (calculation === "BSA") return useBsaCalculation(areas).totalBsa;
  return usePasiCalculation(areas).totalPasi;
};

export const formatScore = (calculation, score) =>
  calculation === "BSA" ? `${score} %` : `${score}`;

// Enkel interpolering av "{nyckel}" i översättningssträngar
export const format = (text, values) =>
  (text || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
