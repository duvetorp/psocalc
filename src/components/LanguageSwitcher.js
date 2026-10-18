import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Styles from "@/styles/LanguageSwitcher.module.css";
import { useTranslation } from "@/context/TranslationContext";
import { assetPath } from "@/lib/assetPath";

const languages = [
  { code: "sv", label: "Svenska", flag: assetPath("/images/flags/sv.png") },
  { code: "en", label: "English", flag: assetPath("/images/flags/en.png") },
  { code: "nl", label: "Nederlands", flag: assetPath("/images/flags/nl.png") },
  { code: "es", label: "Español", flag: assetPath("/images/flags/es.svg") },
  { code: "pt", label: "Português", flag: assetPath("/images/flags/br.svg") },
];

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  const selected =
    languages.find((lang) => lang.code === locale) || languages[0];

  // Stäng menyn vid klick utanför eller Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setDropdownOpen(false);
    };
    const onKeyDown = (event) => event.key === "Escape" && setDropdownOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  const handleChange = (newLocale) => {
    changeLanguage(newLocale);
    setDropdownOpen(false);
  };

  return (
    <div className={Styles.languageSwitcher}>
      <div className={Styles.languageSwitcherContainer} ref={containerRef}>
        <button
          type="button"
          className={Styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Image src={selected.flag} alt="" width={22} height={14} />
          {selected.label}
          <FontAwesomeIcon icon={faChevronDown} className={Styles.chevron} />
        </button>

        {dropdownOpen && (
          <ul className={Styles.dropdown} role="listbox">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === selected.code}
                  className={Styles.dropdownItem}
                  onClick={() => handleChange(lang.code)}
                >
                  <Image src={lang.flag} alt="" width={22} height={14} />
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
