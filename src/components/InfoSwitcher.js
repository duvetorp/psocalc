import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import Disclaimer from "./Disclaimer";
import MathematicalFoundation from "./MathematicalFoundation";
import Styles from "@/styles/InfoSwitcher.module.css";
import { useTranslation } from "@/context/TranslationContext";

const tabs = [
  { key: "GeneralInfo", labelKey: "generalInfoButton", Component: GeneralInfo },
  {
    key: "MathematicalFoundation",
    labelKey: "mathematicalFoundationButton",
    Component: MathematicalFoundation,
  },
  { key: "Disclaimer", labelKey: "disclaimerButton", Component: Disclaimer },
];

const InfoSwitcher = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { t } = useTranslation();

  const ActiveComponent = tabs.find((tab) => tab.key === activeTab).Component;

  return (
    <div className={Styles.infoWrapper}>
      <div className={Styles.infoButtons} role="tablist">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            key={tab.key}
            className={activeTab === tab.key ? Styles.activeButton : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {t.translation[tab.labelKey]}
          </button>
        ))}
      </div>
      <div className={Styles.infoContent} role="tabpanel">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default InfoSwitcher;
