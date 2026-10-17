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

// Tal med språkets decimaltecken (0,5 på svenska, 0.5 på engelska)
export const formatNumber = (value, locale) =>
  Number(value).toLocaleString(locale, { maximumFractionDigits: 2 });

export const formatScore = (calculation, score, locale) =>
  calculation === "BSA"
    ? `${formatNumber(score, locale)} %`
    : formatNumber(score, locale);

// Enkel interpolering av "{nyckel}" i översättningssträngar
export const format = (text, values) =>
  (text || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
