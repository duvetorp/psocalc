import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCircleInfo,
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
import ConfirmDialog from "@/components/ConfirmDialog";
import { format } from "@/lib/scores";
import useDeviceType from "@/hooks/useDeviceType";
import sv from "@/locales/sv.json";

// Info-rutan visas automatiskt vid första områdesbesöket under sessionen
let hasShownInfo = false;

// Ändringar görs i ett lokalt utkast och sparas först när man trycker "Klar"
const AreaEditor = ({ savedArea, category }) => {
  const router = useRouter();
  const { areas, saveArea } = useArea();
  const { t } = useTranslation();
  const [draft, setDraft] = useState(savedArea);
  const [side, setSide] = useState("front");
  const isMobile = useDeviceType();
  const actionsRef = useRef(null);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const isDirty = ["value", "redness", "thickness", "scaling"].some(
    (key) => draft[key] !== savedArea[key]
  );
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  // Webbläsarens bakåt-knapp/svep och omladdning: inbyggd bekräftelse
  useEffect(() => {
    const ownState = window.history.state;
    const onBeforeUnload = (event) => {
      if (!isDirtyRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    router.beforePopState(() => {
      if (!isDirtyRef.current || window.confirm(t.translation.unsavedText)) {
        return true;
      }
      // Återställ adressen som webbläsaren redan har bytt
      window.history.pushState(ownState, "", router.asPath);
      return false;
    });
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      router.beforePopState(() => true);
    };
  }, [router, t]);

  const handleBack = () => {
    if (isDirty) setIsLeaveOpen(true);
    else router.push("/home");
  };
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (hasShownInfo) return;
    hasShownInfo = true;
    setIsInfoOpen(true);
  }, []);

  const updateDraft = (values) => setDraft((prev) => ({ ...prev, ...values }));

  // Nästa obedömda område i listans ordning, efter det aktuella
  const order = t.categories.map((cat) => cat.id);
  const currentIndex = order.indexOf(draft.id);
  const nextCategory = [
    ...order.slice(currentIndex + 1),
    ...order.slice(0, currentIndex),
  ]
    .map((id) => t.categories.find((cat) => cat.id === id))
    .find((cat) => !areas.find((area) => area.id === cat.id)?.done);

  const handleDone = () => {
    const { value, redness, thickness, scaling } = draft;
    saveArea(draft.id, { value, redness, thickness, scaling });
    router.push(nextCategory ? `/${nextCategory.id}` : "/results");
  };

  // Nollställer området och scrollar ner till Klar-knappen för bekräftelse
  const handleNoPsoriasis = () => {
    updateDraft({ value: 0, redness: 0, thickness: 0, scaling: 0 });
    const actions = actionsRef.current;
    actions?.scrollIntoView({ behavior: "smooth", block: "center" });
    actions?.querySelector("button")?.focus({ preventScroll: true });
  };

  const areaPercent = Math.round((draft.value / draft.palms) * 100);

  return (
    <div className={Layout.page}>
      <div className={Styles.shell}>
        <div className={Styles.main}>
          <div className={Styles.toolbar}>
            <Toolbar
              left={<BackButton onBack={handleBack} />}
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
            {/* Tillfälligt borttagen – "Ingen psoriasis här"
            <button
              type="button"
              className={Styles.noPsoriasis}
              onClick={handleNoPsoriasis}
            >
              <FontAwesomeIcon icon={faBan} />
              {t.translation.noPsoriasis}
            </button>
            */}

            <section className={Styles.section}>
              <h2 className={Styles.sectionTitle}>{t.translation.area}</h2>
              <p className={Styles.handText}>
                {t.translation.handText}
                <br />
                {t.translation.palmHint}
              </p>
              {draft.id === "leg" && (
                <p className={Styles.note}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                  {t.translation.buttocksHint}
                </p>
              )}
              <SliderInput
                value={draft.value}
                max={draft.palms}
                label={t.translation.chooseHandsHere}
                onChange={(value) => updateDraft({ value })}
              >
                {format(t.translation.palmsSummary, {
                  percent: areaPercent,
                  area: category.title.toLowerCase(),
                })}
              </SliderInput>
            </section>

            <BodyImages area={draft} onSelect={updateDraft} />

            <div className={Layout.actions} ref={actionsRef}>
              <Button fullWidth onClick={handleDone}>
                {nextCategory
                  ? format(t.translation.doneNext, { area: nextCategory.title })
                  : t.translation.doneResults}
              </Button>
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
            <Body area={draft} side={side} zoomed={isMobile} />
          </div>
        </aside>
      </div>

      {isInfoOpen && <InfoPopup onClose={() => setIsInfoOpen(false)} />}
      {isLeaveOpen && (
        <ConfirmDialog
          title={t.translation.unsavedTitle}
          text={t.translation.unsavedText}
          cancelLabel={t.translation.keepEditing}
          confirmLabel={t.translation.discardChanges}
          onCancel={() => setIsLeaveOpen(false)}
          onConfirm={() => router.push("/home")}
        />
      )}
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
