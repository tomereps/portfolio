import { useEffect, useRef, useState } from 'react';

/*
 * Scroll-reveal wrapper.
 *
 * Content starts VISIBLE and is only hidden once the observer has confirmed
 * the element is off-screen. IntersectionObserver delivers callbacks only
 * while the page is compositing frames, so an observer that never reports
 * leaves the section on screen instead of blanking it. Same for a browser
 * without IntersectionObserver, or JS that fails to run at all.
 *
 * Elements already in view on load stay put rather than animating, so the
 * hero's own entry cascade is the only thing moving above the fold.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState('open'); // open | hidden | in

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPhase('hidden');
          return;
        }
        // first report already on screen -> leave it alone
        setPhase((p) => (p === 'hidden' ? 'in' : 'open'));
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['reveal', phase !== 'open' && `reveal--${phase}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={cls}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
