import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="hero-copy">
          <p className="eyebrow">{t("notfound.eyebrow")}</p>
          <h1>{t("notfound.title")}</h1>
          <p>{t("notfound.body")}</p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to="/">
              {t("notfound.home")}
              <ArrowRight size={18} aria-hidden="true" />
            </NavLink>
            <NavLink className="button button-light" to="/contact">
              {t("notfound.contact")}
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}
