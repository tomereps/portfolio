import { useCallback, useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import ReelTile from '../components/ReelTile';
import ReelLightbox from '../components/ReelLightbox';
import { reel } from '../data/reel';
import './Reel.css';

/*
 * The reel: a wall of AI generations.
 *
 * The page owns two pieces of state the tiles cannot own individually:
 *   soloId  - which clip is audible. Exactly one, ever, because a grid of
 *             clips all unmuting at once is unusable.
 *   openId  - which clip is in the lightbox.
 */
export default function Reel() {
  const [soloId, setSoloId] = useState(null);
  const [openId, setOpenId] = useState(null);

  // routed page: arrive at the top, same as the case-study routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openIndex = reel.findIndex((c) => c.id === openId);
  const open = openIndex >= 0 ? reel[openIndex] : null;

  // the lightbox carries its own audio, so nothing in the grid should be loud
  useEffect(() => {
    if (open) setSoloId(null);
  }, [open]);

  const step = useCallback(
    (dir) => {
      if (openIndex < 0) return;
      const next = (openIndex + dir + reel.length) % reel.length;
      setOpenId(reel[next].id);
    },
    [openIndex],
  );

  return (
    <main className="reel shell">
      <header className="reel__head">
        <div>
          <h1 className="reel__title">Reel</h1>
          <p className="reel__lede">
            Generated shots, look tests and motion studies.
            {/* the sound hint only means something once there is a tile to tap */}
            {reel.length > 0 && ' Sound is off by default. Tap the speaker on any tile, or open one for the full frame.'}
          </p>
        </div>
        {reel.length > 0 && (
          <span className="reel__count mono">
            {reel.length} clip{reel.length === 1 ? '' : 's'}
          </span>
        )}
      </header>

      {/* Public placeholder while the reel is empty. It disappears on its own:
          drop clips into media/reel/ and run `npm run optimize:videos`. */}
      {reel.length === 0 ? (
        <section className="reel__soon" aria-label="Coming soon">
          <span className="reel__soon-tag mono">Coming soon</span>
          <p className="reel__soon-text">
            The first clips are being cut now. Check back shortly, or see the shipped products in
            the meantime.
          </p>
          {/* plain anchor, like the nav's section links: a routed Link lands at
              the top of home and ignores the #work hash */}
          <a className="reel__soon-link" href="/#work">
            View shipped products
            <span aria-hidden>&rarr;</span>
          </a>
        </section>
      ) : (
        <div className="reel__grid">
          {reel.map((clip, i) => (
            <Reveal key={clip.id} delay={Math.min(i, 6) * 70} className={`reel__cell reel__cell--${clip.orientation}`}>
              <ReelTile
                clip={clip}
                solo={soloId === clip.id}
                onSolo={setSoloId}
                onOpen={(c) => setOpenId(c.id)}
              />
            </Reveal>
          ))}
        </div>
      )}

      {open && <ReelLightbox clip={open} onClose={() => setOpenId(null)} onStep={step} />}
    </main>
  );
}
