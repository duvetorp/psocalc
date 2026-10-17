import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Styles from "@/styles/SliderInput.module.css";
import IconButton from "@/components/IconButton";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const STEP = 0.5;

// Antal handflator (PSA) för ett område, i steg om 0,5
const SliderInput = ({ value, max, label, onChange }) => {
  const clamp = (next) =>
    Math.min(Math.max(Math.round(next / STEP) * STEP, 0), max);

  return (
    <div className={Styles.sliderInput}>
      <IconButton
        icon={faMinus}
        label="−"
        onClick={() => onChange(clamp(value - STEP))}
      />

      <div className={Styles.track}>
        <Slider
          min={0}
          max={max}
          step={STEP}
          value={value}
          onChange={(val) => onChange(clamp(val))}
          ariaLabelForHandle={label}
          styles={{
            rail: { backgroundColor: "#d5dce6", height: 8 },
            track: { backgroundColor: "var(--accent)", height: 8 },
          }}
          handleRender={(node) => (
            <div
              {...node.props}
              className={`${node.props.className} ${Styles.handle}`}
            >
              <Image
                src={assetPath("/images/hand.svg")}
                alt=""
                width={48}
                height={50}
                draggable={false}
              />
              <span className={Styles.handleValue}>{value}</span>
            </div>
          )}
        />
        <div className={Styles.scale}>
          <span>0</span>
          <span>{max}</span>
        </div>
      </div>

      <IconButton
        icon={faPlus}
        label="+"
        onClick={() => onChange(clamp(value + STEP))}
      />
    </div>
  );
};

export default SliderInput;
