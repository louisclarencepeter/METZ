import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { getUserPreference, setUserPreference, subscribe } from "../theme.js";
import { useI18n } from "../i18n.jsx";

const options = [
  { value: "auto", labelKey: "theme.auto", Icon: Monitor },
  { value: "light", labelKey: "theme.light", Icon: Sun },
  { value: "dark", labelKey: "theme.dark", Icon: Moon },
];

export default function ThemeToggle() {
  const { t } = useI18n();
  const [preference, setPreference] = useState(() => getUserPreference());

  useEffect(() => {
    return subscribe((next) => setPreference(next));
  }, []);

  function choose(value) {
    setUserPreference(value);
    setPreference(value);
  }

  return (
    <div className="theme-toggle" role="group" aria-label={t("theme.label")}>
      <span className="theme-toggle__label">{t("theme.label")}</span>
      <div className="theme-toggle__group">
        {options.map(({ value, labelKey, Icon }) => {
          const isActive = preference === value;
          const label = t(labelKey);
          return (
            <button
              key={value}
              type="button"
              className={isActive ? "theme-toggle__btn is-active" : "theme-toggle__btn"}
              aria-pressed={isActive}
              aria-label={label}
              onClick={() => choose(value)}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
