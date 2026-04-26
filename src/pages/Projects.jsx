import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";
import { PageHero, SectionIntro } from "../components/PageSections.jsx";
import { projects } from "../data/content.js";

const filters = ["All", ...Array.from(new Set(projects.map((project) => project.type)))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewer, setViewer] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!viewer) {
      return;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setViewer(null);
      }
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
      if (!current) {
        return current;
      }

      const nextIndex =
        (current.imageIndex + direction + current.project.images.length) % current.project.images.length;

      return { ...current, imageIndex: nextIndex };
    });
  }

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Projects"
        title="Homes, housing, and road works delivered."
        body="Browse selected project records from METZ Engineering's residential, housing, and civil works portfolio."
        image="/images/Projects/p2/pr1.png"
      />

      <section className="content-band">
        <SectionIntro
          eyebrow="Portfolio"
          title="Filter by project type"
          body={`${filteredProjects.length} project${filteredProjects.length === 1 ? "" : "s"} shown`}
        />

        <div className="filter-row" role="list" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? "filter-button is-active" : "filter-button"}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <article className="portfolio-card" key={project.title}>
              <div className="portfolio-card__media">
                <img src={project.images[0]} alt="" loading="lazy" decoding="async" />
                <span>{project.type}</span>
              </div>
              <div className="portfolio-card__body">
                <h3>{project.title}</h3>
                <p>
                  <MapPin size={16} aria-hidden="true" />
                  {project.location}
                </p>
                {project.value && <strong>{project.value}</strong>}
                <div className="thumbnail-strip" aria-label={`${project.title} image preview`}>
                  {project.images.slice(0, 4).map((image, index) => (
                    <button key={image} type="button" onClick={() => openViewer(project, index)}>
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
                <button className="text-action" type="button" onClick={() => openViewer(project)}>
                  <Images size={17} aria-hidden="true" />
                  View photos
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {viewer && (
        <div className="photo-viewer" role="dialog" aria-modal="true" aria-label={`${viewer.project.title} photos`}>
          <button className="viewer-backdrop" type="button" aria-label="Close photo viewer" onClick={() => setViewer(null)} />
          <div className="viewer-panel">
            <div className="viewer-toolbar">
              <div>
                <span>{viewer.project.type}</span>
                <h2>{viewer.project.title}</h2>
                <p>{viewer.project.location}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Close photo viewer" onClick={() => setViewer(null)}>
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="viewer-stage">
              <button className="icon-button viewer-nav" type="button" aria-label="Previous photo" onClick={() => stepImage(-1)}>
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <img src={viewer.project.images[viewer.imageIndex]} alt="" />
              <button className="icon-button viewer-nav" type="button" aria-label="Next photo" onClick={() => stepImage(1)}>
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="viewer-thumbs">
              {viewer.project.images.map((image, index) => (
                <button
                  className={viewer.imageIndex === index ? "is-active" : ""}
                  key={image}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  onClick={() => setViewer((current) => ({ ...current, imageIndex: index }))}
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
