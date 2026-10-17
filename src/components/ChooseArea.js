import { useRouter } from "next/router";
import Styles from "@/styles/ChooseArea.module.css";
import {
  faChevronRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/context/TranslationContext";
import { getTotalScore, formatScore } from "@/lib/scores";

const ChooseArea = ({ area, title, calculation }) => {
  const router = useRouter();
  const { t, locale } = useTranslation();

  return (
    <button
      type="button"
      className={`${Styles.chooseArea} ${area.done ? Styles.done : ""}`}
      onClick={() => router.push(`/${area.id}`)}
    >
      <span className={Styles.title}>{title}</span>
      <span className={Styles.score}>
        {area.done ? (
          formatScore(calculation, getTotalScore(calculation, [area]), locale)
        ) : (
          <span className={Styles.notAssessed}>
            {t.translation.notAssessed}
          </span>
        )}
      </span>
      <FontAwesomeIcon
        className={Styles.icon}
        icon={area.done ? faCircleCheck : faChevronRight}
      />
    </button>
  );
};

export default ChooseArea;
