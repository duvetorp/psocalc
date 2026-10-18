import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "@/styles/GuideDialog.module.css";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { useTranslation } from "@/context/TranslationContext";
import { assetPath } from "@/lib/assetPath";

// Skärmdumpar för varje steg, i samma ordning som guide.steps i översättningarna.
// Det finns en uppsättning per språk i public/images/guide/<språk>/.
const STEP_IMAGES = [
  { file: "step1-choose-area.jpg", width: 600, height: 719 },
  { file: "step2-body.jpg", width: 600, height: 772 },
  { file: "step3-area.jpg", width: 600, height: 237 },
  { file: "step4-severity.jpg", width: 600, height: 267 },
  { file: "step5-done.jpg", width: 600, height: 119 },
  { file: "step6-results.jpg", width: 600, height: 695 },
];
const IMAGE_LOCALES = ["sv", "en", "nl", "es", "pt"];

// Gör **ord** i översättningstexten till fetstil
const withBold = (text) =>
  text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );

// Steg-för-steg-guide genom appen, öppnas från "Så fungerar det"
const GuideDialog = ({ onClose }) => {
  const { t, locale } = useTranslation();
  const { title, intro, steps, tip } = t.guide;
  const imageLocale = IMAGE_LOCALES.includes(locale) ? locale : "sv";

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    // Sidan bakom ska inte scrolla medan guiden är öppen
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // Portal till <body> så att omgivande stilar inte påverkar dialogen
  return createPortal(
    <div className={Styles.backdrop} onClick={onClose}>
      <div
        className={Styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={Styles.header}>
          <h2 id="guide-title">{title}</h2>
          <IconButton
            icon={faXmark}
            label={t.translation.close}
            onClick={onClose}
          />
        </header>

        <div className={Styles.body}>
          <p className={Styles.intro}>{intro}</p>

          <ol className={Styles.steps}>
            {steps.map((step, index) => (
              <li key={index} className={Styles.step}>
                <div className={Styles.stepHeading}>
                  <span className={Styles.number} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p>{withBold(step.text)}</p>
                {STEP_IMAGES[index] && (
                  <Image
                    className={Styles.image}
                    src={assetPath(
                      `/images/guide/${imageLocale}/${STEP_IMAGES[index].file}`
                    )}
                    width={STEP_IMAGES[index].width}
                    height={STEP_IMAGES[index].height}
                    alt={step.title}
                  />
                )}
              </li>
            ))}
          </ol>

          <p className={Styles.tip}>
            <FontAwesomeIcon icon={faCircleInfo} />
            {tip}
          </p>
        </div>

        <footer className={Styles.footer}>
          <Button fullWidth onClick={onClose}>
            {t.translation.close}
          </Button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default GuideDialog;
