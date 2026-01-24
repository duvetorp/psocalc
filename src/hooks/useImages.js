import { assetPath } from "@/lib/assetPath";

const useImages = () => {
  return [
    {
      id: "redness",
      titleKey: "redness",
      src: [
        assetPath("/images/redness/Rodnad1.png"),
        assetPath("/images/redness/Rodnad2.png"),
        assetPath("/images/redness/Rodnad3.png"),
        assetPath("/images/redness/Rodnad4.png"),
        assetPath("/images/redness/Rodnad5.png"),
      ],
    },
    {
      id: "thickness",
      titleKey: "thickness",
      src: [
        assetPath("/images/thickness/Induration0.png"),
        assetPath("/images/thickness/Induration1.png"),
        assetPath("/images/thickness/Induration2.png"),
        assetPath("/images/thickness/Induration3-4.png"),
        assetPath("/images/thickness/Induration3-4[2].png"),
      ],
    },
    {
      id: "scaling",
      titleKey: "scaling",
      src: [
        assetPath("/images/scaling/Scaling0.png"),
        assetPath("/images/scaling/Scaling1.png"),
        assetPath("/images/scaling/Scaling2.png"),
        assetPath("/images/scaling/Scaling3.png"),
        assetPath("/images/scaling/Scaling4.png"),
      ],
    },
  ];
};

export default useImages;
