import { BadgeCheck, UsersRound } from "lucide-react";
import { PageHero, SectionIntro } from "../components/PageSections.jsx";
import {
  companyParticulars,
  directors,
  legalStatus,
  managementTeam,
} from "../data/content.js";

export default function About() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About METZ"
        title="A registered Tanzanian contractor with a hands-on leadership team."
        body="METZ Engineering Co. Limited combines construction experience, technical oversight, and practical site management for building and civil works."
        image="/images/Projects/p1/pr2.png"
      />

      <section className="content-band details-grid">
        <article className="detail-panel">
          <SectionIntro eyebrow="Legal profile" title="Company particulars" />
          <dl className="definition-list">
            {companyParticulars.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="detail-panel">
          <SectionIntro eyebrow="Compliance" title="Registration and status" />
          <ul className="check-list">
            {legalStatus.map((status) => (
              <li key={status}>
                <BadgeCheck size={18} aria-hidden="true" />
                {status}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow="Leadership"
          title="Board of directors"
          body="The company is led by construction and quantity surveying professionals with deep operational experience."
        />
        <div className="people-grid">
          {directors.map((director) => (
            <article className="person-card" key={director.name}>
              <img src={director.image} alt="" loading="lazy" decoding="async" />
              <div>
                <span>{director.role}</span>
                <h3>{director.name}</h3>
                <p>{director.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow="Personnel"
          title="Executive management team"
          body="A cross-functional team supports finance, marketing, legal, engineering, quantity surveying, records, and safety."
        />
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Name</th>
                <th scope="col">Qualification</th>
                <th scope="col">Experience</th>
              </tr>
            </thead>
            <tbody>
              {managementTeam.map((member) => (
                <tr key={`${member[0]}-${member[1]}`}>
                  {member.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-band associate-band">
        <UsersRound size={34} aria-hidden="true" />
        <div>
          <h2>Associate staff network</h2>
          <p>
            METZ maintains relationships with qualified individual personnel who can be engaged on a
            fee-for-service basis for specialist assignments.
          </p>
        </div>
      </section>
    </main>
  );
}
