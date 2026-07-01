import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import DeepDive from './pages/DeepDive';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/work/:slug/deep" element={<DeepDive />} />
        {/* unknown routes fall back to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
