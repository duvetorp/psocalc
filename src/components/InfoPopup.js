import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Styles from "@/styles/InfoPopup.module.css";
import { useTranslation } from "@/context/TranslationContext";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";

const InfoPopup = ({ onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={Styles.backdrop} onClick={onClose}>
      <div
        className={Styles.dialog}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={Styles.close}>
          <IconButton icon={faXmark} label={t.translation.close} onClick={onClose} />
        </div>
        <div
          className={Styles.content}
          dangerouslySetInnerHTML={{ __html: t.translation.popupInfoText }}
        />
        <Button fullWidth onClick={onClose}>
          {t.translation.continue}
        </Button>
      </div>
    </div>
  );
};

export default InfoPopup;
