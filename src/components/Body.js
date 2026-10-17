import { useId } from "react";
import Styles from "@/styles/Body.module.css";
import {
  getBodySide,
  getCoverageScale,
  getZoomViewBox,
  REDNESS_COLORS,
} from "@/lib/bodyRegions";
import { assetPath } from "@/lib/assetPath";

// Ellips som växer från delens mittpunkt. Radien åt varje håll är avståndet
// till ramen gånger skalan, så mittpunkten behöver inte ligga i ramens centrum.
const growFromCenter = ({ x0, x1, y0, y1, cx, cy }, scale) => {
  const left = (cx - x0) * scale;
  const right = (x1 - cx) * scale;
  const top = (cy - y0) * scale;
  const bottom = (y1 - cy) * scale;

  return [
    `M${cx - left} ${cy}`,
    `A${left} ${top} 0 0 1 ${cx} ${cy - top}`,
    `A${right} ${top} 0 0 1 ${cx + right} ${cy}`,
    `A${right} ${bottom} 0 0 1 ${cx} ${cy + bottom}`,
    `A${left} ${bottom} 0 0 1 ${cx - left} ${cy}`,
    "Z",
  ].join(" ");
};

// Oregelbundna flagor i olika storlek för fjällningsmönstret
const FLAKES = [
  "M2 3 l3 -1 l1 2 l-2 2 l-2 -1 Z",
  "M11 1 l2 1 l-1 2 l-2 -1 Z",
  "M18 4 l4 0 l1 2 l-3 2 l-2 -2 Z",
  "M6 10 l2 -1 l2 2 l-1 2 l-3 -1 Z",
  "M14 9 l1 1 l-1 1 l-1 -1 Z",
  "M21 12 l3 1 l-1 3 l-2 -1 Z",
  "M3 17 l2 1 l0 2 l-2 0 Z",
  "M10 16 l4 -1 l1 3 l-3 2 l-2 -2 Z",
  "M18 19 l2 0 l1 1 l-2 1 Z",
  "M1 23 l1 0 l0 1 l-1 0 Z",
  "M7 22 l2 1 l-1 2 l-2 -1 Z",
  "M15 23 l3 -1 l1 2 l-2 1 Z",
];

// Ritar kroppen och fyller vald kroppsdel från mitten och utåt
// i proportion till hur stor andel av området som är drabbat.
// `zoomed` visar bara utsnittet runt kroppsdelen (mobil).
const Body = ({ area, side = "front", zoomed = false }) => {
  const uid = useId().replace(/:/g, "");
  const body = getBodySide(side);
  const region = body.regions[area.id];

  if (!region) return null;

  const coverage = Math.min(area.value / area.palms, 1);
  const scale = getCoverageScale(side, area.id, coverage);
  const shapes = region.parts.map((part) => growFromCenter(part, scale));

  const ids = {
    silhouette: `silhouette-${uid}`,
    region: `region-${uid}`,
    scaling: `scaling-${uid}`,
    thickness: `thickness-${uid}`,
    feather: `feather-${uid}`,
    mask: `mask-${uid}`,
  };

  // Fyller hela kroppsdelen; masken avgör vad som syns
  const layer = (props) => (
    <rect width={body.width} height={body.height} {...props} />
  );

  return (
    <svg
      className={Styles.figure}
      viewBox={
        zoomed
          ? getZoomViewBox(side, area.id)
          : `0 0 ${body.width} ${body.height}`
      }
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
        <filter id={ids.feather} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        {/* Ellipserna med mjuk kant */}
        <mask id={ids.mask} maskUnits="userSpaceOnUse">
          <g filter={`url(#${ids.feather})`}>
            {coverage > 0 &&
              shapes.map((d, index) => <path key={index} d={d} fill="#fff" />)}
          </g>
        </mask>
        <pattern
          id={ids.scaling}
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(17)"
        >
          {FLAKES.map((d, index) => (
            <path
              key={index}
              d={d}
              fill="#fff"
              opacity={0.65 + (index % 3) * 0.15}
            />
          ))}
        </pattern>
        <pattern
          id={ids.thickness}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="5" stroke="#5c0f17" strokeWidth="1.5" />
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
          <g className={Styles.fill} mask={`url(#${ids.mask})`}>
            {layer({
              fill: REDNESS_COLORS[area.redness] || REDNESS_COLORS[0],
            })}
            {layer({
              fill: `url(#${ids.thickness})`,
              opacity: area.thickness * 0.08,
            })}
          </g>
          <g mask={`url(#${ids.mask})`}>
            {layer({
              fill: `url(#${ids.scaling})`,
              opacity: area.scaling / 4,
            })}
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Body;
