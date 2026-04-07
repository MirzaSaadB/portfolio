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
);
}

export default App;
