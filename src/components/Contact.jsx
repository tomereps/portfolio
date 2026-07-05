import { useState, useEffect } from 'react';
import './Contact.css';

const LINKEDIN = 'https://www.linkedin.com/in/tomer-epshtein';

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openModal = () => {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
            Let's build something
            <br />
            worth shipping.
          </h2>
          <p className="contact__lede">
            I'm looking for a full-time role where I can build AI-powered
            products end-to-end. If that sounds like your team, let's talk.
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
      <div className="contact__footer">
        © 2026 Tomer Epshtein — built, not templated.
      </div>

      {open && (
        <div className="modal" role="dialog" aria-modal="true" onMouseDown={closeModal}>
          <div className="modal__card" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal} aria-label="Close">
              ×
            </button>

            {status === 'sent' ? (
              <div className="modal__done">
                <div className="modal__done-title">Message sent</div>
                <p className="modal__done-text">Thanks — I'll get back to you soon.</p>
                <button
                  type="button"
                  className="contact__btn contact__btn--primary modal__submit"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="modal__form" onSubmit={submit}>
                <h3 className="modal__title">Get in touch</h3>
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
                  <p className="modal__error">
                    Something went wrong — please try again, or reach me on LinkedIn.
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
        </div>
      )}
    </section>
  );
}
