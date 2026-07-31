import Reveal from './Reveal';
import './Skills.css';

const GROUPS = [
  ['Product', ['Product thinking', 'UX / UI design', 'Scoping & tradeoffs']],
  ['Build', ['AI / LLM integration', 'Ships end-to-end']],
  ['Craft', ['Color grading', 'Visual systems', 'Storytelling']],
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__inner shell">
        <h2 className="skills__title">What I bring</h2>

        <dl className="skills__list">
          {GROUPS.map(([group, items], i) => (
            <Reveal key={group} className="skills__row" delay={i * 80}>
              <dt className="skills__group">{group}</dt>
              <dd className="skills__items">
                {items.map((s) => (
                  <span className="skills__item" key={s}>
                    {s}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
