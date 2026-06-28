import FrameStrip from './FrameStrip';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about shell">
      <div>
        <h2 className="about__title">About</h2>
        <div className="about__strip">
          <FrameStrip count={9} active={4} />
        </div>
      </div>
      <div>
        <p className="about__lead">
          I spent sixteen years as a lead compositor and colorist — making
          thousands of shots look effortless under brutal deadlines.
        </p>
        <p className="about__body">
          That work was relentless problem-solving: take a messy, broken input
          and make it land — pixel-perfect, on time, every time. Somewhere along
          the way I realized the part I loved most wasn't the shot. It was
          building the system that made the shot possible.
        </p>
        <p className="about__body">
          So I started building products. Not a course, not a side hobby — real
          things, shipped end-to-end. The VFX background isn't behind me; it's
          the reason I can look at a tangled creative workflow and see exactly
          where the tool should go.
        </p>
      </div>
    </section>
  );
}
