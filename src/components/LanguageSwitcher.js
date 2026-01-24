import { useState, useEffect } from "react";
import Image from "next/image";
import Styles from "@/styles/LanguageSwitcher.module.css";
import { useTranslation } from "@/context/TranslationContext";
import { assetPath } from "@/lib/assetPath";

const languages = [
  { code: "sv", label: "Svenska", flag: assetPath("/images/flags/sv.png") },
  { code: "en", label: "English", flag: assetPath("/images/flags/en.png") },
  { code: "nl", label: "Nederlands", flag: assetPath("/images/flags/nl.png") },
];

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(locale || "sv");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedLang(locale || "sv");
  }, [locale]);

  const handleChange = (newLocale) => {
    setSelectedLang(newLocale);
    changeLanguage(newLocale);
    setDropdownOpen(false);
  };

  return (
    <div className={Styles.languageSwitcher}>
      <div className={Styles.languageSwitcherContainer}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <Image
            src={languages.find((lang) => lang.code === selectedLang)?.flag}
            alt="Flag"
            width={24}
            height={15}
            style={{ marginRight: "8px" }}
          />
          {languages.find((lang) => lang.code === selectedLang)?.label}
        </button>

        {dropdownOpen && (
          <div className={Styles.dropdown}>
            {languages.map((lang) => (
              <div
                className={Styles.dropdownItem}
                key={lang.code}
                onClick={() => handleChange(lang.code)}
              >
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={24}
                  height={15}
                />
                {lang.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
