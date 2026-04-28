import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { useI18n } from "./i18n.jsx";
import { company } from "./data/content.js";
import { telHref } from "./utils/format.js";

const legacyRoutes = {
  "/home.html": "/",
  "/about.html": "/about",
  "/services.html": "/services",
  "/projects.html": "/projects",
  "/contact.html": "/contact",
};

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/projects", key: "nav.projects" },
  { to: "/contact", key: "nav.contact" },
];

function usePageEffects() {
  const { pathname } = useLocation();
  const { t, locale } = useI18n();

  useEffect(() => {
    const canonicalPath = legacyRoutes[pathname] ?? pathname;
    const page = navItems.find((item) => item.to === canonicalPath);

    document.title = page ? `${t(page.key)} | METZ Engineering` : "METZ Engineering";
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
  }, [pathname, locale, t]);
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

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
        <a href={telHref(company.phonePrimary)}>
          <Phone size={16} aria-hidden="true" />
          {company.phonePrimary}
        </a>
      </div>

      <div className="navbar">
        <NavLink className="brand" to="/" aria-label={t("nav.aria.brandHome")}>
          <img src="/images/logo.png" alt="METZ Engineering logo" />
          <span>
            <strong>METZ</strong>
            <small>Engineering Co. Limited</small>
          </span>
        </NavLink>

        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label={isOpen ? t("nav.aria.close") : t("nav.aria.open")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={isOpen ? "primary-nav is-open" : "primary-nav"} aria-label={t("nav.aria.main")}>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{t(item.key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink className="nav-cta" to="/contact">
          {t("nav.cta")}
          <ArrowUpRight size={17} aria-hidden="true" />
        </NavLink>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <img src="/images/logo.png" alt="" />
          <h2>METZ Engineering Co. Limited</h2>
          <p>{t(company.tagline)}</p>
        </div>

        <address>
          <strong>{t("footer.visit")}</strong>
          <span>{company.postal}</span>
          <span>{company.address}</span>
        </address>

        <div className="footer-contact">
          <strong>{t("footer.contact")}</strong>
          <a href={telHref(company.phonePrimary)}>
            <Phone size={16} aria-hidden="true" />
            {company.phonePrimary}
          </a>
          <a href={telHref(company.phoneSecondary)}>
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
        <div className="footer-base__inner">
          <p>{t("footer.copy", { year: new Date().getFullYear() })}</p>
          <div className="footer-controls">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

function LegacyRedirect({ to }) {
  return <Navigate to={to} replace />;
}

function SkipLink() {
  const { t } = useI18n();
  return (
    <a className="skip-link" href="#main-content">
      {t("nav.skip")}
    </a>
  );
}

export default function App() {
  usePageEffects();

  return (
    <div className="app-shell">
      <SkipLink />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
