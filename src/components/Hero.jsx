import './Hero.css';
import heroImg from '../assets/hero/hero.webp';
import heroImgSm from '../assets/hero/hero-sm.webp';

export default function Hero() {
  return (
    <section className="hero shell">
      <div className="hero__copy">
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
            See what I&apos;ve shipped <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>

      <figure className="hero__figure">
        <img
          className="hero__img"
          src={heroImg}
          srcSet={`${heroImgSm} 560w, ${heroImg} 880w`}
          sizes="(max-width: 860px) 92vw, 40vw"
          width="880"
          height="1092"
          alt="A strip of 35mm film hanging against paper, a single frame lit indigo"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </section>
  );
}
