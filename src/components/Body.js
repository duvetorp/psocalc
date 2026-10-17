import { useId } from "react";
import Styles from "@/styles/Body.module.css";
import { getBodySide, REDNESS_COLORS } from "@/lib/bodyRegions";
import { assetPath } from "@/lib/assetPath";

// Ritar kroppen och fyller vald kroppsdel från mitten och utåt
// i proportion till hur stor andel av området som är drabbat.
const Body = ({ area, side = "front" }) => {
  const uid = useId().replace(/:/g, "");
  const body = getBodySide(side);
  const region = body.regions[area.id];

  if (!region) return null;

  const coverage = Math.min(area.value / area.palms, 1);
  const regionHeight = region.bottom - region.top;
  const center = region.top + regionHeight / 2;
  const fillHeight = regionHeight * coverage;

  const ids = {
    silhouette: `silhouette-${uid}`,
    region: `region-${uid}`,
    scaling: `scaling-${uid}`,
    thickness: `thickness-${uid}`,
  };

  return (
    <svg
      className={Styles.figure}
      viewBox={`0 0 ${body.width} ${body.height}`}
      role="img"
      aria-label={`${Math.round(coverage * 100)} %`}
    >
      <defs>
        <clipPath id={ids.silhouette}>
          <path d={body.silhouette} />
        </clipPath>
        <clipPath id={ids.region}>
          <path d={region.d} />
        </clipPath>
        <pattern
          id={ids.scaling}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
        >
          <path d="M1 2 l2 -1 l1 2 l-2 1 Z M5.5 6 l2 0.5 l-0.5 1.8 l-1.8 -0.6 Z" fill="#fff" />
        </pattern>
        <pattern
          id={ids.thickness}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#5c0f17" strokeWidth="2" />
        </pattern>
      </defs>

      <image
        href={assetPath(body.image)}
        width={body.width}
        height={body.height}
      />

      <g clipPath={`url(#${ids.silhouette})`}>
        <g clipPath={`url(#${ids.region})`}>
          {/* Markerar vilket område som bedöms */}
          <rect
            className={Styles.regionHighlight}
            width={body.width}
            height={body.height}
          />
          <g className={Styles.fill}>
            <rect
              x="0"
              y={center - fillHeight / 2}
              width={body.width}
              height={fillHeight}
              fill={REDNESS_COLORS[area.redness] || REDNESS_COLORS[0]}
            />
            <rect
              x="0"
              y={center - fillHeight / 2}
              width={body.width}
              height={fillHeight}
              fill={`url(#${ids.thickness})`}
              opacity={area.thickness * 0.09}
            />
          </g>
          <g>
            <rect
              x="0"
              y={center - fillHeight / 2}
              width={body.width}
              height={fillHeight}
              fill={`url(#${ids.scaling})`}
              opacity={area.scaling / 4}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Body;
