import useZPasiCalculation from "@/hooks/useZPasiCalculation";

const ZPasiComponent = ({ area, areas, total }) => {
  if (total) {
    if (!areas || areas.length === 0) {
      return <p>No Data</p>;
    }

    const { totalZPasi } = useZPasiCalculation(areas);
    return <p style={{ fontSize: "28px" }}>{totalZPasi || 0}</p>;
  }

  if (!area) {
    return <p>No Data</p>;
  }

  const { areaScores } = useZPasiCalculation([area]);

  return <p>{areaScores[area.id] || 0}</p>;
};

export default ZPasiComponent;
