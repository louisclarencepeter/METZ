import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

export function PageHero({ eyebrow, title, body, image, actions }) {
  return (
    <section className="page-hero">
      <div className="hero-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p>{body}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {image && (
        <div className="hero-media">
          <img src={image} alt="" decoding="async" />
        </div>
      )}
    </section>
  );
}

export function SectionIntro({ eyebrow, title, body }) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export function Callout() {
  const { t } = useI18n();
  return (
    <section className="callout">
      <div>
        <p className="eyebrow">{t("callout.eyebrow")}</p>
        <h2>{t("callout.title")}</h2>
        <p>{t("callout.body")}</p>
      </div>
      <NavLink className="button button-dark" to="/contact">
        {t("callout.cta")}
        <ArrowUpRight size={18} aria-hidden="true" />
      </NavLink>
    </section>
  );
}
