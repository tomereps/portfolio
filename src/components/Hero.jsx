import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      {/* faint circuit-trace texture bleeding off the right edge, decorative */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__inner shell">
        <h1 className="hero__title">
          Complex workflows.
          <br />
          Clear products<span className="hero__dot">.</span>
        </h1>
        <p className="hero__lede">
          After years of solving visual challenges in VFX, I now design and
          build AI products that simplify complex work.
        </p>
        <div className="hero__actions">
          <a className="hero__cta" href="#work">
            See what I&apos;ve shipped <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
