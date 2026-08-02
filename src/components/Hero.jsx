import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner shell">
        <h1 className="hero__title">
          {/* the real line below is untouched, calm, and complete from the
              first frame. These two duplicates are absolutely positioned
              siblings (not nested inside the real line) that sit on top of
              it as noise - clip-path bands, jitter, blur - clearing away on
              load so the sentence reads as resolving out of static into
              something that was already true underneath. aria-hidden;
              screen readers only ever see the one real line below. */}
          <span className="hero__glitch-layer hero__glitch-layer--a" aria-hidden="true">
            Complex workflows.
          </span>
          <span className="hero__glitch-layer hero__glitch-layer--b" aria-hidden="true">
            Complex workflows.
          </span>
          {/* thin horizontal tear slices - a narrow band of the line snaps
              sideways and back, the classic broadcast-glitch signature,
              layered on top of the broader clip-path noise above */}
          <span className="hero__glitch-layer hero__glitch-slice hero__glitch-slice--a" aria-hidden="true">
            Complex workflows.
          </span>
          <span className="hero__glitch-layer hero__glitch-slice hero__glitch-slice--b" aria-hidden="true">
            Complex workflows.
          </span>
          <span className="hero__line hero__line--first">Complex workflows.</span>
          <span className="hero__line">
            Clear <span className="hero__accent-word">products.</span>
          </span>
        </h1>
        <p className="hero__lede">
          After years of solving visual challenges in VFX, I now design and
          build AI products that simplify complex work.
        </p>
      </div>
    </section>
  );
}
