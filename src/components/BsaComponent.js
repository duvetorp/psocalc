import useBsaCalculation from "@/hooks/useBsaCalculation";

const BsaComponent = ({ area, areas, total }) => {
  if (total) {
    if (!areas || areas.length === 0) {
      return <p>No Data</p>;
    }

    const { totalBsa } = useBsaCalculation(areas);
    return <p style={{ fontSize: "28px" }}>{totalBsa || 0}</p>;
  }

  if (!area) {
    return <p>No Data</p>;
  }

  const { areaScores } = useBsaCalculation([area]);

  return <p>{areaScores[area.id] || 0}</p>;
};

export default BsaComponent;
