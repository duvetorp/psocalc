import sv from "@/locales/sv.json";
import en from "@/locales/en.json";
import nl from "@/locales/nl.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";

const translations = { sv, en, nl, es, pt };

export const getTranslation = (locale) => {
  return translations[locale] || translations["sv"];
};
