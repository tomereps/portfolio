import { useCallback, useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import ReelTile from '../components/ReelTile';
import ReelLightbox from '../components/ReelLightbox';
import { reel } from '../data/reel';
import './Reel.css';

/*
 * The reel: a wall of AI generations.
 *
 * Tiles play short silent previews. Opening one loads the full piece, with
 * sound, from Vercel Blob in the lightbox. That split is what lets long
 * episodes sit in the grid without the page streaming all of them.
 */
export default function Reel() {
  const [openId, setOpenId] = useState(null);

  // routed page: arrive at the top, same as the case-study routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openIndex = reel.findIndex((c) => c.id === openId);
  const open = openIndex >= 0 ? reel[openIndex] : null;

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
            {/* the playback hint only means something once there is a tile */}
            {reel.length > 0 && ' Tiles play silent previews. Open one to watch the full piece with sound.'}
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
            <Reveal
              key={clip.id}
              delay={Math.min(i, 6) * 70}
              className={`reel__cell reel__cell--${clip.orientation}`}
            >
              <ReelTile clip={clip} onOpen={(c) => setOpenId(c.id)} />
            </Reveal>
          ))}
        </div>
      )}

      {open && <ReelLightbox clip={open} onClose={() => setOpenId(null)} onStep={step} />}
    </main>
  );
}
