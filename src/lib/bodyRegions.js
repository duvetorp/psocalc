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

const regionPaths = (side) => {
  const { hipY, hipLeftToRight, height } = side;
  const bottom = height + 5;

  return {
    head: {
      d: `M0 0 L220 0 L220 74.5 L126.5 74.5 C111.956 79.68 108.456 79.18 93.1954 74.7315 L0 74.7315 Z`,
      top: 0,
      bottom: 76,
    },
    torso: {
      d: `M73.5 74.7 ${NECK} L146.138 74.5 ${RIGHT_ARMPIT_DOWN} L153 150 L160 ${hipY} L145.5 ${hipY} ${reverseHip(
        side
      )} L60 ${hipY} L67 150 ${LEFT_ARMPIT_UP} Z`,
      top: 76,
      bottom: side.hipBottom,
    },
    arm: {
      d: `M0 60 L73.5 60 L73.5 83.5 C75 87.5 76.2 99.7 69 116.5 L67 150 L60 200 L60 ${bottom} L0 ${bottom} Z
          M220 60 L146.138 60 ${RIGHT_ARMPIT_DOWN} L153 150 L160 200 L160 ${bottom} L220 ${bottom} Z`,
      top: 78,
      bottom: 260,
    },
    leg: {
      d: `M60 ${hipY} ${hipLeftToRight} L160 ${hipY} L160 ${bottom} L60 ${bottom} Z`,
      top: hipY,
      bottom: height,
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
