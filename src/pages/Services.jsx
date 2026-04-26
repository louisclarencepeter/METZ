import { ClipboardCheck, Construction, HardHat, Leaf, Ruler, ShieldCheck } from "lucide-react";
import { Callout, PageHero, SectionIntro } from "../components/PageSections.jsx";
import { deliveryMethods, services, strategicObjectives } from "../data/content.js";

const safetyPoints = [
  "Site induction before work begins",
  "First-aid-trained site agents",
  "Risk assessment and hazard awareness",
  "Injury prevention training",
];

export default function Services() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Services"
        title="Construction services from planning through handover."
        body="METZ supports clients with general contracting, construction management, design-build, pre-construction planning, civil works, finishing, and maintenance."
        image="/images/Projects/p3/pr2.png"
      />

      <section className="content-band">
        <SectionIntro
          eyebrow="What we do"
          title="A practical service mix for real projects"
          body="The work is organized around the project lifecycle: define the scope, plan the build, execute on site, monitor progress, and close the project properly."
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = [Construction, Ruler, ClipboardCheck, HardHat][index];

            return (
              <article className="service-card" key={service.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band methods-band">
        <div>
          <p className="eyebrow">Delivery methods</p>
          <h2>Flexible enough for different client procurement models.</h2>
        </div>
        <div className="method-list">
          {deliveryMethods.map((method) => (
            <article key={method}>
              <span>{method.slice(0, 2).toUpperCase()}</span>
              <h3>{method}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band safety-band">
        <div>
          <p className="eyebrow">Health and safety</p>
          <h2>Safer work is treated as part of delivery, not an afterthought.</h2>
          <p>
            Every employee working on site is insured, inducted, and trained on practical safety methods
            before joining active work areas.
          </p>
        </div>
        <ul className="check-list">
          {safetyPoints.map((point) => (
            <li key={point}>
              <ShieldCheck size={19} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="content-band objectives-grid">
        <article>
          <Leaf size={30} aria-hidden="true" />
          <p className="eyebrow">Social responsibility</p>
          <h2>Community is a key stakeholder.</h2>
          <p>
            METZ regards the community as part of the project environment and keeps social responsibility
            visible in its public activities.
          </p>
        </article>
        <article>
          <ClipboardCheck size={30} aria-hidden="true" />
          <p className="eyebrow">Strategic objectives</p>
          <h2>Focused growth through 2030.</h2>
          <ul>
            {strategicObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </article>
      </section>

      <Callout />
    </main>
  );
}
