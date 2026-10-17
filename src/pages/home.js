import { useRouter } from "next/router";
import ChooseArea from "@/components/ChooseArea";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/Home.module.css";
import Layout from "@/styles/Layout.module.css";
import { useArea } from "@/context/AreaContext";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Toolbar from "@/components/Toolbar";
import { CALCULATIONS, getTotalScore, formatScore, format } from "@/lib/scores";

const Home = () => {
  const { t } = useTranslation();
  const { areas, doneAreas, resetAreas } = useArea();
  const router = useRouter();

  const calculation = CALCULATIONS.includes(router.query.calc)
    ? router.query.calc
    : "PASI";

  const handleCalculationChange = (type) => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query, calc: type } },
      undefined,
      { shallow: true }
    );
  };

  const handleReset = () => {
    if (window.confirm(t.translation.confirmReset)) resetAreas();
  };

  const hasDone = doneAreas.length > 0;

  return (
    <div className={Layout.page}>
      <div className={Layout.card}>
        <Toolbar left={<BackButton />} title={t.translation.chooseArea} />

        <div className={Styles.segmented} role="tablist">
          {CALCULATIONS.map((type) => (
            <button
              type="button"
              role="tab"
              aria-selected={calculation === type}
              key={type}
              onClick={() => handleCalculationChange(type)}
              className={calculation === type ? Styles.active : ""}
            >
              {type}
            </button>
          ))}
        </div>

        <div className={Styles.areaList}>
          {t.categories.map((category) => (
            <ChooseArea
              key={category.id}
              area={areas.find((item) => item.id === category.id)}
              title={category.title}
              calculation={calculation}
            />
          ))}
        </div>

        <div className={Styles.summary}>
          <span className={Styles.progress}>
            {format(t.translation.areasAssessed, {
              done: doneAreas.length,
              total: areas.length,
            })}
          </span>
          <span className={Styles.total}>
            {t.translation.total} {calculation}
            <strong>
              {hasDone
                ? formatScore(calculation, getTotalScore(calculation, doneAreas))
                : "–"}
            </strong>
          </span>
        </div>

        <div className={Layout.actions}>
          {hasDone && (
            <Button variant="secondary" onClick={handleReset}>
              {t.translation.newAssessment}
            </Button>
          )}
          <Button disabled={!hasDone} onClick={() => router.push("/results")}>
            {t.translation.seeResults}
          </Button>
        </div>
        {!hasDone && <p className={Layout.hint}>{t.translation.seeResultsHint}</p>}
      </div>
    </div>
  );
};

export default Home;
