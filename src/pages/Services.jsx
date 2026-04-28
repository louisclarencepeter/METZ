import { ClipboardCheck, Construction, HardHat, Leaf, Ruler, ShieldCheck } from "lucide-react";
import { Callout, PageHero, SectionIntro } from "../components/PageSections.jsx";
import { deliveryMethods, services, strategicObjectives } from "../data/content.js";
import { useI18n } from "../i18n.jsx";

const safetyKeys = [
  "services.safety.induction",
  "services.safety.firstAid",
  "services.safety.risk",
  "services.safety.injury",
];

export default function Services() {
  const { t } = useI18n();
  return (
    <main id="main-content">
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        body={t("services.body")}
        image="/images/Projects/p3/pr2.png"
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
          {safetyKeys.map((key) => (
            <li key={key}>
              <ShieldCheck size={19} aria-hidden="true" />
              {t(key)}
            </li>
          ))}
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
