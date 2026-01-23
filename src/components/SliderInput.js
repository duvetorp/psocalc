import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useArea } from "@/context/AreaContext";
import Styles from "@/styles/SliderInput.module.css";
import { useTranslation } from "@/context/TranslationContext";
import Image from "next/image";

const SliderInput = ({ id }) => {
  const { areas, setAreas } = useArea();
  const selectedArea = areas.find((item) => item.id === id);
  const { t } = useTranslation();

  const [value, setValue] = useState(
    selectedArea?.done ? selectedArea.value : 0
  );

  useEffect(() => {
    setAreas((prevAreas) =>
      prevAreas.map((area) => (area.id === id ? { ...area, value } : area))
    );
  }, [value]);

  const handleDecrease = () => {
    setValue((prev) =>
      Math.max(parseFloat((parseFloat(prev) - 0.5).toFixed(1)), 0)
    );
  };

  const handleIncrease = () => {
    setValue((prev) =>
      Math.min(
        parseFloat((parseFloat(prev) + 0.5).toFixed(1)),
        selectedArea.palms
      )
    );
  };

  return (
    <div className={Styles.sliderInput}>
      <div className={Styles.sliderInputContainer}>
        <button
          onClick={handleDecrease}
          className={Styles.sliderInputDecreaseButton}
        >
          −
        </button>

        <div className={Styles.sliderInputDecreaseWrapper}>
          <Slider
            min={0}
            max={selectedArea.palms}
            step={0.5}
            value={parseFloat(value)}
            onChange={(val) => setValue(val.toFixed(1))}
            styles={{
              track: { backgroundColor: "transparent", height: 10 },
              rail: { backgroundColor: "transparent", height: 10 },
            }}
            handleRender={(renderProps) => {
              return (
                <div
                  {...renderProps.props}
                  aria-label={t.translation.chooseHandsHere}
                  style={{
                    ...renderProps.props.style,
                    width: "50px",
                    height: "50px",
                    position: "absolute", // viktigt för att kunna justera
                    top: "10%", // centrerar vertikalt
                    left: renderProps.props.style?.left, // behåller horisontell position
                    transform: "translate(-50%, -50%)", // centrerar både x och y
                    cursor: "grab",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Image
                    src="/images/hand.svg"
                    alt="hand"
                    width={62}
                    height={65}
                    draggable={false}
                    style={{
                      pointerEvents: "none",
                      position: "absolute",
                      top: -3,
                      left: 0,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "72%",
                      left: "64%",
                      transform: "translate(-50%, -50%)",
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "14px",
                      pointerEvents: "none",
                      fontSize: "13px",
                    }}
                  >
                    {parseFloat(value)}
                  </span>
                </div>
              );
            }}
          />
        </div>

        <button
          onClick={handleIncrease}
          className={Styles.sliderInputIncreaseButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SliderInput;
