import { Languages } from "lucide-react";
import { useI18n, SUPPORTED } from "../i18n.jsx";

const labels = {
  en: { short: "EN", full: "English" },
  sw: { short: "SW", full: "Kiswahili" },
};

export default function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang-toggle" role="group" aria-label={t("lang.label")}>
      <span className="theme-toggle__label">
        <Languages size={14} aria-hidden="true" />
        {t("lang.label")}
      </span>
      <div className="theme-toggle__group">
        {SUPPORTED.map((code) => {
          const isActive = locale === code;
          const meta = labels[code];
          return (
            <button
              key={code}
              type="button"
              className={isActive ? "theme-toggle__btn is-active" : "theme-toggle__btn"}
              aria-pressed={isActive}
              aria-label={meta.full}
              onClick={() => setLocale(code)}
            >
              <span aria-hidden="true">{meta.short}</span>
              <span className="lang-toggle__full">{meta.full}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
