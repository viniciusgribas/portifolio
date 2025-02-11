import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin } from 'react-icons/fi'

const Journey = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('about.timeline.title')}
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {t('about.timeline.items', { returnObjects: true }).map((item, index) => (
            <motion.div
              key={item.period}
              className="relative pl-8 pb-8 border-l-2 border-secondary/20 last:border-l-0"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-secondary" />
              
              <div className="bg-secondary/5 rounded-lg p-6 ml-4 hover:bg-secondary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    {item.period}
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold mb-2">{item.role}</h4>
                <div className="flex items-center gap-2 text-textSecondary mb-4">
                  <FiMapPin className="w-4 h-4 text-secondary" />
                  <span>{item.company}</span>
                </div>
                
                <p className="text-textSecondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Journey 