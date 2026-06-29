import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shipped, getProject, caseStudyOrder } from '../data/projects';
import FrameStrip from '../components/FrameStrip';
import './CaseStudy.css';

const STATUS_COLORS = {
  Live: { bg: '#f4f6f5', fg: 'var(--sub)', dot: '#27ae60' },
  'In progress': { bg: 'var(--accent-soft)', fg: 'var(--accent)', dot: 'var(--accent)' },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="case__missing shell">
        <p>That case study doesn't exist yet.</p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const st = STATUS_COLORS[project.status] || STATUS_COLORS.Live;
  const next = shipped.find((p) => p.slug !== project.slug);

  return (
    <article className="case shell">
      <Link className="case__back" to="/#work">
        <span aria-hidden>←</span> All work
      </Link>

      <header className="case__header">
        <div className="case__header-text">
          <div className="case__eyebrow">CASE STUDY</div>
          <h1 className="case__title">{project.name}</h1>
          <p className="case__intro">{project.caseStudy.intro}</p>

          <div className="case__meta">
            <span
              className="case__status"
              style={{ background: st.bg, color: st.fg }}
            >
              <span className="case__status-dot" style={{ background: st.dot }} />
              {project.status}
            </span>
            <FrameStrip count={6} active={2} />
          </div>
        </div>

        {project.image && (
          <img
            className="case__hero"
            src={project.image}
            alt={`${project.name} — product overview`}
          />
        )}
      </header>

      <div className="case__sections">
        {caseStudyOrder.map(({ key, label, num }) => (
          <section className="case__section" key={key}>
            <div>
              <div className="case__section-num">{num}</div>
              <div className="case__section-label">{label}</div>
            </div>
            <div className="case__section-body">
              {project.caseStudy.sections[key]}
            </div>
          </section>
        ))}
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
    </article>
  );
}
