import { BadgeCheck, Building2, UsersRound, Calendar, FileText, MapPin, Briefcase, Hash, CreditCard, ShieldPlus, Quote } from "lucide-react";
import { PageHero, SectionIntro } from "../components/PageSections.jsx";
import {
  companyParticulars,
  corporateClients,
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

      <section className="content-band particulars-band">
        <div className="particulars-header">
          <h2>COMPANY PARTICULARS</h2>
        </div>
        <div className="particulars-grid">
          {companyParticulars.map(([label, value], index) => {
            const labelText = t(label);
            const Icon = [Building2, Calendar, FileText, MapPin, Briefcase, Hash, CreditCard][index] || Building2;
            return (
              <article className="particular-card" key={labelText}>
                <Icon size={24} aria-hidden="true" />
                <p>{labelText}</p>
                <strong>{t(value)}</strong>
              </article>
            );
          })}
          <article className="particular-card">
            <ShieldPlus size={24} aria-hidden="true" />
            <p>Workers Compensation Fund Registration</p>
            <strong>(No. 036995)</strong>
          </article>
        </div>
      </section>

      <section className="content-band board-band">
        <div className="board-header">
          <h2>BOARD OF DIRECTORS</h2>
        </div>
        <div className="board-grid">
          {directors.map((director, i) => (
            <article className="board-card" key={director.name}>
              <img src={director.image} alt={t(director.alt)} loading="lazy" decoding="async" />
              <div className="board-card__quote">
                <Quote size={32} aria-hidden="true" fill="currentColor" stroke="none" />
                <blockquote>{t(director.bio)}</blockquote>
                <div className="board-card__person">
                  <strong>{director.name}</strong>
                  <span>{t(director.role)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band management-band">
        <div className="management-header">
          <h2>EXECUTIVE MANAGEMENT TEAM</h2>
        </div>
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th scope="col">ROLE & QUALIFICATION</th>
                <th scope="col"></th>
                <th scope="col" className="text-right">EXPERIENCE</th>
              </tr>
            </thead>
            <tbody>
              {managementTeam.map((member) => (
                <tr key={`${t(member[0])}-${t(member[1])}`}>
                  <td><strong>{t(member[0])}</strong></td>
                  <td>{t(member[1])}</td>
                  <td className="text-right"><strong>{t(member[2])}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-band clients-band">
        <div className="clients-header">
          <h2>TRUSTED BY INDUSTRIAL AND FUEL-SECTOR CLIENTS</h2>
          <p>A grayscale client that becomes color on hover</p>
        </div>
        <div className="client-grid">
          {corporateClients.map((client) => (
            <article className="client-logo" key={client.name}>
               <Building2 size={32} aria-hidden="true" />
               <p>{client.name}</p>
               <small>{t(client.sector)}</small>
            </article>
          ))}
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
