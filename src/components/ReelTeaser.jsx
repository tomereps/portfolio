import { Link } from 'react-router-dom';
import { reel } from '../data/reel';
import './ReelTeaser.css';

/*
 * Entry point to /reel from the Work section.
 *
 * Work used to mean "shipped products" and nothing else; this is the second
 * band under the same anchor. It shows posters rather than a text link because
 * the thing being linked to is visual, and a row of real frames says what it is
 * faster than a label does.
 *
 * Posters only: no <video> here. The home page should not pay for video decode
 * to advertise a page the viewer has not opened yet.
 */
const MAX_THUMBS = 5;

export default function ReelTeaser() {
  // nothing to show and nothing worth linking to
  if (reel.length === 0) return null;

  const thumbs = reel.slice(0, MAX_THUMBS);
  const rest = reel.length - thumbs.length;

  return (
    <>
      <div className="work__head work__head--sub">
        <h2 className="work__title">AI generations</h2>
        <span className="work__count">
          {reel.length} clip{reel.length === 1 ? '' : 's'} · shot tests &amp; motion studies
        </span>
      </div>

      <Link className="reelteaser" to="/reel" aria-label={`Open the reel, ${reel.length} clips`}>
        <span className="reelteaser__strip">
          {thumbs.map((clip) => (
            <img
              key={clip.id}
              className="reelteaser__thumb"
              src={clip.poster}
              alt=""
              loading="lazy"
              decoding="async"
            />
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
