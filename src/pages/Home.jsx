import { ArrowRight, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Callout, SectionIntro } from "../components/PageSections.jsx";
import { company, featuredProjects, services, stats } from "../data/content.js";

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__image" aria-hidden="true" />
        <div className="home-hero__content">
          <p className="eyebrow">Building and civil contractors</p>
          <h1>METZ Engineering Co. Limited</h1>
          <p>{company.tagline}</p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to="/projects">
              View projects
              <ArrowRight size={18} aria-hidden="true" />
            </NavLink>
            <NavLink className="button button-light" to="/contact">
              Request a quote
            </NavLink>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Company highlights">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="content-band two-column">
        <div>
          <p className="eyebrow">General information</p>
          <h2>Practical construction delivery with local accountability.</h2>
        </div>
        <div className="text-stack">
          <p>
            METZ Engineering Co. Limited was established in 2017 and registered in 2019 as a privately
            owned Tanzanian company operating across building and civil works.
          </p>
          <p>
            The company focuses on quality workmanship, safer working environments, responsible team
            induction, and applying practical technology where it improves delivery.
          </p>
          <p>
            METZ is registered by the Contractors Registration Board of Tanzania as a Building Works and
            Civil Works Contractor Class VI.
          </p>
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow="Capabilities"
          title="Built for the full construction lifecycle"
          body="From early planning to site execution and handover, the company supports clients with coordinated construction services."
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = [Building2, ShieldCheck, CheckCircle2, ArrowRight][index];

            return (
              <article className="service-card" key={service.title}>
                <Icon size={26} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <SectionIntro
          eyebrow="Selected work"
          title="Recent work across housing, roads, and residential construction"
        />
        <div className="project-card-grid">
          {featuredProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <img src={project.image} alt="" loading="lazy" decoding="async" />
              <div>
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.location}</p>
                <p>{project.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band vision-grid">
        <article>
          <p className="eyebrow">Vision</p>
          <h2>World-class infrastructure and real estate delivery.</h2>
          <p>
            METZ aims to grow through innovative design, quality materials, timely completion, and high
            standards of workmanship that build long-term customer confidence.
          </p>
        </article>
        <article>
          <p className="eyebrow">Mission</p>
          <h2>Value-added construction services from start to finish.</h2>
          <p>
            The company builds lasting client relationships by creating successful partnerships through the
            construction process and exceeding expectations through reliable performance.
          </p>
        </article>
      </section>

      <Callout />
    </main>
  );
}
