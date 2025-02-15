import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GB, BR } from 'country-flag-icons/react/3x2';
import { ChevronDown } from 'lucide-react';

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', flag: GB, label: 'English', title: 'UK flag' },
    { code: 'pt', flag: BR, label: 'Português', title: 'Brazil flag' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-16 right-4 z-20" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <currentLanguage.flag className="w-5 h-auto" title={currentLanguage.title} />
          <span className="text-sm font-medium text-gray-700">{currentLanguage.label}</span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors
                  ${i18n.language === language.code
                    ? 'bg-[#0077B5]/5 text-[#0077B5]'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <language.flag className="w-5 h-auto" title={language.title} />
                <span className="font-medium">{language.label}</span>
                {i18n.language === language.code && (
                  <span className="ml-auto text-[#0077B5]">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageChanger;