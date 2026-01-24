import sv from "@/locales/sv.json";
import en from "@/locales/en.json";
import nl from "@/locales/nl.json";
import es from "@/locales/es.json";

const translations = { sv, en, nl, es };

export const getTranslation = (locale) => {
  return translations[locale] || translations["sv"];
};
