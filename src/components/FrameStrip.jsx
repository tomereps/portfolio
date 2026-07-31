import './FrameStrip.css';

/*
 * The signature device: a colorist's contact sheet reduced to a rule.
 *
 * As a divider it separates sections and doubles as a position marker: the
 * lit cell advances down the page like a playhead, so the strip says where
 * you are rather than just decorating the gap.
 *
 * `active` is the index of the lit cell; -1 lights none.
 */
export default function FrameStrip({ count = 24, active = -1, variant = 'divider' }) {
  return (
    <div className={`frame-strip frame-strip--${variant}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`frame-strip__cell${i === active ? ' frame-strip__cell--active' : ''}`}
        />
      ))}
    </div>
  );
}
