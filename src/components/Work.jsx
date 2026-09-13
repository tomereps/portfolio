import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import ReelTeaser from './ReelTeaser';
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
          <Reveal key={p.slug} delay={i * 90}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>

      {/* second band under the same #work anchor: work is not only products */}
      <Reveal>
        <ReelTeaser />
      </Reveal>
    </section>
  );
}
