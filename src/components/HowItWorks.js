import Styles from "@/styles/HowItWorks.module.css";
import { useTranslation } from "@/context/TranslationContext";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { title, steps } = t.howItWorks;

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
    </section>
  );
};

export default HowItWorks;
