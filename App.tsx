import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CookieBanner from './components/CookieBanner';
import BackToTop from './components/BackToTop';

// Route-level code splitting – each page is loaded on demand
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Security = lazy(() => import('./pages/Security'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay removed completely for faster FCP
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
        <ScrollToTop />
        <AnimatePresence mode='wait'>
          {isLoading && <Loader key="loader" />}
        </AnimatePresence>

        <Navbar />
        <CookieBanner />
        <BackToTop />
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/portafolio" element={<Portfolio />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/terminos" element={<Terms />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/seguridad" element={<Security />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;