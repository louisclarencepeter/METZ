import { BadgeCheck, UsersRound } from "lucide-react";
import { PageHero, SectionIntro } from "../components/PageSections.jsx";
import {
  companyParticulars,
  directors,
  legalStatus,
  managementTeam,
} from "../data/content.js";
import { useI18n } from "../i18n.jsx";

export default function About() {
  const { t } = useI18n();
  return (
    <main id="main-content">
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        body={t("about.body")}
        image="/images/Projects/p1/pr2.png"
      />

      <section className="content-band details-grid">
        <article className="detail-panel">
          <SectionIntro eyebrow={t("about.legalProfile")} title={t("about.particulars")} />
          <dl className="definition-list">
            {companyParticulars.map(([label, value]) => {
              const labelText = t(label);
              return (
                <div key={labelText}>
                  <dt>{labelText}</dt>
                  <dd>{t(value)}</dd>
                </div>
              );
            })}
          </dl>
        </article>

        <article className="detail-panel">
          <SectionIntro eyebrow={t("about.compliance")} title={t("about.regStatus")} />
          <ul className="check-list">
            {legalStatus.map((status) => {
              const text = t(status);
              return (
                <li key={text}>
                  <BadgeCheck size={18} aria-hidden="true" />
                  {text}
                </li>
              );
            })}
          </ul>
        </article>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("about.leadership")}
          title={t("about.directors")}
          body={t("about.directorsBody")}
        />
        <div className="people-grid">
          {directors.map((director) => (
            <article className="person-card" key={director.name}>
              <img src={director.image} alt={t(director.alt)} loading="lazy" decoding="async" />
              <div>
                <span>{t(director.role)}</span>
                <h3>{director.name}</h3>
                <p>{t(director.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow={t("about.personnel")}
          title={t("about.management")}
          body={t("about.managementBody")}
        />
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th scope="col">{t("about.tableRole")}</th>
                <th scope="col">{t("about.tableName")}</th>
                <th scope="col">{t("about.tableQual")}</th>
                <th scope="col">{t("about.tableExp")}</th>
              </tr>
            </thead>
            <tbody>
              {managementTeam.map((member) => (
                <tr key={`${t(member[0])}-${member[1]}`}>
                  {member.map((cell, columnIndex) => (
                    <td key={columnIndex}>{t(cell)}</td>
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
          <h2>{t("about.associate")}</h2>
          <p>{t("about.associateBody")}</p>
        </div>
      </section>
    </main>
  );
}
