import { useState } from "react";
import Image from "next/image";
import Styles from "@/styles/Body.module.css";
import { useArea } from "@/context/AreaContext";
import useMaxSizes from "@/hooks/useMaxSizes";
import useAreaStyles from "@/hooks/useAreaStyles";
import useDeviceType from "@/hooks/useDeviceType";
import BackButton from "@/components/BackButton";
import InfoPopup from "@/components/InfoPopup";

const Body = ({ isFrontBody, id, showThis, changeSide }) => {
  const { areas } = useArea();
  const maxSizes = useMaxSizes();
  const isMobile = useDeviceType();
  const [isOpen, setIsOpen] = useState(false);

  const selectedArea = areas.find((item) => item.id === id) || { value: 1 };

  const baseSize = maxSizes[id] || {};
  const hasSides = baseSize.left && baseSize.right;
  const sides = hasSides ? ["left", "right"] : [null];

  const getSizeObj = (side) =>
    side ? { ...baseSize, ...baseSize[side] } : { ...baseSize };

  const getPentagons = (sizeObj) =>
    sizeObj.pentagonPositions?.map((pos) => ({
      ...pos,
      size: `${sizeObj.scalingSize}px`,
    })) || [];

  const openPopup = () => {
    setIsOpen((prev) => !prev);
  };

  // Använd den första sidan (eller det enda objektet) för bodyPositionStyle
  const previewSize = getSizeObj(sides[0]);
  const { bodyPositionStyle } = useAreaStyles(selectedArea, id, previewSize);

  return (
    <div className={Styles.body}>
      <div
        className={
          showThis
            ? Styles.backButtonContainer
            : Styles.backButtonContainerHidden
        }
      >
        {!isMobile && (
          <Image
            onClick={changeSide}
            src="/images/change_side.png"
            alt="hands"
            width={40}
            height={40}
          />
        )}
        {isMobile && (
          <>
            <BackButton />
            <Image
              src="/images/info.png"
              alt="Back"
              width={35}
              height={36}
              onClick={() => openPopup()}
            />
          </>
        )}

        {isOpen && <InfoPopup openPopup={openPopup} isOpen={isOpen} />}
      </div>

      {showThis ? (
        <div
          className={
            isFrontBody
              ? `${Styles.bodyImageContainer} ${Styles.bodyImageFront}`
              : `${Styles.bodyImageContainer} ${Styles.bodyImageBack}`
          }
          style={bodyPositionStyle}
        >
          {sides.map((side) => {
            const sizeObj = getSizeObj(side);
            const pentagons = getPentagons(sizeObj);
            const { rednessStyle, thicknessStyle, scalingStyle } =
              useAreaStyles(selectedArea, id, sizeObj);

            return (
              <div key={side || "single"}>
                <div
                  className={Styles.bodyImageAreaRedness}
                  style={selectedArea.value > 0 ? rednessStyle : null}
                >
                  {pentagons.map((pentagon, index) => (
                    <div
                      key={index}
                      className={Styles.pentagon}
                      style={{
                        top: pentagon.top,
                        left: pentagon.left,
                        width: pentagon.size,
                        height: pentagon.size,
                        position: "absolute",
                        opacity: scalingStyle.opacity,
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  className={Styles.bodyImageAreaThickness}
                  style={selectedArea.value > 0 ? thicknessStyle : null}
                ></div>
              </div>
            );
          })}
        </div>
      ) : (
        <Image
          className={Styles.bodyImage}
          src="/images/bodies-2.svg"
          alt="hero"
          width={163}
          height={359}
        />
      )}
    </div>
  );
};

export default Body;
