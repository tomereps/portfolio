import { useEffect, useRef, useState } from 'react';
import './ReelTile.css';

/*
 * One clip in the reel grid.
 *
 * Three things make a wall of video cheap enough to ship:
 *   1. No <video src> until the tile is within 300px of the viewport, so a
 *      20-clip page opens with zero video requests.
 *   2. Playback only while on screen; scrolling past pauses and frees decode.
 *   3. The poster is a plain <img> underneath, so the tile is never blank and
 *      the aspect box is reserved from the manifest's real dimensions.
 *
 * Audio: tiles autoplay MUTED because every browser blocks audible autoplay.
 * The speaker button is the user gesture that unmutes, and the parent enforces
 * one audible clip at a time.
 */
export default function ReelTile({ clip, solo, onSolo, onOpen }) {
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

     Arming runs 300px ahead so the clip has begun buffering by the time it
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

  /* Read solo without depending on it: this effect is about visibility, and
     re-running it on every mute change would restart playback needlessly. */
  const soloRef = useRef(solo);
  soloRef.current = solo;

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
      if (soloRef.current) onSolo(null); // scrolled away from the audible clip
    }
  }, [armed, onScreen, reduced, onSolo]);

  /* The parent owns which clip is audible; the element just follows. */
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = !solo;
  }, [solo]);

  const toggleSound = (e) => {
    e.stopPropagation(); // the tile itself opens the lightbox
    const v = videoRef.current;
    if (v && v.paused) v.play().catch(() => {});
    onSolo(solo ? null : clip.id);
  };

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
        aria-label={`Open ${clip.title}`}
      >
        <img className="reeltile__poster" src={clip.poster} alt="" loading="lazy" decoding="async" />

        {armed && (
          <video
            ref={videoRef}
            className="reeltile__video"
            src={clip.src}
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
      </button>

      <figcaption className="reeltile__bar">
        <span className="reeltile__title">{clip.title}</span>
        {clip.tool && <span className="reeltile__tool mono">{clip.tool}</span>}

        <button
          type="button"
          className="reeltile__sound"
          onClick={toggleSound}
          aria-pressed={solo}
          aria-label={solo ? `Mute ${clip.title}` : `Unmute ${clip.title}`}
        >
          {solo ? <SpeakerOn /> : <SpeakerOff />}
        </button>
      </figcaption>
    </figure>
  );
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function SpeakerOn() {
  return (
    <svg {...iconProps}>
      <path d="M4 9.5h3L11.5 6v12L7 14.5H4Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6" />
      <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg {...iconProps}>
      <path d="M4 9.5h3L11.5 6v12L7 14.5H4Z" />
      <path d="m16 9.5 4.5 5M20.5 9.5l-4.5 5" />
    </svg>
  );
}
