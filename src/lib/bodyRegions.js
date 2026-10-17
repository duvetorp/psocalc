import { FRONT_SILHOUETTE, BACK_SILHOUETTE } from "./bodySilhouettes";

// Gränser mellan kroppsdelar följer de streckade linjerna i kroppsbilderna
// (hals, armhålor, höfter). Koordinater i respektive SVG:s viewBox.
const NECK =
  "L93.1954 74.7315 C108.456 79.18 111.956 79.68 126.5 74.5";
const LEFT_ARMPIT_UP = "L69 116.5 C76.2 99.7 75 87.5 73.5 83.5";
const RIGHT_ARMPIT_DOWN = "L146.138 83.5 C144.638 87.5 143.438 99.7 150.638 116.5";

const sides = {
  front: {
    image: "/images/bodies-2.svg",
    width: 220,
    height: 452,
    silhouette: FRONT_SILHOUETTE,
    hipY: 200,
    // Höftlinjen är V-formad på framsidan
    hipLeftToRight:
      "L74.1803 200 C89.6802 203 93.6803 241.267 106.465 241.267 L113.216 241.267 C126 241.267 130 203 145.5 200",
    hipBottom: 241,
  },
  back: {
    image: "/images/male_back.svg",
    width: 221,
    height: 457,
    silhouette: BACK_SILHOUETTE,
    hipY: 196,
    hipLeftToRight: "L76.5 196 C90.5 189 127.533 189.202 144.5 196",
    hipBottom: 196,
  },
};

// Varje kroppsdel består av en eller flera delar (t.ex. vänster/höger arm)
// med en yttre ram (x0–x1, y0–y1) och en mittpunkt (cx, cy) som fyllnaden
// växer ut från.
const regionPaths = (side) => {
  const { hipY, hipLeftToRight, height } = side;
  const bottom = height + 5;

  return {
    head: {
      d: `M0 0 L220 0 L220 74.5 L126.5 74.5 C111.956 79.68 108.456 79.18 93.1954 74.7315 L0 74.7315 Z`,
      parts: [{ x0: 80, x1: 140, y0: 0, y1: 80, cx: 110, cy: 40 }],
    },
    torso: {
      d: `M73.5 74.7 ${NECK} L146.138 74.5 ${RIGHT_ARMPIT_DOWN} L153 150 L160 ${hipY} L145.5 ${hipY} ${reverseHip(
        side
      )} L60 ${hipY} L67 150 ${LEFT_ARMPIT_UP} Z`,
      parts: [
        {
          x0: 60,
          x1: 160,
          y0: 74,
          y1: side.hipBottom,
          cx: 110,
          cy: (74 + side.hipBottom) / 2,
        },
      ],
    },
    arm: {
      d: `M0 60 L73.5 60 L73.5 83.5 C75 87.5 76.2 99.7 69 116.5 L67 150 L60 200 L60 ${bottom} L0 ${bottom} Z
          M220 60 L146.138 60 ${RIGHT_ARMPIT_DOWN} L153 150 L160 200 L160 ${bottom} L220 ${bottom} Z`,
      // Varje arm fylls från sin egen mittpunkt
      parts: [
        { x0: 0, x1: 74, y0: 60, y1: 262, cx: 48, cy: 165 },
        { x0: 146, x1: 221, y0: 60, y1: 262, cx: 172, cy: 165 },
      ],
    },
    leg: {
      d: `M60 ${hipY} ${hipLeftToRight} L160 ${hipY} L160 ${bottom} L60 ${bottom} Z`,
      parts: [
        { x0: 60, x1: 110.5, y0: hipY, y1: height, cx: 93, cy: 330 },
        { x0: 109.5, x1: 160, y0: hipY, y1: height, cx: 127, cy: 330 },
      ],
    },
  };
};

// Höftlinjen ritad från höger till vänster, för att stänga bålens kontur
const reverseHip = (side) =>
  side === sides.front
    ? "C130 203 126 241.267 113.216 241.267 L106.465 241.267 C93.6803 241.267 89.6802 203 74.1803 200"
    : "C127.533 189.202 90.5 189 76.5 196";

export const getBodySide = (sideName) => {
  const side = sides[sideName] || sides.front;
  return { ...side, regions: regionPaths(side) };
};

// Färg för fyllnaden utifrån rodnad (0–4)
export const REDNESS_COLORS = [
  "#f2c4c4",
  "#eba0a0",
  "#e07272",
  "#cf4646",
  "#a91f2a",
];

// Skala som krävs för att ellipsen (med delens ram som radier åt varje håll)
// ska nå punkten (x, y). Ramens hörn nås först vid skala √2.
const scaleToReach = ({ x0, x1, y0, y1, cx, cy }, x, y) => {
  const dx = x < cx ? (cx - x) / (cx - x0) : (x - cx) / (x1 - cx);
  const dy = y < cy ? (cy - y) / (cy - y0) : (y - cy) / (y1 - cy);
  return Math.hypot(dx, dy);
};

const scaleCache = {};
const SAMPLE_STEP = 1.5;

// Samplar punkter som ligger både i silhuetten och i kroppsdelen och sorterar
// dem efter hur stor skala som krävs för att nå dem. Det ger en skala där
// andelen fylld kroppsyta motsvarar täckningen, även för smala/sneda delar.
const getSortedScales = (sideName, regionId) => {
  const key = `${sideName}-${regionId}`;
  if (scaleCache[key]) return scaleCache[key];

  const body = getBodySide(sideName);
  const region = body.regions[regionId];
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;visibility:hidden";
  const silhouette = document.createElementNS(ns, "path");
  silhouette.setAttribute("d", body.silhouette);
  const regionPath = document.createElementNS(ns, "path");
  regionPath.setAttribute("d", region.d);
  svg.append(silhouette, regionPath);
  document.body.appendChild(svg);

  const scales = [];
  const point = svg.createSVGPoint();
  region.parts.forEach((part) => {
    for (let x = part.x0; x <= part.x1; x += SAMPLE_STEP) {
      for (let y = part.y0; y <= part.y1; y += SAMPLE_STEP) {
        point.x = x;
        point.y = y;
        if (
          silhouette.isPointInFill(point) &&
          regionPath.isPointInFill(point)
        ) {
          scales.push(scaleToReach(part, x, y));
        }
      }
    }
  });

  svg.remove();
  scales.sort((a, b) => a - b);
  scaleCache[key] = scales;
  return scales;
};

// Skalan som gör att andelen `coverage` av kroppsdelen blir fylld
export const getCoverageScale = (sideName, regionId, coverage) => {
  if (coverage <= 0) return 0;
  // Vid full täckning växer ellipsen förbi ramens hörn
  if (coverage >= 1) return Math.SQRT2 * 1.1;
  if (typeof document === "undefined") return Math.sqrt(coverage);

  const scales = getSortedScales(sideName, regionId);
  if (scales.length === 0) return Math.sqrt(coverage);
  return scales[Math.min(Math.floor(coverage * scales.length), scales.length - 1)];
};
