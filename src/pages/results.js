import { useRouter } from "next/router";
import Image from "next/image";
import Styles from "@/styles/Results.module.css";
import Layout from "@/styles/Layout.module.css";
import Button from "@/components/Button";
import NewAssessmentButton from "@/components/NewAssessmentButton";
import BackButton from "@/components/BackButton";
import Toolbar from "@/components/Toolbar";
import { useTranslation } from "@/context/TranslationContext";
import { useArea } from "@/context/AreaContext";
import { assetPath } from "@/lib/assetPath";
import { CALCULATIONS, getTotalScore, formatScore, format } from "@/lib/scores";

const Results = () => {
  const router = useRouter();
  const { areas, doneAreas } = useArea();
  const { t, locale } = useTranslation();

  return (
    <div className={Layout.page}>
      <div className={Layout.card}>
        <Toolbar
          left={<BackButton />}
          title={
            <span className={Styles.title}>
              <Image
                src={assetPath("/images/stetoskop.png")}
                alt=""
                width={30}
                height={30}
              />
              {t.translation.results}
            </span>
          }
        />

        <p className={Styles.date}>
          {new Date().toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className={Styles.stats}>
          {CALCULATIONS.map((calculation) => (
            <div key={calculation} className={Styles.stat}>
              <span className={Styles.statValue}>
                {formatScore(
                  calculation,
                  getTotalScore(calculation, doneAreas),
                  locale
                )}
              </span>
              <span className={Styles.statLabel}>{calculation}</span>
            </div>
          ))}
        </div>

        <p className={Layout.hint}>
          {format(t.translation.basedOnAreas, {
            done: doneAreas.length,
            total: areas.length,
          })}
        </p>

        <div className={Layout.actions}>
          <NewAssessmentButton onReset={() => router.push("/home")} />
          <Button onClick={() => router.push("/home")}>
            {t.translation.back}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
