import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Hero, About, Projects, Contact } from './components/sections';

const App: FC = () => {

  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Added responsive spacer: visible on mobile only. */}
        <div className="block sm:hidden h-16"></div>
        <div className="container mx-auto">
          <div className="content">
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
        </div>
        <footer>{/* Footer */}</footer>
      </div>
    </Router>
  );
};

export default App;
