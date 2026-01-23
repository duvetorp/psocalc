import React from "react";
import Styles from "@/styles/FirstPage.module.css";
import { useTranslation } from "@/context/TranslationContext";

const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <div className={Styles.disclaimerInfo}>
      <div className={Styles.disclaimerInfoItem}>
        <p>
          <strong>{t.disclaimer.disclaimerTitle}</strong>
        </p>
        <p>{t.disclaimer.disclaimerText}</p>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>
          <strong>{t.disclaimer.MITLicenceTitle}</strong>
        </p>
        <p>{t.disclaimer.MITLicenceText}</p>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>{t.disclaimer.copyrightNotice}</p>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>{t.disclaimer.software}</p>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>{t.disclaimer.CCBYTitle}</p>
        <p>{t.disclaimer.youAreFreeTo}</p>
        <ol className={Styles.orderedList}>
          <li>{t.disclaimer.youAreFreeToFirst}</li>
          <li>{t.disclaimer.youAreFreeToSecond}</li>
          <li>{t.disclaimer.youAreFreeToThird}</li>
        </ol>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>{t.disclaimer.underTheFollowing}</p>
        <ol className={Styles.orderedList}>
          <li
            dangerouslySetInnerHTML={{
              __html: t.disclaimer.underTheFollowingFirst,
            }}
          />
          <li
            dangerouslySetInnerHTML={{
              __html: t.disclaimer.underTheFollowingSecond,
            }}
          />
        </ol>
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p>{t.disclaimer.notices}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: t.disclaimer.noticesFirst,
          }}
        />
      </div>
      <div className={Styles.disclaimerInfoItem}>
        <p
          dangerouslySetInnerHTML={{
            __html: t.disclaimer.noticesSecond,
          }}
        />
      </div>
    </div>
  );
};

export default Disclaimer;
