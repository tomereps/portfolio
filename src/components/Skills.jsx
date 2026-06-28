import './Skills.css';

const GROUPS = [
  ['Product', ['Product thinking', 'UX / UI design', 'Scoping & tradeoffs', 'User research']],
  ['Build', ['React / React Native', 'AI / LLM integration', 'Supabase', 'Rapid prototyping']],
  ['Craft', ['VFX compositing', 'Color grading', 'Visual systems', 'Storytelling']],
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__inner shell">
        <h2 className="skills__title">What I bring</h2>
        <div className="skills__grid">
          {GROUPS.map(([title, items]) => (
            <div className="skills__group" key={title}>
              <div className="skills__group-label">{title.toUpperCase()}</div>
              <div className="skills__items">
                {items.map((s) => (
                  <div className="skills__item" key={s}>
                    <span className="skills__item-dot" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
