import { useId } from "react";
import Styles from "@/styles/HowItWorks.module.css";
import { FRONT_SILHOUETTE } from "@/lib/bodySilhouettes";
import { assetPath } from "@/lib/assetPath";

// Handflatan (utan fingrar och tumme) på högra handen i bodies-2.svg
const PALM =
  "M181 221.5 C186 219.5 193 217.5 198.5 216.5 Q205.5 222 206 231.5 " +
  "C204.5 235.5 203 238.5 201.8 241 C199.8 242.6 197.6 242.6 196 242.3 " +
  "C193.6 242.9 191.6 242.9 190 242.3 C188 241.6 186.4 240.8 185 240 " +
  "C183.2 234 181.8 228 181 221.5 Z";

// Visar vilken yta en handflata är, med samma kroppsbild och fyllnadsstil
// som kroppsfiguren på bedömningssidan
const PalmIllustration = ({ label }) => {
  const uid = useId().replace(/:/g, "");
  const ids = { silhouette: `palm-sil-${uid}`, feather: `palm-feather-${uid}` };

  return (
    <figure className={Styles.palm}>
      <svg viewBox="176 212 46 48" role="img" aria-label={label}>
        <defs>
          <clipPath id={ids.silhouette}>
            <path d={FRONT_SILHOUETTE} />
          </clipPath>
          <filter id={ids.feather} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <image href={assetPath("/images/bodies-2.svg")} width="220" height="452" />
        <g clipPath={`url(#${ids.silhouette})`}>
          <path
            className={Styles.palmArea}
            d={PALM}
            filter={`url(#${ids.feather})`}
          />
        </g>
      </svg>
    </figure>
  );
};

export default PalmIllustration;
