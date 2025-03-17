import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiCode, FiInfo } from 'react-icons/fi';
import { Braces, Brain, Gauge, Lock } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

interface DemoCard {
  id: string;
  title: string;
  description: string;
  image: string;
  modelUrl: string;
  repoUrl?: string;
  tech: string[];
  category: 'nlp' | 'cv' | 'data' | 'other';
  isPublic: boolean;
}

const InteractiveSandbox: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDemo, setSelectedDemo] = useState<DemoCard | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Demo cards data
  const demoCards: DemoCard[] = t('sandbox.demos', { returnObjects: true }) as DemoCard[];

  // Filter demos based on active category
  const filteredDemos = activeCategory === 'all' 
    ? demoCards 
    : demoCards.filter(demo => demo.category === activeCategory);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nlp':
        return <Brain className="w-5 h-5" />;
      case 'cv':
        return <Gauge className="w-5 h-5" />;
      case 'data':
        return <Braces className="w-5 h-5" />;
      default:
        return <Braces className="w-5 h-5" />;
    }
  };

  // Handle demo card click
  const handleDemoClick = (demo: DemoCard) => {
    if (demo.isPublic) {
      window.open(demo.modelUrl, '_blank');
    } else {
      setSelectedDemo(demo);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedDemo(null);
  };

  return (
    <section id="sandbox" className="section-container py-24 bg-[#F3F2EF]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#0A66C2] mb-6"
          >
            {t('sandbox.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            {t('sandbox.description')}
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'nlp', 'cv', 'data', 'other'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#0A66C2] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {category !== 'all' && getCategoryIcon(category)}
                <span>{t(`sandbox.categories.${category}`)}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Demo cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDemos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative">
                {/* Demo image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0A66C2] shadow-sm text-xs font-medium">
                    {getCategoryIcon(demo.category)}
                    <span>{t(`sandbox.categories.${demo.category}`)}</span>
                  </div>
                </div>
                
                {/* Private/Public badge */}
                <div className="absolute top-4 right-4">
                  {!demo.isPublic ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 shadow-sm text-xs font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t('sandbox.privateLabel')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 shadow-sm text-xs font-medium">
                      <FiExternalLink className="w-3.5 h-3.5" />
                      <span>{t('sandbox.publicLabel')}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A66C2] mb-2">{demo.title}</h3>
                <p 
                  className="text-gray-600 mb-4 line-clamp-2"
                  data-tooltip-id={`tooltip-${demo.id}`}
                  data-tooltip-content={demo.description}
                >
                  {demo.description}
                </p>
                
                <Tooltip
                  id={`tooltip-${demo.id}`}
                  place="bottom"
                  className="max-w-sm bg-white text-gray-800 p-4 rounded-xl shadow-lg border border-gray-200"
                  style={{ zIndex: 1000 }}
                />
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {demo.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleDemoClick(demo)}
                    className="flex items-center gap-2 text-sm font-medium text-[#0A66C2] hover:text-[#074684] transition-colors"
                  >
                    {demo.isPublic ? (
                      <>
                        <span>{t('sandbox.tryItNow')}</span>
                        <FiExternalLink className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>{t('sandbox.learnMore')}</span>
                        <FiInfo className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  {demo.repoUrl && (
                    <a
                      href={demo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <span>{t('sandbox.viewCode')}</span>
                      <FiCode className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredDemos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg mt-8"
          >
            <p className="text-gray-500 text-lg">{t('sandbox.noResults')}</p>
          </motion.div>
        )}
        
        {/* Model Access Modal */}
        {selectedDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-2xl font-bold text-[#0A66C2] mb-4">{selectedDemo.title}</h3>
              <p className="text-gray-600 mb-6">{selectedDemo.description}</p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{t('sandbox.modal.restrictedTitle')}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>{t('sandbox.modal.restrictedMessage')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">{t('sandbox.modal.contactTitle')}</h4>
                <a
                  href="mailto:viniciusgribas@gmail.com"
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white bg-[#0A66C2] rounded-lg hover:bg-[#074684] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{t('sandbox.modal.contactButton')}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default InteractiveSandbox;