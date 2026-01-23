const useZPasiCalculation = (areas) => {
  if (!areas || areas.length === 0) return { totalZPasi: 0, areaScores: {} };

  const areaFactors = {
    head: 0.1,
    arm: 0.2,
    torso: 0.3,
    leg: 0.4,
  };

  //Funktion för att beräkna zPASI Area Score
  const getZPasiAreaScore = (percentage) => {
    if (percentage === 0) return 0;
    if (percentage <= 9) return (1 / 9) * percentage;
    if (percentage <= 29) return 1 + (1 / 20) * (percentage - 9);
    if (percentage <= 49) return 2 + (1 / 20) * (percentage - 29);
    if (percentage <= 69) return 3 + (1 / 20) * (percentage - 49);
    if (percentage <= 89) return 4 + (1 / 20) * (percentage - 69);
    return 5 + (1 / 11) * (percentage - 89); // 90-100%
  };

  let totalZPasi = 0;
  let areaScores = {};

  areas.forEach((area) => {
    if (!areaFactors[area.id]) return;

    //Beräkna hur stor del av kroppsområdet som är drabbat
    const affectedPercentage = (area.value / area.palms) * 100;

    //Räkna ut zPASI Area Score
    const areaScore = getZPasiAreaScore(affectedPercentage);

    //Beräkna det totala zPASI-värdet för området
    const score =
      areaScore *
      areaFactors[area.id] *
      (area.redness + area.thickness + area.scaling);

    //Spara poäng för varje område med 2 decimaler
    areaScores[area.id] = parseFloat(score.toFixed(2));

    //Summera total zPASI med 2 decimaler
    totalZPasi += score;
  });

  return { totalZPasi: parseFloat(totalZPasi.toFixed(2)), areaScores };
};

export default useZPasiCalculation;
