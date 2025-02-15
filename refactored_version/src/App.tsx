import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Hero, About, Projects, Contact, LanguageChanger } from './components/sections';

const App: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="mt-16">
          <LanguageChanger />
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
      </div>
    </Router>
  );
};

export default App;
