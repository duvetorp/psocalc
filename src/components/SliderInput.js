import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Styles from "@/styles/SliderInput.module.css";
import IconButton from "@/components/IconButton";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { formatNumber } from "@/lib/scores";
import { useTranslation } from "@/context/TranslationContext";

const STEP = 0.5;

// Antal handflator (PSA) för ett område, i steg om 0,5.
// `children` visas under reglaget, t.ex. hur stor andel som valts.
const SliderInput = ({ value, max, label, onChange, children }) => {
  const { locale } = useTranslation();
  const clamp = (next) =>
    Math.min(Math.max(Math.round(next / STEP) * STEP, 0), max);

  return (
    <div className={Styles.sliderBox}>
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
                <span className={Styles.handleValue}>
                  {formatNumber(value, locale)}
                </span>
              </div>
            )}
          />
        </div>

        <IconButton
          icon={faPlus}
          label="+"
          onClick={() => onChange(clamp(value + STEP))}
        />
      </div>
      {children && <p className={Styles.summary}>{children}</p>}
    </div>
  );
};

export default SliderInput;
