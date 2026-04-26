import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

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
  return (
    <section className="callout">
      <div>
        <p className="eyebrow">Ready to build</p>
        <h2>Bring METZ into the project early.</h2>
        <p>
          We can help shape scope, budget, safety planning, site execution, and handover from the
          first practical conversation.
        </p>
      </div>
      <NavLink className="button button-dark" to="/contact">
        Talk to us
        <ArrowUpRight size={18} aria-hidden="true" />
      </NavLink>
    </section>
  );
}
