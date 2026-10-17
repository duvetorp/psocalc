import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHand,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import Body from "@/components/Body";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/DynamicPage.module.css";
import Layout from "@/styles/Layout.module.css";
import BodyImages from "@/components/BodyImages";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Toolbar from "@/components/Toolbar";
import SliderInput from "@/components/SliderInput";
import { useArea } from "@/context/AreaContext";
import BackButton from "@/components/BackButton";
import InfoPopup from "@/components/InfoPopup";
import { format } from "@/lib/scores";
import sv from "@/locales/sv.json";

// Info-rutan visas automatiskt vid första områdesbesöket under sessionen
let hasShownInfo = false;

// Ändringar görs i ett lokalt utkast och sparas först när man trycker "Klar"
const AreaEditor = ({ savedArea, category }) => {
  const router = useRouter();
  const { saveArea } = useArea();
  const { t } = useTranslation();
  const [draft, setDraft] = useState(savedArea);
  const [side, setSide] = useState("front");
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (hasShownInfo) return;
    hasShownInfo = true;
    setIsInfoOpen(true);
  }, []);

  const updateDraft = (values) => setDraft((prev) => ({ ...prev, ...values }));

  const handleDone = () => {
    const { value, redness, thickness, scaling } = draft;
    saveArea(draft.id, { value, redness, thickness, scaling });
    router.push("/home");
  };

  const bsa = (draft.value * 0.5).toFixed(1).replace(/\.0$/, "");
  const areaPercent = Math.round((draft.value / draft.palms) * 100);

  return (
    <div className={Layout.page}>
      <div className={Styles.shell}>
        <div className={Styles.main}>
          <div className={Styles.toolbar}>
            <Toolbar
              left={<BackButton />}
              title={category.title}
              right={
                <IconButton
                  icon={faCircleInfo}
                  label={t.translation.info}
                  onClick={() => setIsInfoOpen(true)}
                />
              }
            />
          </div>

          <div className={Styles.editor}>
            <section className={Styles.section}>
              <p className={Styles.handText}>{t.translation.handText}</p>
              <SliderInput
                value={draft.value}
                max={draft.palms}
                label={t.translation.chooseHandsHere}
                onChange={(value) => updateDraft({ value })}
              />
              <p className={Styles.coverage}>
                {format(t.translation.palmsSummary, {
                  bsa,
                  percent: areaPercent,
                })}
              </p>
              <ul className={Styles.hints}>
                <li>
                  <FontAwesomeIcon icon={faHand} />
                  {format(t.translation.palmHint, { max: draft.palms })}
                </li>
                {draft.id === "leg" && (
                  <li>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    {t.translation.buttocksHint}
                  </li>
                )}
              </ul>
            </section>

            <BodyImages area={draft} onSelect={updateDraft} />

            <div className={Layout.actions}>
              <Button onClick={handleDone}>{t.translation.done}</Button>
            </div>
          </div>
        </div>

        <aside className={Styles.bodyPanel}>
          <IconButton
            icon={faRotate}
            label={side === "front" ? t.translation.showBack : t.translation.showFront}
            onClick={() => setSide(side === "front" ? "back" : "front")}
          >
            {side === "front" ? t.translation.showBack : t.translation.showFront}
          </IconButton>
          <div className={Styles.figure}>
            <Body area={draft} side={side} />
          </div>
        </aside>
      </div>

      {isInfoOpen && <InfoPopup onClose={() => setIsInfoOpen(false)} />}
    </div>
  );
};

export default function KategoriPage() {
  const router = useRouter();
  const { id } = router.query;
  const { areas } = useArea();
  const { t } = useTranslation();

  const category = t.categories.find((cat) => cat.id === id);
  const savedArea = areas.find((item) => item.id === id);

  if (!category || !savedArea) return null;

  return <AreaEditor key={id} savedArea={savedArea} category={category} />;
}

export async function getStaticPaths() {
  const paths = sv.categories.map((category) => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
