import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Styles from "@/styles/LanguageSwitcher.module.css";

const languages = [
  { code: "sv", label: "Svenska", flag: "/images/flags/sv.png" },
  { code: "en", label: "English", flag: "/images/flags/en.png" },
  { code: "nl", label: "Nederlands", flag: "/images/flags/nl.png" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(router.locale || "sv");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedLang(router.locale);
  }, [router.locale]);

  const handleChange = (newLocale) => {
    setSelectedLang(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
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
