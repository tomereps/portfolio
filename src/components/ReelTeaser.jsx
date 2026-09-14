import { Link } from 'react-router-dom';
import { reel } from '../data/reel';
import './ReelTeaser.css';

/*
 * Entry point to /reel from the Work section.
 *
 * Work used to mean "shipped products" and nothing else; this is the second
 * band under the same anchor. It is titled "Reel", not "AI generations",
 * because the reel holds both AI-generated and traditional VFX work, and each
 * clip on the reel page states which it is.
 *
 * It shows posters rather than a text link because the thing being linked to
 * is visual. Posters only: no <video> here. The home page should not pay for
 * video decode to advertise a page the viewer has not opened yet.
 */
const MAX_THUMBS = 5;
const SUBTITLE = 'AI generations & VFX compositing';

export default function ReelTeaser() {
  /* Empty reel: announce it rather than hide it, matching the nav chip and the
     /reel placeholder. A static card, not a link, because clicking through to
     a second "coming soon" would be a dead end. Swaps to the poster strip on
     its own once the manifest has clips. */
  if (reel.length === 0) {
    return (
      <>
        <div className="work__head work__head--sub">
          <h2 className="work__title">Reel</h2>
          <span className="work__count">{SUBTITLE}</span>
        </div>

        <div className="reelteaser reelteaser--soon">
          <span className="reelteaser__soon-tag mono">Coming soon</span>
          <p className="reelteaser__soon-text">
            A reel of AI generations and traditional VFX compositing. The first clips are being
            cut now.
          </p>
        </div>
      </>
    );
  }

  const thumbs = reel.slice(0, MAX_THUMBS);
  const rest = reel.length - thumbs.length;

  return (
    <>
      <div className="work__head work__head--sub">
        <h2 className="work__title">Reel</h2>
        <span className="work__count">
          {reel.length} clip{reel.length === 1 ? '' : 's'} · {SUBTITLE}
        </span>
      </div>

      <Link
        className="reelteaser"
        to="/reel"
        aria-label={`Open the reel, ${reel.length} clip${reel.length === 1 ? '' : 's'}`}
      >
        <span className="reelteaser__strip">
          {thumbs.map((clip) => (
            /* each poster carries the same AI / No AI badge as its tile, so the
               home strip never shows mixed work without saying which is which */
            <span key={clip.id} className="reelteaser__cell">
              <img
                className="reelteaser__thumb"
                src={clip.poster}
                alt=""
                loading="lazy"
                decoding="async"
              />
              {clip.kindBadge && (
                <span className={`reelteaser__kind reelteaser__kind--${clip.kind}`}>
                  {clip.kindBadge}
                </span>
              )}
            </span>
          ))}
        </span>

        <span className="reelteaser__bar">
          <span className="reelteaser__label">
            Open the reel
            {rest > 0 && <span className="reelteaser__rest"> · {rest} more</span>}
          </span>
          <span className="reelteaser__arrow" aria-hidden>
            &rarr;
          </span>
        </span>
      </Link>
    </>
  );
}
