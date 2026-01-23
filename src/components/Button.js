import Styles from "@/styles/Button.module.css";
import { useRouter } from "next/router";
import useDeviceType from "@/hooks/useDeviceType";

const Button = ({ lockButton, textButton, buttonUrl, shouldLock, width }) => {
  const router = useRouter();
  const isMobile = useDeviceType();

  const routeButton = () => {
    router.push(buttonUrl);
  };

  return (
    <div className={Styles.buttonContainer}>
      <div
        className={Styles.button}
        style={{ width: !isMobile ? `${width}px` : "100%" }}
        onClick={() => {
          routeButton();
          if (shouldLock) {
            lockButton();
          }
        }}
      >
        {textButton}
      </div>
    </div>
  );
};

export default Button;
