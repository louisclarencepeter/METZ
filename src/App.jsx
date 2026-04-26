import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import { company } from "./data/content.js";

const legacyRoutes = {
  "/home.html": "/",
  "/about.html": "/about",
  "/services.html": "/services",
  "/projects.html": "/projects",
  "/contact.html": "/contact",
};

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

function usePageEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalPath = legacyRoutes[pathname] ?? pathname;
    const page = navItems.find((item) => item.to === canonicalPath);

    document.title = page ? `${page.label} | METZ Engineering` : "METZ Engineering";
    window.scrollTo({ top: 0, left: 0 });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = document.querySelectorAll(
      ".page-hero, .stats-band, .content-band, .callout, .service-card, .project-card, .portfolio-card, .person-card, .detail-panel, .contact-panel, .contact-form",
    );

    revealTargets.forEach((target) => {
      target.classList.add("reveal-target");

      const rect = target.getBoundingClientRect();
      const startsInView = rect.top < window.innerHeight * 0.9;

      if (reduceMotion || startsInView) {
        target.classList.add("is-visible");
      }
    });

    if (reduceMotion) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealTargets.forEach((target) => {
      if (!target.classList.contains("is-visible")) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="topbar">
        <span>
          <MapPin size={16} aria-hidden="true" />
          {company.address}
        </span>
        <a href={`tel:${company.phonePrimary}`}>
          <Phone size={16} aria-hidden="true" />
          {company.phonePrimary}
        </a>
      </div>

      <div className="navbar">
        <NavLink className="brand" to="/" aria-label="METZ Engineering home">
          <img src="/images/logo.png" alt="METZ Engineering logo" />
          <span>
            <strong>METZ</strong>
            <small>Engineering Co. Limited</small>
          </span>
        </NavLink>

        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={isOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink className="nav-cta" to="/contact">
          Start a project
          <ArrowUpRight size={17} aria-hidden="true" />
        </NavLink>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <img src="/images/logo.png" alt="" />
          <h2>METZ Engineering Co. Limited</h2>
          <p>{company.tagline}</p>
        </div>

        <address>
          <strong>Visit us</strong>
          <span>{company.postal}</span>
          <span>{company.address}</span>
        </address>

        <div className="footer-contact">
          <strong>Contact</strong>
          <a href={`tel:${company.phonePrimary}`}>
            <Phone size={16} aria-hidden="true" />
            {company.phonePrimary}
          </a>
          <a href={`tel:${company.phoneSecondary}`}>
            <Phone size={16} aria-hidden="true" />
            {company.phoneSecondary}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={16} aria-hidden="true" />
            {company.email}
          </a>
        </div>
      </div>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} METZ Engineering Co. Limited. Built for dependable project delivery.</p>
      </div>
    </footer>
  );
}

function LegacyRedirect({ to }) {
  return <Navigate to={to} replace />;
}

export default function App() {
  usePageEffects();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        {Object.entries(legacyRoutes).map(([from, to]) => (
          <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
