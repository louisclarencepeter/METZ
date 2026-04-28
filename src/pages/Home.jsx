import { ArrowRight, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Callout, SectionIntro } from "../components/PageSections.jsx";
import { company, featuredProjects, services, stats } from "../data/content.js";
import { useI18n } from "../i18n.jsx";

export default function Home() {
  const { t } = useI18n();

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__image" aria-hidden="true" />
        <div className="home-hero__content">
          <p className="eyebrow">{t("home.eyebrow")}</p>
          <h1>METZ Engineering Co. Limited</h1>
          <p>{t(company.tagline)}</p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to="/projects">
              {t("home.cta.view")}
              <ArrowRight size={18} aria-hidden="true" />
            </NavLink>
            <NavLink className="button button-light" to="/contact">
              {t("home.cta.quote")}
            </NavLink>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label={t("home.statsAria")}>
        {stats.map((stat) => (
          <div key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{t(stat.label)}</span>
          </div>
        ))}
      </section>

      <section className="content-band two-column">
        <div>
          <p className="eyebrow">{t("home.section.general")}</p>
          <h2>{t("home.section.generalTitle")}</h2>
        </div>
        <div className="text-stack">
          <p>{t("home.section.general.p1")}</p>
          <p>{t("home.section.general.p2")}</p>
          <p>{t("home.section.general.p3")}</p>
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("home.section.capabilities")}
          title={t("home.section.capabilitiesTitle")}
          body={t("home.section.capabilitiesBody")}
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = [Building2, ShieldCheck, CheckCircle2, ArrowRight][index];

            return (
              <article className="service-card" key={t(service.title)}>
                <Icon size={26} aria-hidden="true" />
                <h3>{t(service.title)}</h3>
                <p>{t(service.body)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("home.section.selected")}
          title={t("home.section.selectedTitle")}
        />
        <div className="project-card-grid">
          {featuredProjects.map((project) => (
            <article className="project-card" key={t(project.title)}>
              <img src={project.image} alt={t(project.alt)} loading="lazy" decoding="async" />
              <div>
                <span>{t(project.type)}</span>
                <h3>{t(project.title)}</h3>
                <p>{project.location}</p>
                <p>{t(project.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band vision-grid">
        <article>
          <p className="eyebrow">{t("home.vision")}</p>
          <h2>{t("home.visionTitle")}</h2>
          <p>{t("home.visionBody")}</p>
        </article>
        <article>
          <p className="eyebrow">{t("home.mission")}</p>
          <h2>{t("home.missionTitle")}</h2>
          <p>{t("home.missionBody")}</p>
        </article>
      </section>

      <Callout />
    </main>
  );
}
