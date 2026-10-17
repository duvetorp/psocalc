import { useEffect } from "react";
import Styles from "@/styles/InfoPopup.module.css";
import Button from "@/components/Button";

const ConfirmDialog = ({ title, text, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className={Styles.backdrop} onClick={onCancel}>
      <div
        className={`${Styles.dialog} ${Styles.compact}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-title" className={Styles.title}>
          {title}
        </h2>
        <p className={Styles.content}>{text}</p>
        <div className={Styles.buttons}>
          <Button fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button fullWidth variant="secondary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
