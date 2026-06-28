import { useState, useEffect } from 'react';
import FrameStrip from './FrameStrip';
import './Hero.css';

const STEPS = [
  ['Understand', 'Dig into the real workflow and where it actually breaks.'],
  ['Design', 'Shape clear, intuitive flows around that problem.'],
  ['Build & ship', 'Take it end-to-end — from brief to working product.'],
  ['Iterate', 'Refine on real usage and feedback, not assumptions.'],
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 7), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero shell">
      <div>
        <div className="hero__eyebrow">PRODUCT &amp; CREATIVE TECHNOLOGIST</div>
        <h1 className="hero__title">
          I design and build
          <br />
          AI tools, end&nbsp;to&nbsp;end.
        </h1>
        <p className="hero__lede">
          Sixteen years in VFX taught me to solve hard visual problems under
          deadline. Now I turn messy, complex workflows into products people
          actually use — and I ship them myself.
        </p>

        <div className="hero__actions">
          <a className="hero__cta" href="#work">
            See what I've shipped <span aria-hidden>→</span>
          </a>
          <FrameStrip active={active} />
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
