import './Hero.css';

const STEPS = [
  ['Understand', 'Dig into the real workflow and where it actually breaks.'],
  ['Design', 'Shape clear, intuitive flows around that problem.'],
  ['Build & ship', 'Take it end-to-end — from brief to working product.'],
  ['Iterate', 'Refine on real usage and feedback, not assumptions.'],
];

export default function Hero() {
  return (
    <section className="hero shell">
      <div>
        <div className="hero__eyebrow">PRODUCT &amp; CREATIVE TECHNOLOGIST</div>
        <h1 className="hero__title">
          Complex workflows.
          <br />
          Clear products.
        </h1>
        <p className="hero__lede">
          After years of solving visual challenges in VFX, I now design and
          build AI products that simplify complex work.
        </p>

        <div className="hero__actions">
          <a className="hero__cta" href="#work">
            See what I've shipped <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div style={{ paddingTop: 6 }}>
        <div className="hero__how-label">HOW I WORK</div>
        <div className="hero__how">
          {STEPS.map(([t, d], i) => (
            <div className="hero__step" key={t}>
              <div className="hero__step-dot" />
              <div className="hero__step-num">0{i + 1}</div>
              <div className="hero__step-title">{t}</div>
              <div className="hero__step-desc">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
