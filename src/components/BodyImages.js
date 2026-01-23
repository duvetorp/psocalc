import { useState, useEffect } from "react";
import Styles from "@/styles/BodyImages.module.css";
import { useTranslation } from "@/context/TranslationContext";
import Image from "next/image";
import { useArea } from "@/context/AreaContext";
import Sliderinput from "@/components/SliderInput";
import useImages from "@/hooks/useImages";
import useDeviceType from "@/hooks/useDeviceType";

const BodyImages = ({ id, changeSide }) => {
  const { t } = useTranslation();
  const images = useImages();
  const { areas, setAreas } = useArea();
  const [translationText, setTranslationText] = useState({});
  const [selectedImages, setSelectedImages] = useState({});
  const isMobile = useDeviceType();

  const selectedArea = areas.find((item) => item.id === id) || { value: 0 };
  const category = t.categories.find((cat) => cat.id === id);

  useEffect(() => {
    setTranslationText(t.translation);
  }, [t]);

  useEffect(() => {
    setSelectedImages({
      redness: images[0].src[selectedArea.redness],
      thickness: images[1].src[selectedArea.thickness],
      scaling: images[2].src[selectedArea.scaling],
    });
  }, [selectedArea.done]);

  const selectedImage = (image, index, imageSrc) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [image.id]: imageSrc,
    }));

    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, [image.id]: index } : area
      )
    );
  };

  return (
    <div className={Styles.imageContainer}>
      <div className={Styles.bodyTextArea}>
        <div className={Styles.textChangeBodyContainer}>
          <div className={Styles.textChangeBody}>
            <h1>{category.title}</h1>
            <p className={Styles.handText}>{translationText.handText}</p>
          </div>
          {isMobile && (
            <div className={Styles.changeSide}>
              <Image
                onClick={changeSide}
                src="/images/change_side.png"
                alt="hands"
                width={40}
                height={40}
              />
            </div>
          )}
        </div>
        <Sliderinput
          id={id}
          hands={translationText.hands}
          hand={translationText.hand}
        />
      </div>
      {images &&
        images.map((image) => (
          <div key={image.id} className={Styles.imageSection}>
            <div className={Styles.imageTitle}>
              <div className={Styles.imageTitleLine}></div>
              <h2>
                {(
                  translationText[image.titleKey] ||
                  image.titleKey ||
                  ""
                ).toUpperCase()}
              </h2>
              <div className={Styles.imageTitleLine}></div>
            </div>
            <div className={Styles.imageGrid}>
              {image.src.map((src, index) => (
                <div key={index} className={Styles.imageWrapperContainer}>
                  <div
                    className={`${Styles.imageWrapper} ${
                      selectedImages[image.id] === src ? Styles.selected : ""
                    }`}
                    onClick={() => selectedImage(image, index, src)}
                  >
                    <Image
                      src={src}
                      alt={String(translationText[image.titleKey] || "image")}
                      width={62}
                      height={62}
                    />
                  </div>
                  <p className={Styles.imageTitleText}>
                    {t.translation.imagesTitles[index] || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BodyImages;
