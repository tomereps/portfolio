import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../data/projects';
import './DeepDive.css';

export default function DeepDive() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !project.deepDive) {
    return (
      <div className="dd__missing shell">
        <p>No deep-dive for this project yet.</p>
        <Link to={project ? `/work/${project.slug}` : '/'}>← Back</Link>
      </div>
    );
  }

  const dd = project.deepDive;

  return (
    <article className="dd shell">
      <Link className="dd__back" to={`/work/${project.slug}`}>
        <span aria-hidden>←</span> Back to {project.name}
      </Link>

      <header className="dd__header">
        <div className="dd__eyebrow">PRODUCT DEEP-DIVE</div>
        <h1 className="dd__title">{project.name}</h1>
        {dd.tagline && <p className="dd__tagline">{dd.tagline}</p>}
      </header>

      {dd.prd && (
        <section className="dd__section">
          <h2 className="dd__section-title">Summarized PRD</h2>
          <div className="dd__prd">
            {dd.prd.map((b) => (
              <div className="dd__block" key={b.label}>
                <div className="dd__block-label">{b.label}</div>
                <div className="dd__block-content">
                  {b.body && <p className="dd__block-body">{b.body}</p>}
                  {b.items && (
                    <ul className="dd__list">
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {dd.competitors && (
        <section className="dd__section dd__split">
          <h2 className="dd__section-title">Market analysis</h2>
          <div className="dd__split-body">
            <ul className="dd__list dd__comps">
              {dd.competitors.map((c) => (
                <li key={c.name}>
                  <strong className="dd__comp-name">{c.name}</strong>: {c.note}
                </li>
              ))}
            </ul>
            {dd.positioning && <p className="dd__positioning">{dd.positioning}</p>}
          </div>
        </section>
      )}

      <div className="dd__foot">
        <Link className="dd__foot-link" to={`/work/${project.slug}`}>
          <span aria-hidden>←</span> Back to the {project.name} case study
        </Link>
      </div>
    </article>
  );
}
