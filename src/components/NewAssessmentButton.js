import { useState } from "react";
import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useArea } from "@/context/AreaContext";
import { useTranslation } from "@/context/TranslationContext";

// "Ny bedömning" med bekräftelse innan alla värden nollställs
const NewAssessmentButton = ({ onReset }) => {
  const { resetAreas } = useArea();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    resetAreas();
    setIsOpen(false);
    onReset?.();
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        {t.translation.newAssessment}
      </Button>
      {isOpen && (
        <ConfirmDialog
          title={t.translation.resetTitle}
          text={t.translation.confirmReset}
          cancelLabel={t.translation.cancel}
          confirmLabel={t.translation.resetConfirm}
          onCancel={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default NewAssessmentButton;
