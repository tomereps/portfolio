import './Nav.css';
import cvUrl from '../../TomerEP_CV.pdf';

const LINKS = ['Work', 'About', 'Skills', 'Contact'];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner shell">
        <div className="nav__brand">
          {/* hash links target the home page so they also work from case-study routes */}
          <a className="nav__name" href="/">
            Tomer Epshtein<span>.</span>
          </a>
          <span className="nav__tagline">product · creative solutions · vfx</span>
        </div>

        {/* section links: inline on desktop, a scrollable strip on mobile */}
        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l} className="nav__link" href={`/#${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
        </nav>

        <a className="nav__cta" href={cvUrl} download="Tomer-Epshtein-CV.pdf">
          Download CV
        </a>
      </div>
    </header>
  );
}
