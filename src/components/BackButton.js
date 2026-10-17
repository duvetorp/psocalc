import { useRouter } from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/IconButton";
import { useTranslation } from "@/context/TranslationContext";

// `onBack` ersätter standardbeteendet, t.ex. för att först fråga om osparade ändringar
const BackButton = ({ onBack }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const back = () => {
    router.push(router.pathname === "/home" ? "/" : "/home");
  };

  return (
    <IconButton icon={faArrowLeft} label={t.translation.back} onClick={onBack || back} />
  );
};

export default BackButton;
