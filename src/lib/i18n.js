import sv from "@/locales/sv.json";
import en from "@/locales/en.json";
import nl from "@/locales/nl.json";

const translations = { sv, en, nl };

export const getTranslation = (locale) => {
  return translations[locale] || translations["sv"];
};
