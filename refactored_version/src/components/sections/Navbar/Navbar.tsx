import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary text-xl font-bold">
              {t('navbar.logo')}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-textPrimary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('navbar.home')}
              </Link>
              <Link
                to="/about"
                className="text-textPrimary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('navbar.about')}
              </Link>
              <Link
                to="/projects"
                className="text-textPrimary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('navbar.projects')}
              </Link>
              <Link
                to="/contact"
                className="text-textPrimary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">{t('navbar.openMenu')}</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-textPrimary hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/about"
              className="text-textPrimary hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('navbar.about')}
            </Link>
            <Link
              to="/projects"
              className="text-textPrimary hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('navbar.projects')}
            </Link>
            <Link
              to="/contact"
              className="text-textPrimary hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('navbar.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;