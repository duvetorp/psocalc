import { useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import ChooseArea from "@/components/ChooseArea";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/Home.module.css";
import { useArea } from "../context/AreaContext";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";

const Home = () => {
  const { t } = useTranslation();
  const { areas } = useArea();
  const router = useRouter();

  const hasAtleastOneDone = areas.some((area) => area.done);

  const categories = useMemo(() => t.categories, [t]);

  const calculation = router.query.calc || "PASI";

  const handleCalculationChange = useCallback((type) => {
    router.push(`/home/?calc=${type}`, undefined, { shallow: true });
  }, []);

  return (
    <div className={Styles.home}>
      <div className={Styles.homeContainer}>
        <div className={Styles.chooseAreaResults}>
          <div className={Styles.bodyText}>
            <BackButton />
            <div className={Styles.bodyTextWrapper}>
              <h1>{t.translation.chooseArea}</h1>
            </div>
          </div>
          <div className={Styles.chooseCalcContainer}>
            {["PASI", "zPASI", "BSA"].map((type) => (
              <div
                key={type}
                onClick={() => handleCalculationChange(type)}
                className={`${Styles.chooseCalc} ${
                  calculation === type ? Styles.active : ""
                }`}
              >
                {type}
              </div>
            ))}
          </div>
          <div className={Styles.chooseAreaContainer}>
            {categories.map((category) => (
              <ChooseArea
                key={category.id}
                id={category.id}
                title={category.title}
                calculation={calculation}
              />
            ))}
          </div>
          {hasAtleastOneDone && (
            <Button
              textButton={t.translation.seeResults}
              buttonUrl="/results"
              shouldLock={false}
              width={250}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
