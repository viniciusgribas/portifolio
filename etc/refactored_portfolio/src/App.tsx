import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero, About, Projects, Contact } from './components/sections';

const App: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="app">
      <nav className = "flex justify-center gap-4">
        {/* Navigation */}
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('pt')}>PT</button>
      </nav>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer>{/* Footer */}</footer>
    </div>
  );
};

export default App;