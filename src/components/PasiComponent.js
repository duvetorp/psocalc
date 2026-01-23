import usePasiCalculation from "@/hooks/usePasiCalculation";

const PasiComponent = ({ area, areas, total }) => {
  if (total) {
    if (!areas || areas.length === 0) {
      return <p>No Data</p>;
    }

    const { totalPasi } = usePasiCalculation(areas);
    return <p style={{ fontSize: "28px" }}>{totalPasi || 0}</p>;
  }

  if (!area) {
    return <p>No Data</p>;
  }

  const { areaScores } = usePasiCalculation([area]);

  return <p>{areaScores[area.id] || 0}</p>;
};

export default PasiComponent;
