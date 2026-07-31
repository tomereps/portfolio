import { Link } from 'react-router-dom';
import './ProjectCard.css';

function statusClass(status) {
  if (status === 'Live') return 'status--live';
  if (status === 'In progress') return 'status--progress';
  return 'status--exploration';
}

export default function ProjectCard({ p }) {
  const hasCaseStudy = Boolean(p.caseStudy);

  const inner = (
    <>
      {p.image && (
        <div className="card__band">
          <img
            className="card__img"
            src={p.image}
            alt={`${p.name} product screenshot`}
            width="1100"
            height="578"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

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
          <span className="card__link">
            Read the case study
            <span className="card__link-arrow" aria-hidden>
              &rarr;
            </span>
          </span>
        )}
      </div>
    </>
  );

  // whole card is the link when there's a case study
  if (hasCaseStudy) {
    return (
      <Link className={`card ${statusClass(p.status)}`} to={`/work/${p.slug}`}>
        {inner}
      </Link>
    );
  }

  return <article className={`card ${statusClass(p.status)}`}>{inner}</article>;
}
