import { useCallback, useEffect, useRef } from 'react';
import './ReelLightbox.css';

/*
 * Focused view for one clip: full frame, native controls, sound ON.
 *
 * This is the only place audio starts unmuted, and it is always reached by a
 * click, so the gesture requirement is satisfied. Arrow keys move along the
 * reel; Escape closes and returns focus to the tile that opened it.
 */
export default function ReelLightbox({ clip, onClose, onStep }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreTo = useRef(null);

  // remember the trigger once, restore on unmount
  useEffect(() => {
    restoreTo.current = document.activeElement;
    return () => {
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus();
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
  }, [clip.id]);

  // lock background scroll without the layout jumping as the bar disappears
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, pad: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.pad;
    };
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);

      // keep Tab inside the dialog
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(
          'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose, onStep],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className="reelbox"
      role="dialog"
      aria-modal="true"
      aria-label={clip.title}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="reelbox__stage"
        style={{ '--aspect': `${clip.width} / ${clip.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* key remounts the element so stepping loads the new clip cleanly */}
        <video
          key={clip.id}
          className="reelbox__video"
          src={clip.src}
          poster={clip.poster}
          controls
          autoPlay
          loop
          playsInline
          preload="auto"
        />

        <div className="reelbox__meta">
          <span className="reelbox__title">{clip.title}</span>
          {clip.tool && <span className="reelbox__tool mono">{clip.tool}</span>}
          {clip.note && <span className="reelbox__note">{clip.note}</span>}
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        className="reelbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <button
        type="button"
        className="reelbox__nav reelbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous clip"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m14 6-6 6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="reelbox__nav reelbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next clip"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m10 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
