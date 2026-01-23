const useBsaCalculation = (areas) => {
  if (!areas || areas.length === 0) return { totalBsa: 0, areaScores: {} };

  //Max antal handflator för varje område
  const maxPalms = {
    head: 10,
    arm: 20,
    torso: 30,
    leg: 40,
  };

  let totalBsa = 0;
  let areaScores = {};

  areas.forEach((area) => {
    console.log(area.value);
    if (!maxPalms[area.id]) return;

    //Beräkna hur stor del av kroppsområdet som är drabbat i procent
    const affectedBsa = (area.value * 1) / 2;

    //Spara poäng för varje område med 2 decimaler
    areaScores[area.id] = parseFloat(affectedBsa.toFixed(2));

    //Summera total BSA med 2 decimaler
    totalBsa += affectedBsa;
  });

  return { totalBsa: parseFloat(totalBsa.toFixed(2)), areaScores };
};

export default useBsaCalculation;
