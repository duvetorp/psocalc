import { useMemo } from "react";
import useDeviceType from "./useDeviceType";

const useMaxSizes = () => {
  const isMobile = useDeviceType();

  // 🔥 Vänta på att `isMobile` uppdateras innan vi skapar storlekar
  const maxSizes = useMemo(() => {
    if (isMobile === null) return {}; // Vänta med att returnera något

    return {
      head: {
        width: 68,
        height: isMobile ? 104 : 102,
        top: isMobile ? 108 : 115,
        left: isMobile ? 149 : 139,
        backgroundPositionY: 55,
        rotate: "0deg",
        scalingSize: 20,
        pentagonPositions: [
          { top: "15%", left: "20%" },
          { top: "15%", left: "80%" },
          { top: "50%", left: "32%" },
          { top: "50%", left: "72%" },
          { top: "85%", left: "20%" },
          { top: "85%", left: "80%" },
        ],
      },
      torso: {
        width: isMobile ? 120 : 108,
        height: isMobile ? 213 : 200,
        top: isMobile ? 150 : 260,
        left: isMobile ? 150 : 139,
        backgroundPositionY: -62,
        rotate: "0deg",
        scalingSize: 40,
        pentagonPositions: [
          { top: "10%", left: "18%" },
          { top: "14%", left: "74%" },
          { top: "50%", left: "30%" },
          { top: "50%", left: "70%" },
          { top: "75%", left: "15%" },
          { top: "90%", left: "70%" },
        ],
      },
      arm: {
        width: isMobile ? 46 : 38,
        height: isMobile ? 255 : 235,
        right: {
          top: isMobile ? 170 : 278,
          left: isMobile ? 244 : 225,
          rotate: "-17deg",
        },
        left: {
          top: isMobile ? 165 : 278,
          left: isMobile ? 56 : 52,
          rotate: "17deg",
        },
        backgroundPositionY: -62,
        scalingSize: 30,
        pentagonPositions: [
          { top: "15%", left: "10%" },
          { top: "15%", left: "80%" },
          { top: "42%", left: "20%" },
          { top: "57%", left: "87%" },
          { top: "85%", left: "15%" },
          { top: "85%", left: "85%" },
        ],
      },
      leg: {
        width: isMobile ? 54 : 51,
        height: isMobile ? 343 : 314,
        right: {
          top: isMobile ? 174 : 478,
          left: isMobile ? 178 : 165,
          rotate: "6deg",
        },
        left: {
          top: isMobile ? 174 : 478,
          left: isMobile ? 123 : 114,
          rotate: "-6deg",
        },
        backgroundPositionY: -272,
        scalingSize: 45,
        pentagonPositions: [
          { top: "22%", left: "18%" },
          { top: "15%", left: "77%" },
          { top: "60%", left: "30%" },
          { top: "45%", left: "65%" },
          { top: "85%", left: "20%" },
          { top: "85%", left: "80%" },
        ],
      },
    };
  }, [isMobile]);

  return maxSizes;
};

export default useMaxSizes;
