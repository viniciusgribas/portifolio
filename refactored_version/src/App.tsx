import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Hero, About, Projects, Contact } from './components/sections';

const App: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div className="app">
        <nav className="flex justify-center gap-4">
          {/* Navigation */}
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('pt')}>PT</button>
        </nav>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <footer>{/* Footer */}</footer>
      </div>
    </Router>
  );
};

export default App;