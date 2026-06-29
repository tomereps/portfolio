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
    </section>
  );
}
