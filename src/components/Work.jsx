import ProjectCard from './ProjectCard';
import { shipped } from '../data/projects';
import './Work.css';

export default function Work() {
  return (
    <section id="work" className="work shell">
      <div className="work__head">
        <h2 className="work__title">Shipped products</h2>
        <span className="work__count">two products · shipped end-to-end</span>
      </div>

      <div className="work__grid">
        {shipped.map((p, i) => (
          <ProjectCard key={p.slug} p={p} idx={i} />
        ))}
      </div>

      <div className="work__note">
        <div className="work__note-title">Always building.</div>
        <p>
          I learn by shipping, not by waiting for permission. If you're building
          something at the intersection of AI, creative tooling, and real
          workflows — that's exactly where I want to be.
        </p>
      </div>
    </section>
  );
}
