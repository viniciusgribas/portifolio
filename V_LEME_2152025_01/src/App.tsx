import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Hero, About, Projects, Contact } from './components/sections';

const App: FC = () => {

  return (
    <Router>
      <div className="app">
        <Navbar />
          {/* Add section IDs here for navigation */}
          <section id="hero">
            <Hero />
          </section>

          <section id="about" className="mt-16">
            <About />
          </section>

          <section id="projects" className="mt-16">
            <Projects />
          </section>

          <section id="contact" className="mt-16">
            <Contact />
          </section>
        </div>
        <footer>{/* Footer */}</footer>
    </Router>
  );
};

export default App;
