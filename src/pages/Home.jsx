import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

/*
 * Section links (/#work, /#about, ...) are plain anchors so they work from any
 * route. Arriving from another page is a fresh load of the SPA, and the
 * browser's own fragment scroll can fire before React has rendered the target,
 * leaving the visitor at the top. So scroll to the hash ourselves once the
 * sections exist, then once more after fonts and images settle, since late
 * layout shifts would otherwise leave the section slightly off.
 *
 * The sticky-nav offset lives in CSS (scroll-margin-top on section[id]), so
 * native same-page anchor clicks get it too.
 */
function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    const scroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      // instant: a smooth scroll from the top on arrival reads as a glitch
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    };

    const frame = requestAnimationFrame(scroll);

    let cancelled = false;
    const settle = () => {
      if (!cancelled) scroll();
    };
    document.fonts?.ready.then(settle);
    if (document.readyState === 'complete') settle();
    else window.addEventListener('load', settle, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('load', settle);
    };
  }, [hash]);
}

export default function Home() {
  useHashScroll();

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
