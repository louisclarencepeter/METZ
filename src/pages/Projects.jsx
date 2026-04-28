import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";
import { PageHero, SectionIntro } from "../components/PageSections.jsx";
import { projects } from "../data/content.js";
import { useI18n } from "../i18n.jsx";

export default function Projects() {
  const { t, locale } = useI18n();
  const [activeFilterEn, setActiveFilterEn] = useState("All");
  const [viewer, setViewer] = useState(null);

  const filters = useMemo(() => {
    const seen = new Set();
    const list = [{ en: "All", sw: t("projects.filterAll") }];
    projects.forEach((project) => {
      if (!seen.has(project.type.en)) {
        seen.add(project.type.en);
        list.push(project.type);
      }
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const filteredProjects = useMemo(() => {
    if (activeFilterEn === "All") return projects;
    return projects.filter((project) => project.type.en === activeFilterEn);
  }, [activeFilterEn]);

  useEffect(() => {
    if (!viewer) return;

    function closeOnEscape(event) {
      if (event.key === "Escape") setViewer(null);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [viewer]);

  function openViewer(project, imageIndex = 0) {
    setViewer({ project, imageIndex });
  }

  function stepImage(direction) {
    setViewer((current) => {
      if (!current) return current;
      const nextIndex =
        (current.imageIndex + direction + current.project.images.length) %
        current.project.images.length;
      return { ...current, imageIndex: nextIndex };
    });
  }

  const count = filteredProjects.length;
  const countLabel = t(
    count === 1 ? "projects.shown.one" : "projects.shown.many",
    { count },
  );

  return (
    <main id="main-content">
      <PageHero
        eyebrow={t("projects.eyebrow")}
        title={t("projects.title")}
        body={t("projects.body")}
        image="/images/Projects/p2/pr1.png"
      />

      <section className="content-band">
        <SectionIntro
          eyebrow={t("projects.portfolio")}
          title={t("projects.filter")}
          body={countLabel}
        />

        <div className="filter-row" role="list" aria-label={t("projects.filterAria")}>
          {filters.map((filter) => (
            <button
              className={
                activeFilterEn === filter.en ? "filter-button is-active" : "filter-button"
              }
              key={filter.en}
              type="button"
              onClick={() => setActiveFilterEn(filter.en)}
            >
              {t(filter)}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <article className="portfolio-card" key={project.title.en}>
              <div className="portfolio-card__media">
                <img
                  src={project.images[0]}
                  alt={t(project.alt)}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t(project.type)}</span>
              </div>
              <div className="portfolio-card__body">
                <h3>{t(project.title)}</h3>
                <p>
                  <MapPin size={16} aria-hidden="true" />
                  {project.location}
                </p>
                {project.value && <strong>{project.value}</strong>}
                <div
                  className="thumbnail-strip"
                  aria-label={t("projects.thumbsAria", { title: t(project.title) })}
                >
                  {project.images.slice(0, 4).map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      aria-label={t("projects.openPhoto", {
                        title: t(project.title),
                        index: index + 1,
                      })}
                      onClick={() => openViewer(project, index)}
                    >
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
                <button
                  className="text-action"
                  type="button"
                  onClick={() => openViewer(project)}
                >
                  <Images size={17} aria-hidden="true" />
                  {t("projects.viewPhotos")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {viewer && (
        <div
          className="photo-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={t("projects.viewerAria", { title: t(viewer.project.title) })}
        >
          <button
            className="viewer-backdrop"
            type="button"
            aria-label={t("projects.close")}
            onClick={() => setViewer(null)}
          />
          <div className="viewer-panel">
            <div className="viewer-toolbar">
              <div>
                <span>{t(viewer.project.type)}</span>
                <h2>{t(viewer.project.title)}</h2>
                <p>{viewer.project.location}</p>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label={t("projects.close")}
                onClick={() => setViewer(null)}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="viewer-stage">
              <button
                className="icon-button viewer-nav"
                type="button"
                aria-label={t("projects.prev")}
                onClick={() => stepImage(-1)}
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <img
                src={viewer.project.images[viewer.imageIndex]}
                alt={`${t(viewer.project.alt)} — ${viewer.imageIndex + 1} / ${viewer.project.images.length}`}
              />
              <button
                className="icon-button viewer-nav"
                type="button"
                aria-label={t("projects.next")}
                onClick={() => stepImage(1)}
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="viewer-thumbs">
              {viewer.project.images.map((image, index) => (
                <button
                  className={viewer.imageIndex === index ? "is-active" : ""}
                  key={image}
                  type="button"
                  aria-label={t("projects.show", { index: index + 1 })}
                  onClick={() =>
                    setViewer((current) => ({ ...current, imageIndex: index }))
                  }
                >
                  <img src={image} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
