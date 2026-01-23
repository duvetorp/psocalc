const usePasiCalculation = (areas) => {
  if (!areas || areas.length === 0) return { totalPasi: 0, areaScores: {} };

  const areaFactors = {
    head: 0.1,
    arm: 0.2,
    torso: 0.3,
    leg: 0.4,
  };

  //Funktion för att beräkna "area score" enligt PASI-tabellen
  const getAreaScore = (percentage) => {
    if (percentage === 0) return 0;
    if (percentage <= 9) return 1;
    if (percentage <= 29) return 2;
    if (percentage <= 49) return 3;
    if (percentage <= 69) return 4;
    if (percentage <= 89) return 5;
    return 6; // 90-100%
  };

  let totalPasi = 0;
  let areaScores = {};

  areas.forEach((area) => {
    if (!areaFactors[area.id]) return;

    //Omvandla antalet valda handflator (`value`) till procent av kroppsdelen
    const affectedPercentage = (area.value / area.palms) * 100;

    //Beräkna "area score" utifrån PASI-tabellen
    const areaScore = getAreaScore(affectedPercentage);

    //Räkna ut PASI-formeln för detta område
    const score =
      areaScore *
      areaFactors[area.id] *
      (area.redness + area.thickness + area.scaling);

    //Spara poäng för varje område med 2 decimaler
    areaScores[area.id] = parseFloat(score.toFixed(2));

    //Summera total PASI med 2 decimaler
    totalPasi += score;
  });

  return { totalPasi: parseFloat(totalPasi.toFixed(2)), areaScores };
};

export default usePasiCalculation;
