import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BiData } from 'react-icons/bi';
import { FaRobot, FaChartLine } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { TbMathFunction } from 'react-icons/tb';
import { ChevronDown } from 'lucide-react';

interface SkillCategory {
  icon: React.ElementType;
  skills: string[];
}

interface SkillsByCategory {
  [key: string]: SkillCategory;
}

const skillsByCategory: SkillsByCategory = {
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
    skills: ['Python', 'React + JavaScript + TypeScript + Node.js', 'SQL', 'CSS + HTML', 'Backend', 'Frontend', 'Agile Methodologies']
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
    <motion.section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Profile Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#0A66C2] mb-8 text-center"
        >
          {t('about.title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-gray-700"
        >
          <p className="text-xl leading-relaxed">{t('about.description')}</p>
          <p className="text-xl leading-relaxed">{t('about.description2')}</p>
          <p className="text-xl leading-relaxed">{t('about.description3')}</p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-semibold text-[#0A66C2] mb-10 text-center"
        >
          {t('about.expertise')}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([key, category], index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : key)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"
                      >
                        <Icon className="text-2xl text-[#0A66C2]" />
                      </motion.div>
                      <h4 className="text-xl font-medium text-gray-900">
                        {t(`about.skills.categories.${key}`)}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-gray-500 w-5 h-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="space-y-3 pr-2">
                          {category.skills.map((skill) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3 text-gray-600 text-lg"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default About;