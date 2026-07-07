import './Hero.css';

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
    </section>
  );
}
