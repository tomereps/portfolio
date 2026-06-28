import './FrameStrip.css';

/* Shared frame-strip motif. `active` highlights one cell; -1 = none. */
export default function FrameStrip({ count = 7, active = -1, tiny = false }) {
  return (
    <div className={`frame-strip${tiny ? ' frame-strip--tiny' : ''}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`frame-strip__cell${
            i === active ? ' frame-strip__cell--active' : ''
          }`}
        />
      ))}
    </div>
  );
}
