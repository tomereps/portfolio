import { useState, useRef, useEffect, useId } from 'react';
import './Contact.css';

const LINKEDIN = 'https://www.linkedin.com/in/tomer-epshtein';

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const dialogRef = useRef(null);
  const titleId = useId();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openModal = () => {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
    setOpen(true);
  };

  /*
   * Native <dialog> rather than a hand-rolled overlay: showModal() gives us
   * the focus trap, Escape handling, focus return to the trigger, and
   * aria-modal semantics that the previous div-based version was missing.
   */
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact shell">
      <div className="contact__card">
        <div className="contact__inner">
          <h2 className="contact__title">
            Let&apos;s build something
            <br />
            worth shipping.
          </h2>
          <p className="contact__lede">
            I&apos;m looking for a full-time role where I can build AI-powered
            products end-to-end. If that sounds like your team, let&apos;s talk.
          </p>
          <div className="contact__actions">
            <button
              type="button"
              className="contact__btn contact__btn--primary"
              onClick={openModal}
            >
              Contact me
            </button>
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
      </div>

      <div className="contact__footer">© 2026 Tomer Epshtein</div>

      <dialog
        className="modal"
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // clicks that land on the backdrop resolve to the dialog itself
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="modal__card">
          <button className="modal__close" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>

          {status === 'sent' ? (
            <div className="modal__done">
              <h3 className="modal__done-title" id={titleId}>
                Message sent
              </h3>
              <p className="modal__done-text">Thanks, I&apos;ll get back to you soon.</p>
              <button
                type="button"
                className="contact__btn contact__btn--primary modal__submit"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <form className="modal__form" onSubmit={submit}>
              <h3 className="modal__title" id={titleId}>
                Contact me
              </h3>
              <label className="modal__field">
                <span>Name</span>
                <input type="text" required value={form.name} onChange={update('name')} />
              </label>
              <label className="modal__field">
                <span>Email</span>
                <input type="email" required value={form.email} onChange={update('email')} />
              </label>
              <label className="modal__field">
                <span>Message</span>
                <textarea rows="5" required value={form.message} onChange={update('message')} />
              </label>
              {status === 'error' && (
                <p className="modal__error" role="alert">
                  Something went wrong. Please try again, or reach me on LinkedIn.
                </p>
              )}
              <button
                type="submit"
                className="contact__btn contact__btn--primary modal__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}
