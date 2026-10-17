import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/FirstPage.module.css";
import Button from "@/components/Button";
import InfoSwitcher from "@/components/InfoSwitcher";
import HowItWorks from "@/components/HowItWorks";
import { assetPath } from "@/lib/assetPath";

const FirstPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const infoEndRef = useRef(null);
  const footerRef = useRef(null);
  const [hasReadInfo, setHasReadInfo] = useState(false);

  // "Fortsätt" aktiveras när slutet av info-kortet har synts ovanför knappen
  useEffect(() => {
    const footerHeight = footerRef.current?.offsetHeight || 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasReadInfo(true);
        observer.disconnect();
      },
      { rootMargin: `0px 0px -${footerHeight}px 0px` }
    );
    observer.observe(infoEndRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={Styles.firstPage}>
      <div className={Styles.logoContainer}>
        <Image
          src={assetPath("/images/logo.png")}
          alt="PsoCalc"
          width={175}
          height={100}
          priority
        />
      </div>
      <div className={Styles.card}>
        <InfoSwitcher />
      </div>
      <div ref={infoEndRef} aria-hidden="true" />
      <div className={Styles.card}>
        <HowItWorks />
      </div>
      <div className={Styles.footer} ref={footerRef}>
        <Button
          fullWidth
          disabled={!hasReadInfo}
          onClick={() => router.push("/home")}
        >
          {t.translation.continue}
        </Button>
        {!hasReadInfo && (
          <p className={Styles.footerHint}>{t.translation.scrollToContinue}</p>
        )}
      </div>
    </div>
  );
};
export default FirstPage;
