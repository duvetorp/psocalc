import Image from "next/image";
import Styles from "@/styles/BackButton.module.css";
import { useRouter } from "next/router";
import { assetPath } from "@/lib/assetPath";

const BackButton = () => {
  const router = useRouter();

  const back = () => {
    if (router.pathname === "/home") {
      router.push("/");
    } else if (router.pathname === "/[id]") {
      router.push("/home");
    }
  };

  return (
    <div className={Styles.backButtonWrapper}>
      <Image
        src={assetPath("/images/back.png")}
        alt="Back"
        width={35}
        height={36}
        onClick={() => back()}
      />
    </div>
  );
};

export default BackButton;
