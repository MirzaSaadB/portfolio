import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import About from './components/About';
import Experience from './components/Experience';

import HireMe from './components/HireMe';

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#ff5555', background: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Professional Home Composite
const Home = () => (
<>
<Hero />
<About />
<Experience />
</>
);

const AnimatedRoutes = () => {
const location = useLocation();
return (
<AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>
<Route path="/" element={<Home />} />
<Route path="/skills" element={<Skills />} />
<Route path="/projects" element={<Projects />} />
<Route path="/projects/:id" element={<ProjectDetail />} />
<Route path="/contact" element={<Contact />} />
<Route path="*" element={<NotFound />} />
</Routes>
</AnimatePresence>
);
};

function App() {
const [theme, setTheme] = useState('dark');

useEffect(() => {
document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

const toggleTheme = () => {
setTheme(theme === 'dark' ? 'light' : 'dark');
};

  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="app">
          <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AnimatedRoutes />
          </main>
          <HireMe />
          <Footer />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
