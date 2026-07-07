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
            I've spent my career creating visuals across film, TV, commercials
            and gaming. Whether in 3D, motion graphics, compositing, color
            grading or AI, my focus has always been creating images that tell
            the story.
          </p>
          <p className="about__body">
            Somewhere along the way, I realized the part I loved most wasn't the
            shot itself. It was building the systems that made the shot possible
            — improving workflows and finding better ways for artists to do
            their best work.
          </p>
          <p className="about__body">
            That curiosity led me into product management and product
            development. Today I build AI products from idea to launch,
            combining hands-on production experience with a deep interest in
            user experience and design.
          </p>
          <p className="about__body">
            I'm always learning by building, shipping, testing, and improving.
          </p>
          <p className="about__body">
            If you're building at the intersection of AI, education, creative
            tools and real workflows — that's exactly where I want to be.
          </p>
        </div>
      </div>
    </section>
  );
}
