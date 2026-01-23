"use client";

import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import Disclaimer from "./Disclaimer";
import MathematicalFoundation from "./MathematicalFoundation";
import Styles from "@/styles/InfoSwitcher.module.css";
import useDeviceType from "@/hooks/useDeviceType";
import { useTranslation } from "@/context/TranslationContext";

const InfoSwitcher = () => {
  const [activeComponent, setActiveComponent] = useState("GeneralInfo");
  const isMobile = useDeviceType();
  const { t } = useTranslation();

  const components = {
    GeneralInfo: <GeneralInfo />,
    MathematicalFoundation: <MathematicalFoundation />,
    Disclaimer: <Disclaimer />,
  };

  return (
    <div className={Styles.infoWrapper}>
      {!isMobile && (
        <div className={Styles.infoButtons}>
          {["GeneralInfo", "MathematicalFoundation", "Disclaimer"].map(
            (key) => (
              <div
                key={key}
                className={activeComponent === key ? Styles.activeButton : ""}
                onClick={() => setActiveComponent(key)}
              >
                {key === "GeneralInfo"
                  ? t.translation.generalInfoButton
                  : key === "MathematicalFoundation"
                  ? t.translation.mathematicalFoundationButton
                  : t.translation.disclaimerButton}
              </div>
            )
          )}
        </div>
      )}
      <div className={Styles.infoContent}>
        <div className={Styles.infoContent}>{components[activeComponent]}</div>
      </div>
      {isMobile && (
        <div className={Styles.infoButtons}>
          {["GeneralInfo", "MathematicalFoundation", "Disclaimer"].map(
            (key) => (
              <div
                key={key}
                className={activeComponent === key ? Styles.activeButton : ""}
                onClick={() => setActiveComponent(key)}
              >
                {key === "GeneralInfo"
                  ? t.translation.generalInfoButton
                  : key === "MathematicalFoundation"
                  ? t.translation.mathematicalFoundationButton
                  : t.translation.disclaimerButton}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default InfoSwitcher;
