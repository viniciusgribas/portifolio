/**
 * About Component
 * Displays information about skills and experience
 * Uses Framer Motion for animations and intersection observer for scroll-based animations
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

// List of technical skills organized by category
const skillsByCategory = {
  dataEngineering: {
    title: 'Data Engineering',
    skills: [
      'Airflow',
      'ETL Process',
      'Apache Spark',
      'Kafka',
      'Data Pipelines',
      'Data Warehousing',
      'Data Lakes',
      'SQL & NoSQL',
      'Data Modeling'
    ],
  },
  dataScience: {
    title: 'Data Science',
    skills: [
      'TensorFlow',
      'SciPy',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Jupyter',
      'Statistical Analysis',
      'Machine Learning',
      'Data Visualization'
    ],
  },
  devOpsCloud: {
    title: 'DevOps & Cloud Computing',
    skills: [
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Infrastructure as Code',
      'Terraform',
      'Git',
      'Monitoring & Logging'
    ],
  },
  softwareEngineering: {
    title: 'Software Engineering',
    skills: [
      'Python',
      'Java',
      'JavaScript',
      'REST APIs',
      'Microservices',
      'System Design',
      'Clean Code',
      'Design Patterns',
      'Test-Driven Development'
    ],
  },
  artificialIntelligence: {
    title: 'Artificial Intelligence',
    skills: [
      'Deep Learning',
      'Neural Networks',
      'NLP',
      'Computer Vision',
      'PyTorch',
      'Keras',
      'Reinforcement Learning',
      'Model Deployment',
      'MLOps'
    ],
  },
  businessIntelligence: {
    title: 'Business Intelligence',
    skills: [
      'Power BI',
      'Tableau',
      'Data Analytics',
      'KPI Monitoring',
      'Dashboard Design',
      'Business Analysis',
      'Data Storytelling',
      'SQL Server',
      'ETL Tools'
    ],
  },
}

const About = () => {
  const { t } = useTranslation()
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-12"
      >
        {/* Text content */}
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            {t('about.title')}
          </h2>
          <p className="text-textSecondary mb-4">
            {t('about.description')}
          </p>
          <p className="text-textSecondary mb-4">
            {t('about.description2')}
          </p>
          <p className="text-textSecondary mb-6">
            {t('about.description3')}
          </p>
        </div>
          
        {/* Skills section */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Areas of Expertise & Technologies
          </h3>
          {/* Skills categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([key, category], categoryIndex) => (
              <motion.div
                key={key}
                className="bg-secondary/5 rounded-lg p-6 hover:bg-secondary/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5,
                  delay: categoryIndex * 0.1
                }}
              >
                <h4 className="text-xl font-medium mb-4 text-secondary">
                  {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="flex items-center text-textSecondary"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                    >
                      <span className="text-secondary mr-2">▹</span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About 