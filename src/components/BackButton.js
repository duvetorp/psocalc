import { useRouter } from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/IconButton";
import { useTranslation } from "@/context/TranslationContext";

const BackButton = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const back = () => {
    router.push(router.pathname === "/home" ? "/" : "/home");
  };

  return (
    <IconButton icon={faArrowLeft} label={t.translation.back} onClick={back} />
  );
};

export default BackButton;
