import FrameStrip from './FrameStrip';
import './Contact.css';

const EMAIL = 'tomer.ep1@gmail.com';
// TODO: replace with Tomer's real LinkedIn profile URL.
const LINKEDIN = '#';

export default function Contact() {
  return (
    <section id="contact" className="contact shell">
      <div className="contact__card">
        <div className="contact__inner">
          <h2 className="contact__title">
            Let's build something
            <br />
            worth shipping.
          </h2>
          <p className="contact__lede">
            I'm looking for a full-time role where I can build AI-powered
            products end-to-end. If that sounds like your team, let's talk.
          </p>
          <div className="contact__actions">
            <a className="contact__btn contact__btn--primary" href={`mailto:${EMAIL}`}>
              Email me
            </a>
            <a
              className="contact__btn contact__btn--ghost"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="contact__strip">
          <FrameStrip count={8} active={3} />
        </div>
      </div>
      <div className="contact__footer">
        © 2026 Tomer Epshtein — built, not templated.
      </div>
    </section>
  );
}
