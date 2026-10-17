import { useState } from "react";
import Styles from "@/styles/HowItWorks.module.css";
import { useTranslation } from "@/context/TranslationContext";
import Button from "@/components/Button";
import GuideDialog from "@/components/GuideDialog";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { title, steps } = t.howItWorks;
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <section className={Styles.howItWorks}>
      <h2>{title}</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>
            <span className={Styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={Styles.readMore}>
        <Button variant="secondary" fullWidth onClick={() => setIsGuideOpen(true)}>
          {t.guide.readMore}
        </Button>
      </div>

      {isGuideOpen && <GuideDialog onClose={() => setIsGuideOpen(false)} />}
    </section>
  );
};

export default HowItWorks;
