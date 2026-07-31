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
          Clear products.
        </h1>
        <p className="hero__lede">
          After years of solving visual challenges in VFX, I now design and
          build AI products that simplify complex work.
        </p>
      </div>
    </section>
  );
}
