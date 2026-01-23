"use client";

import Image from "next/image";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/FirstPage.module.css";
import Button from "@/components/Button";
import InfoSwitcher from "@/components/InfoSwitcher";

const FirstPage = () => {
  const { t } = useTranslation();

  return (
    <div className={Styles.firstPage}>
      <div className={Styles.logoContainer}>
        <Image src="/images/logo.png" alt="Logo" width={233} height={133} />
      </div>
      <div className={Styles.infoContainer}>
        <InfoSwitcher />
        <Button
          textButton={t.translation.continue}
          buttonUrl="/home"
          shouldLock={false}
          width={723}
        />
      </div>
    </div>
  );
};
export default FirstPage;
