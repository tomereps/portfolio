import './Nav.css';
import cvUrl from '../../TomerEP_CV.pdf';

const LINKS = ['Work', 'About', 'Skills', 'Contact'];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner shell">
        <div>
          {/* hash links target the home page so they also work from case-study routes */}
          <a className="nav__name" href="/">
            Tomer Epshtein<span>.</span>
          </a>
          <div className="nav__tagline">product · creative solutions · vfx</div>
        </div>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l} className="nav__link" href={`/#${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
          <a
            className="nav__cta"
            href={cvUrl}
            download="Tomer-Epshtein-CV.pdf"
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
