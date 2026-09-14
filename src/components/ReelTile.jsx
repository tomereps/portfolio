import { useEffect, useRef, useState } from 'react';
import './ReelTile.css';

/*
 * One clip in the reel grid.
 *
 * The tile plays the clip's PREVIEW: a short silent loop committed to the
 * repo. The full piece, with sound, lives on Vercel Blob and only loads when
 * the viewer opens the lightbox. So a grid of long episodes costs a few small
 * loops, not a stream of every episode.
 *
 * Three more things keep a wall of video cheap:
 *   1. No <video src> until the tile is within 300px of the viewport, so the
 *      page opens with zero video requests.
 *   2. Playback only while on screen; scrolling past pauses and frees decode.
 *   3. The poster is a plain <img> underneath, taken from the preview's first
 *      frame, so the tile is never blank and there is no jump when it starts.
 */
export default function ReelTile({ clip, onOpen }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [armed, setArmed] = useState(false); // src attached
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* Two observers, because the two jobs need different margins and a single
     observer only gets one rootMargin.

     Arming runs 300px ahead so the preview has begun buffering by the time it
     scrolls in. Playback uses a slightly INSET viewport and a zero threshold
     rather than a ratio: a tall portrait clip can be the only thing on screen
     and still never cover 40% of a short viewport, so a ratio test would leave
     it frozen. "Any part of it is comfortably on screen" is the real rule. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setArmed(true); // no observer: load rather than show nothing
      setOnScreen(true);
      return undefined;
    }

    const arm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setArmed(true);
        arm.disconnect(); // one-way: a clip never un-arms
      },
      { rootMargin: '300px 0px' },
    );

    const play = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: '-8% 0px',
    });

    arm.observe(el);
    play.observe(el);
    return () => {
      arm.disconnect();
      play.disconnect();
    };
  }, []);

  /* Play only while on screen. Reduced motion means the poster stays put
     until the viewer opens the clip deliberately. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !armed || reduced) return;

    if (onScreen) {
      // play() rejects if the tab is backgrounded or the decoder is busy;
      // that is recoverable, not an error worth surfacing.
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [armed, onScreen, reduced]);

  return (
    <figure
      ref={wrapRef}
      className={`reeltile reeltile--${clip.orientation}`}
      style={{ '--aspect': `${clip.width} / ${clip.height}` }}
    >
      <button
        type="button"
        className="reeltile__surface"
        onClick={() => onOpen(clip)}
        aria-label={`Play ${clip.title} with sound`}
      >
        <img className="reeltile__poster" src={clip.poster} alt="" loading="lazy" decoding="async" />

        {armed && (
          <video
            ref={videoRef}
            className="reeltile__video"
            src={clip.preview}
            poster={clip.poster}
            loop
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        <span className="reeltile__scrim" aria-hidden="true" />

        {/* play affordance: previews are silent, the full piece is one click away */}
        <span className="reeltile__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l11-6.5Z" />
          </svg>
        </span>
      </button>

      <figcaption className="reeltile__bar">
        <span className="reeltile__title">{clip.title}</span>
        {clip.tool && <span className="reeltile__tool mono">{clip.tool}</span>}
        <span className="reeltile__dur mono">{formatDuration(clip.duration)}</span>
      </figcaption>
    </figure>
  );
}

/* 105.96 -> '1:46', 6.01 -> '0:06' */
function formatDuration(seconds) {
  const total = Math.round(seconds || 0);
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}
