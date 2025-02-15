import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
      scrolled ? 'bg-[#0077B5] shadow-lg' : 'bg-[#0077B5]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <span className="text-white text-3xl font-mono font-extrabold tracking-wide hover:scale-105 transition-transform">
              {t('navbar.logo')}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#hero" icon={<Home size={24} />} label={t('navbar.home')} />
            <NavLink href="#about" icon={<User size={24} />} label={t('navbar.about')} />
            <NavLink href="#projects" icon={<Briefcase size={24} />} label={t('navbar.projects')} />
            <NavLink href="#contact" icon={<Mail size={24} />} label={t('navbar.contact')} />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full hover:bg-white/20 text-white transition-all"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-64 border-t' : 'max-h-0'
      } overflow-hidden bg-[#0077B5]`}>
        <div className="px-6 py-3 space-y-2">
          <MobileNavLink href="#hero" icon={<Home size={24} />} label={t('navbar.home')} onClick={() => setIsOpen(false)} />
          <MobileNavLink href="#about" icon={<User size={24} />} label={t('navbar.about')} onClick={() => setIsOpen(false)} />
          <MobileNavLink href="#projects" icon={<Briefcase size={24} />} label={t('navbar.projects')} onClick={() => setIsOpen(false)} />
          <MobileNavLink href="#contact" icon={<Mail size={24} />} label={t('navbar.contact')} onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component
const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white transition-colors group"
  >
    <div className="group-hover:bg-white/20 p-3 rounded-lg transition-colors">
      {icon}
    </div>
    <span className="text-sm mt-1">{label}</span>
  </a>
);

// Mobile NavLink component
const MobileNavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; onClick: () => void }> = ({ 
  href, icon, label, onClick 
}) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center px-4 py-4 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
  >
    <span className="mr-4">{icon}</span>
    <span className="text-base font-semibold">{label}</span>
  </a>
);

export default Navbar;
