import Hero from '../components/Hero';
import FrameStrip from '../components/FrameStrip';
import Work from '../components/Work';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

/*
 * One filmstrip, read top to bottom: the lit cell advances through the
 * dividers as the page progresses, so they read as a single device rather
 * than three ornaments.
 */
const CELLS = 24;

export default function Home() {
  return (
    <>
      <Hero />
      <FrameStrip count={CELLS} active={5} />
      <Work />
      <FrameStrip count={CELLS} active={11} />
      <About />
      <FrameStrip count={CELLS} active={17} />
      <Skills />
      <Contact />
    </>
  );
}
