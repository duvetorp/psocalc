import Image from "next/image";
import Styles from "@/styles/BodyImages.module.css";
import { useTranslation } from "@/context/TranslationContext";
import useImages from "@/hooks/useImages";

// Val av rodnad, tjocklek och fjällning (0–4) med referensbilder
const BodyImages = ({ area, onSelect }) => {
  const { t } = useTranslation();
  const images = useImages();

  return (
    <div className={Styles.imageContainer}>
      {images.map((image) => {
        const title = t.translation[image.titleKey];

        return (
          <section key={image.id} className={Styles.imageSection}>
            <h2 className={Styles.imageTitle}>{title}</h2>
            <div className={Styles.imageGrid} role="group" aria-label={title}>
              {image.src.map((src, index) => {
                const isSelected = area[image.id] === index;
                const label = t.translation.imagesTitles[index];

                return (
                  <button
                    type="button"
                    key={src}
                    className={`${Styles.option} ${
                      isSelected ? Styles.selected : ""
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => onSelect({ [image.id]: index })}
                  >
                    <span className={Styles.imageWrapper}>
                      <Image src={src} alt="" width={72} height={72} />
                    </span>
                    <span className={Styles.optionLabel}>
                      <span className={Styles.optionIndex}>{index}</span>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default BodyImages;
