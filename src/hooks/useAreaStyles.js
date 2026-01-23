import { useState, useEffect } from "react";

const useAreaStyles = (selectedArea, id, maxSize) => {
  const [rednessStyle, setRednessStyle] = useState({});
  const [thicknessStyle, setThicknessStyle] = useState({});
  const [scalingStyle, setScalingStyle] = useState({});
  const [bodyPositionStyle, setBodyPositionStyle] = useState({});

  useEffect(() => {
    if (selectedArea) {
      const scale = Math.min(
        parseFloat(selectedArea.value ?? 0) / selectedArea.palms,
        1
      );
      const rednessOpacity = Math.min(0.2 + (selectedArea.redness ?? 0) / 5, 1);
      const scalingOpacity = Math.min(0.2 + (selectedArea.scaling ?? 0) / 5, 1);
      const thicknessOpacity = Math.min(
        0.2 + (selectedArea.thickness ?? 0) / 5,
        1
      );

      setRednessStyle({
        width: `${maxSize.width}px`,
        height: `${maxSize.height}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${maxSize.rotate})`,
        top: `${maxSize.top}px`,
        left: `${maxSize.left}px`,
        opacity: rednessOpacity,
      });

      setThicknessStyle({
        width: `${maxSize.width}px`,
        height: `${maxSize.height}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${maxSize.rotate})`,
        top: `${maxSize.top}px`,
        left: `${maxSize.left}px`,
        opacity: thicknessOpacity,
        border: "3px dotted #000",
      });

      setScalingStyle({
        opacity: scalingOpacity,
      });

      setBodyPositionStyle({
        backgroundPositionY: `${maxSize.backgroundPositionY}px`,
      });
    }
  }, [
    selectedArea?.value,
    id,
    selectedArea.redness,
    selectedArea.thickness,
    selectedArea.scaling,
  ]);

  return { rednessStyle, thicknessStyle, scalingStyle, bodyPositionStyle };
};

export default useAreaStyles;
