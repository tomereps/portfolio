import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shipped, getProject } from '../data/projects';
import './CaseStudy.css';

/* renders whichever content shape a section carries */
function SectionContent({ section }) {
  if (section.bullets) {
    return (
      <ul className="case__bullets">
        {section.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    );
  }
  if (section.features) {
    return (
      <div className="case__features">
        {section.features.map((f) => (
          <div className="case__feature" key={f.title}>
            <div className="case__feature-title">{f.title}</div>
            <div className="case__feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    );
  }
  if (section.tech) {
    return (
      <ul className="case__bullets case__bullets--cols">
        {section.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
  }
  if (section.columns) {
    return (
      <div className="case__cols">
        {section.columns.map((col) => (
          <div className="case__col" key={col.title}>
            <div className="case__col-title">{col.title}</div>
            <ul className="case__bullets">
              {col.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  if (!project) {
    return (
      <div className="case__missing shell">
        <p>That case study doesn't exist yet.</p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const cs = project.caseStudy;
  const next = shipped.find((p) => p.slug !== project.slug);
  const hasBody = (s) => s.bullets || s.features || s.columns || s.tech;

  return (
    <article className="case shell">
      <Link className="case__back" to="/#work">
        <span aria-hidden>←</span> All work
      </Link>

      <div className="case__top">
      <div
        className="case__hero"
        style={project.heroBg ? { background: project.heroBg } : undefined}
      >
        <div className="case__hero-text">
          <div className="case__eyebrow">
            <span className="case__badge-dot" />
            {project.status}
          </div>
          <h1 className="case__title">{project.name}</h1>
          <p className="case__intro">{cs.intro}</p>
          {(project.website || project.demo) && (
            <div className="case__actions">
              {project.website && (
                <a
                  className="case__btn case__btn--primary"
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  style={project.accent ? { background: project.accent } : undefined}
                >
                  Visit {project.name} <span aria-hidden>↗</span>
                </a>
              )}
              {project.demo && (
                <a
                  className="case__btn case__btn--ghost"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View demo
                </a>
              )}
            </div>
          )}
        </div>
        {project.image && (
          <img
            className="case__hero-img"
            src={project.image}
            alt={`${project.name} product`}
          />
        )}
      </div>

      {cs.meta && (
        <div className="case__meta">
          {cs.meta.map((m) => (
            <div className="case__meta-item" key={m.label}>
              <div className="case__meta-label">{m.label}</div>
              <div className="case__meta-value">{m.value}</div>
            </div>
          ))}
        </div>
      )}
      </div>

      <h2 className="case__deep-title">Case study</h2>
      {cs.overview && <p className="case__overview">{cs.overview}</p>}
      {project.deepDive && (
        <Link className="case__deeper" to={`/work/${project.slug}/deep`}>
          Go deeper: PRD, competitors &amp; product thinking{' '}
          <span aria-hidden>→</span>
        </Link>
      )}

      <div className="case__sections">
        {cs.sections.map((s) => (
          <section className="case__section" key={s.num}>
            <div className="case__section-head">
              <h2 className="case__section-label">{s.label}</h2>
              <p className="case__section-lead">{s.lead}</p>
            </div>
            {hasBody(s) && (
              <div className="case__section-body">
                <SectionContent section={s} />
              </div>
            )}
          </section>
        ))}
      </div>

      {project.screenshots && (
        <section className="case__shots-section">
          <h2 className="case__deep-title">Inside the app</h2>
          <div
            className={`case__shots${
              project.shotLayout === 'wide' ? ' case__shots--wide' : ''
            }`}
          >
            {project.screenshots.map((s, i) => (
              <figure className="case__shot" key={s.caption || i}>
                {s.src ? (
                  <button
                    type="button"
                    className="case__shot-btn"
                    onClick={() => setLightbox(i)}
                    aria-label={`View ${s.caption || 'screenshot'} full screen`}
                  >
                    <img
                      className="case__shot-img"
                      src={s.src}
                      alt={s.caption || `${project.name} screenshot`}
                    />
                    <span className="case__shot-expand" aria-hidden>
                      ⤢
                    </span>
                  </button>
                ) : (
                  <div className="case__shot-ph">Screenshot</div>
                )}
                {s.caption && (
                  <figcaption className="case__shot-cap">{s.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.deepDive && (
        <Link className="case__deeper case__deeper--foot" to={`/work/${project.slug}/deep`}>
          Go deeper: PRD, competitors &amp; product thinking{' '}
          <span aria-hidden>→</span>
        </Link>
      )}

      <div className="case__cta">
        <div>
          <div className="case__cta-title">Have an idea to build?</div>
          <p className="case__cta-text">
            I'm always open to new projects and collaborations.
          </p>
        </div>
        <Link className="case__cta-btn" to="/#contact">
          Let's talk <span aria-hidden>↗</span>
        </Link>
      </div>

      {next && (
        <div className="case__next">
          <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
            NEXT
          </span>
          <Link className="case__next-link" to={`/work/${next.slug}`}>
            {next.name} <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      {lightbox !== null && project.screenshots[lightbox]?.src && (
        <div
          className="case__lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            className="case__lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close full screen"
          >
            ×
          </button>
          <figure className="case__lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              className="case__lightbox-img"
              src={project.screenshots[lightbox].src}
              alt={project.screenshots[lightbox].caption || `${project.name} screenshot`}
            />
            {project.screenshots[lightbox].caption && (
              <figcaption className="case__lightbox-cap">
                {project.screenshots[lightbox].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </article>
  );
}
