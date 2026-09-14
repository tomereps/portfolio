import { useCallback, useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import ReelTile from '../components/ReelTile';
import ReelLightbox from '../components/ReelLightbox';
import { reel, reelSections } from '../data/reel';
import './Reel.css';

/*
 * The reel: a wall of AI generations, filed by category.
 *
 * Tiles play short silent previews. Opening one loads the full piece, with
 * sound, from Vercel Blob in the lightbox. That split is what lets long
 * episodes sit in the grid without the page streaming all of them.
 *
 * Previous/next in the lightbox walks the flat `reel` list, which is already
 * in section order, so stepping past the last clip of one category moves on
 * to the first clip of the next.
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
        reelSections.map((section) => {
          const headingId = `reel-cat-${section.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
            <section key={section.name} className="reel__section" aria-labelledby={headingId}>
              <div className="reel__section-head">
                <h2 id={headingId} className="reel__section-title">
                  {section.name}
                </h2>
                <span className="reel__section-count mono">
                  {section.clips.length} clip{section.clips.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="reel__grid">
                {section.clips.map((clip, i) => (
                  /* The row item is a plain div, not the Reveal wrapper:
                     Reveal owns its own inline style for the stagger delay,
                     and --ar (width / height) has to live on the flex item. */
                  <div
                    key={clip.id}
                    className={`reel__cell reel__cell--${clip.orientation}`}
                    style={{ '--ar': clip.width / clip.height }}
                  >
                    <Reveal delay={Math.min(i, 6) * 70}>
                      <ReelTile clip={clip} onOpen={(c) => setOpenId(c.id)} />
                    </Reveal>
                  </div>
                ))}
              </div>
            </section>
          );
        })
      )}

      {open && <ReelLightbox clip={open} onClose={() => setOpenId(null)} onStep={step} />}
    </main>
  );
}
