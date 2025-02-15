import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BiData } from 'react-icons/bi';
import { FaRobot, FaChartLine } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { TbMathFunction } from 'react-icons/tb';
import { ChevronDown } from 'lucide-react';

// Skills data organized by category
const skillsByCategory = {
  dataEngineering: {
    icon: BiData,
    skills: ['ETL', 'Pipelines', 'Apache Spark', 'Analytics Engineering', 'SQL & NoSQL', 'Data Lakes', 'Data Governance', 'Data Quality', 'Data Integration']
  },
  dataScience: {
    icon: TbMathFunction,
    skills: ['Machine Learning', 'Pandas', 'Jupyter', 'Statistical Analysis', 'Data Visualization', 'AWS SageMaker', 'Databricks']
  },
  devOps: {
    icon: BsCloudFill,
    skills: ['AWS', 'Azure', 'Google Cloud Platform', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Docker', 'Git', 'Monitoring & Logging']
  },
  software: {
    icon: AiOutlineCode,
    skills: ['Python','React + JavaScript + TypeScript + Node.js', 'SQL', 'CSS + HTML','Backend','Frontend' , 'Agile Methodologies']
  },
  ai: {
    icon: FaRobot,
    skills: ['Deep Learning', 'Prompt Engineering', 'NLP', 'AI Assistant Development', 'MLOps']
  },
  bi: {
    icon: FaChartLine,
    skills: ['Power BI', 'Tableau', 'Data Analytics', 'KPI Monitoring', 'Dashboard Design', 'Business Analysis', 'Data Storytelling']
  }
};

const About = () => {
  const { t } = useTranslation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      {/* Profile Section */}
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#0A66C2] mb-6"
        >
          {t('about.title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 text-gray-700"
        >
          <p className="text-lg">{t('about.description')}</p>
          <p className="text-lg">{t('about.description2')}</p>
          <p className="text-lg">{t('about.description3')}</p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-[#0A66C2] mb-6"
        >
          {t('about.expertise')}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsByCategory).map(([key, category], index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : key)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="text-2xl text-[#0A66C2]" />
                      <h4 className="text-lg font-medium text-gray-900">
                        {t(`about.skills.categories.${key}`)}
                      </h4>
                    </div>
                    <ChevronDown 
                      className={`text-gray-500 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Instructions inside the card */}
                  <div className="text-sm text-gray-500 mt-2">
                    {t('about.skills.instructions')}
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'mt-4 max-h-[300px]' : 'max-h-0'
                  }`}>
                    <div className="space-y-2 overflow-y-auto pr-2 show-scrollbar-on-hover">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-gray-600">
                          <span className="text-[#0A66C2]">•</span>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
