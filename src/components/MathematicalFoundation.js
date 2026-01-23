import React from "react";
import Styles from "@/styles/FirstPage.module.css";
import { useTranslation } from "@/context/TranslationContext";

const MathematicalFoundation = () => {
  const { t } = useTranslation();

  return (
    <div className={Styles.mathematicalFoundation}>
      <div className={Styles.mathematicalFoundationItem}>
        <p>
          <strong>{t.mathematicalFoundation.BSATitle}</strong>
        </p>
        <p>{t.mathematicalFoundation.BSAText}</p>
      </div>
      <div className={Styles.mathematicalFoundationItem}>
        <p>
          <strong>{t.mathematicalFoundation.PASITitle}</strong>
        </p>
        <p>{t.mathematicalFoundation.PASIText}</p>
      </div>
      <div className={Styles.mathematicalFoundationItem}>
        <p>
          <strong>{t.mathematicalFoundation.zPASITitle}</strong>
        </p>
        <p>{t.mathematicalFoundation.zPASIText}</p>
      </div>
      <div className={Styles.mathematicalFoundationItem}>
        <p>0% = 0</p>
        <p> 1-9% = (1/9 x a%)</p>
        <p> 10-29% = 1 + (1/20 x (a% - 9))</p>
        <p> 30-49% = 2 + (1/20 x (a% -29))</p>
        <p>50-69% = 3 + (1/20 x (a% - 49))</p>
        <p>70-89% = 4 + (1/20 x (a% - 69))</p>
        <p> 90-100% = 5 + (1/11 x (a% - 89))</p>
      </div>
      <div className={Styles.mathematicalFoundationItem}>
        <p>{t.mathematicalFoundation.procent}</p>
      </div>
    </div>
  );
};

export default MathematicalFoundation;
