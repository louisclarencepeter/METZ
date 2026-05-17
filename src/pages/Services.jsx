import { ClipboardCheck, Construction, HardHat, Leaf, Ruler, ShieldCheck, Wrench } from "lucide-react";
import { Callout, PageHero, SectionIntro } from "../components/PageSections.jsx";
import {
  deliveryMethods,
  partnershipPhases,
  safetyProgram,
  sectorExperience,
  services,
  strategicObjectives,
} from "../data/content.js";
import { useI18n } from "../i18n.jsx";

export default function Services() {
  const { t } = useI18n();
  return (
    <main id="main-content">
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        body={t("services.body")}
        image="/images/Projects/p3/pr2.webp"
      />

      <section className="content-band">
        <SectionIntro
          eyebrow={t("services.what")}
          title={t("services.whatTitle")}
          body={t("services.whatBody")}
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = [Construction, Ruler, ClipboardCheck, HardHat][index];

            return (
              <article className="service-card" key={t(service.title)}>
                <Icon size={28} aria-hidden="true" />
                <h3>{t(service.title)}</h3>
                <p>{t(service.body)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("services.sector")}
          title={t("services.sectorTitle")}
          body={t("services.sectorBody")}
        />
        <div className="sector-grid">
          {sectorExperience.map((sector) => (
            <article className="sector-card" key={t(sector.title)}>
              <Wrench size={22} aria-hidden="true" />
              <h3>{t(sector.title)}</h3>
              <p>{t(sector.body)}</p>
              <ul>
                {sector.capabilities.map((capability) => {
                  const text = t(capability);
                  return <li key={text}>{text}</li>;
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("services.process")}
          title={t("services.processTitle")}
          body={t("services.processBody")}
        />
        <ol className="phase-list">
          {partnershipPhases.map((phase) => (
            <li key={phase.abbr}>
              <span aria-hidden="true">{phase.abbr}</span>
              <div>
                <h3>{t(phase.title)}</h3>
                <p>{t(phase.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-band methods-band">
        <div>
          <p className="eyebrow">{t("services.delivery")}</p>
          <h2>{t("services.deliveryTitle")}</h2>
        </div>
        <div className="method-list">
          {deliveryMethods.map((method) => (
            <article key={method.abbr}>
              <span>{method.abbr}</span>
              <h3>{t(method.title)}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band safety-band">
        <div>
          <p className="eyebrow">{t("services.safety")}</p>
          <h2>{t("services.safetyTitle")}</h2>
          <p>{t("services.safetyBody")}</p>
        </div>
        <ul className="check-list">
          {safetyProgram.map((item) => {
            const text = t(item);
            return (
              <li key={text}>
                <ShieldCheck size={19} aria-hidden="true" />
                {text}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="content-band objectives-grid">
        <article>
          <Leaf size={30} aria-hidden="true" />
          <p className="eyebrow">{t("services.social")}</p>
          <h2>{t("services.socialTitle")}</h2>
          <p>{t("services.socialBody")}</p>
        </article>
        <article>
          <ClipboardCheck size={30} aria-hidden="true" />
          <p className="eyebrow">{t("services.objectives")}</p>
          <h2>{t("services.objectivesTitle")}</h2>
          <ul>
            {strategicObjectives.map((objective) => {
              const text = t(objective);
              return <li key={text}>{text}</li>;
            })}
          </ul>
        </article>
      </section>

      <Callout />
    </main>
  );
}
