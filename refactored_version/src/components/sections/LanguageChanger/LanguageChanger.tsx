import { useTranslation } from 'react-i18next';

const LanguageChanger = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-md flex justify-normal gap-4 p-2">
      <button 
        onClick={() => changeLanguage('en')}
        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all
          ${i18n.language === 'en' 
            ? 'bg-blue-100 text-blue-700 border-blue-300' 
            : 'bg-gray-50 text-gray-700 border-gray-200'} 
          border hover:bg-blue-50`}
      >
        <img 
          src="https://flagcdn.com/w20/gb.png" 
          alt="UK flag" 
          className="w-5 h-auto"
        />
        EN
      </button>
      <button 
        onClick={() => changeLanguage('pt')}
        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all
          ${i18n.language === 'pt' 
            ? 'bg-blue-100 text-blue-700 border-blue-300' 
            : 'bg-gray-50 text-gray-700 border-gray-200'} 
          border hover:bg-blue-50`}
      >
        <img 
          src="https://flagcdn.com/w20/br.png" 
          alt="Brazil flag" 
          className="w-5 h-auto"
        />
        PT
      </button>
    </nav>
  );
};

export default LanguageChanger;
