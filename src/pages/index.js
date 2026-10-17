import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/FirstPage.module.css";
import Button from "@/components/Button";
import InfoSwitcher from "@/components/InfoSwitcher";
import { assetPath } from "@/lib/assetPath";

const FirstPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={Styles.firstPage}>
      <div className={Styles.logoContainer}>
        <Image
          src={assetPath("/images/logo.png")}
          alt="PsoCalc"
          width={175}
          height={100}
          priority
        />
      </div>
      <div className={Styles.card}>
        <InfoSwitcher />
        <div className={Styles.footer}>
          <Button fullWidth onClick={() => router.push("/home")}>
            {t.translation.continue}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FirstPage;
