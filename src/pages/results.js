import React, { useState } from "react";
import Image from "next/image";
import Styles from "@/styles/Results.module.css";
import PasiComponent from "@/components/PasiComponent";
import ZPasiComponent from "@/components/ZPasiComponent";
import BsaComponent from "@/components/BsaComponent";
import Button from "@/components/Button";
import { useTranslation } from "@/context/TranslationContext";
import { useArea } from "@/context/AreaContext";

const Results = () => {
  const { areas } = useArea();
  const { t } = useTranslation();
  const today = new Date();

  const [torsoFill, setTorsoFill] = useState(20); // procent

  const totalHeight = 200; // Höjd på bålen (i viewBox-enhet)
  const fillHeight = (torsoFill / 100) * totalHeight;

  return (
    <div className={Styles.results}>
      <div className={Styles.resultsContainer}>
        <div className={Styles.resultsTitle}>
          <Image
            src="/images/stetoskop.png"
            alt="stetoskop"
            width={38}
            height={38}
          />
          <h1>{t.translation.results}</h1>
        </div>
        <div className={Styles.resultsDate}>
          <p>
            {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
          </p>
        </div>
        <div className={Styles.resultsContent}>
          <h2>{t.translation.yourResults}</h2>
          <div className={Styles.resultsAreaItem}>
            <PasiComponent areas={areas} total={true} /> <p>PASI</p>
          </div>
          <div className={Styles.resultsAreaItem}>
            <ZPasiComponent areas={areas} total={true} /> <p>zPASI</p>
          </div>
          <div className={Styles.resultsAreaItem}>
            <BsaComponent areas={areas} total={true} /> <p>BSA</p>
          </div>
        </div>
        <div className={Styles.resultsButton}>
          <Button
            textButton={t.translation.back}
            buttonUrl="/home"
            shouldLock={false}
            width={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
