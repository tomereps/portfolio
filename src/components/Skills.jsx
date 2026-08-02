import Reveal from './Reveal';
import './Skills.css';

function ProductIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 21 7 21 17 12 22 3 17 3 7Z" />
      <path d="M3 7 12 12 21 7" />
      <path d="M12 12 12 22" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 21 7 12 12 3 7Z" />
      <path d="M3 12 12 17 21 12" />
      <path d="M3 17 12 22 21 17" />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4 20 9 10 19 5 20 6 15Z" />
      <path d="M14.5 6.5 17.5 9.5" />
    </svg>
  );
}

const GROUPS = [
  { name: 'Product', Icon: ProductIcon, items: ['Product thinking', 'UX / UI design', 'Scoping & tradeoffs'] },
  { name: 'Build', Icon: BuildIcon, items: ['AI / LLM integration', 'Ships end-to-end'] },
  { name: 'Craft', Icon: CraftIcon, items: ['Color grading', 'Visual systems', 'Storytelling'] },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__inner shell">
        <h2 className="skills__title">What I bring</h2>

        <div className="skills__cols">
          {GROUPS.map(({ name, Icon, items }, i) => (
            <Reveal key={name} className="skills__col" delay={i * 80}>
              <div className="skills__col-head">
                <span className="skills__col-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="skills__col-name">{name}</h3>
              </div>
              <div className="skills__col-items">
                {items.map((s) => (
                  <span className="skills__chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
