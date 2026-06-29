import './About.css';
import profile from '../assets/profile.png';

export default function About() {
  return (
    <section id="about" className="about shell">
      <h2 className="about__title">About</h2>
      <div className="about__grid">
        <figure className="about__portrait">
          <div className="about__frame">
            <img
              className="about__img"
              src={profile}
              alt="Portrait of Tomer Epshtein"
              width="640"
              height="640"
            />
          </div>
        </figure>
        <div className="about__text">
          <p className="about__lead">
            I spent sixteen years as a lead compositor and colorist — making
            thousands of shots look effortless under brutal deadlines.
          </p>
          <p className="about__body">
            That work was relentless problem-solving: take a messy, broken input
            and make it land — pixel-perfect, on time, every time. Somewhere
            along the way I realized the part I loved most wasn't the shot. It
            was building the system that made the shot possible.
          </p>
          <p className="about__body">
            So I started building products. Not a course, not a side hobby —
            real things, shipped end-to-end. The VFX background isn't behind me;
            it's the reason I can look at a tangled creative workflow and see
            exactly where the tool should go.
          </p>
          <p className="about__body">
            I learn by shipping, not by waiting for permission. If you're
            building something at the intersection of AI, creative tooling, and
            real workflows — that's exactly where I want to be.
          </p>
        </div>
      </div>
    </section>
  );
}
