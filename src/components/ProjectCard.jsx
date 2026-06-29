import { useState } from 'react';
import { Link } from 'react-router-dom';
import FrameStrip from './FrameStrip';
import './ProjectCard.css';

function statusClass(status) {
  if (status === 'Live') return 'status--live';
  if (status === 'In progress') return 'status--progress';
  return 'status--exploration';
}

export default function ProjectCard({ p, idx }) {
  const [hover, setHover] = useState(false);
  const hasCaseStudy = Boolean(p.caseStudy);

  return (
    <article
      className={`card ${statusClass(p.status)}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* a real screenshot when present, otherwise a neutral placeholder */}
      <div className="card__band">
        {p.image ? (
          <img className="card__img" src={p.image} alt={`${p.name} preview`} />
        ) : (
          <>
            <div className="card__frame-text">{p.frame}</div>
            <div className="card__band-footer">
              <FrameStrip count={6} active={hover ? idx % 6 : -1} tiny />
              <span className="card__tag">{p.tag}</span>
            </div>
          </>
        )}
      </div>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__name">{p.name}</h3>
          <span className="card__status">
            <span className="card__status-dot" />
            {p.status}
          </span>
        </div>

        <p className="card__desc">{p.desc}</p>
        {p.outcome && <p className="card__outcome">{p.outcome}</p>}

        {hasCaseStudy && (
          <Link className="card__link" to={`/work/${p.slug}`}>
            Read the case study
            <span className="card__link-arrow" aria-hidden>
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
