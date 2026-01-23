import React from "react";
import Styles from "@/styles/FirstPage.module.css";
import { useTranslation } from "@/context/TranslationContext";

const GeneralInfo = () => {
  const { t } = useTranslation();

  return (
    <div className={Styles.generalInfo}>
      <div className={Styles.generalInfoItem}>
        <p>
          <strong>{t.generalInfo.backgroundTitle}</strong>
        </p>
        <p>{t.generalInfo.backgroundText}</p>
      </div>
      <div className={Styles.generalInfoItem}>
        <p>
          <strong>{t.generalInfo.whyTitle}</strong>
        </p>
        <p>{t.generalInfo.whyText}</p>
      </div>
      <div className={Styles.generalInfoItem}>
        <p>
          <strong>{t.generalInfo.licensTitle}</strong>
        </p>
        <p>{t.generalInfo.licensText}</p>
      </div>
    </div>
  );
};

export default GeneralInfo;
