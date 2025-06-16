import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'

const Projects = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary')

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = Object.values(t('projects.items', { returnObjects: true }))

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`inline ${index < rating ? 'text-[#F1C40F]' : 'text-gray-300'}`}
      />
    ))
  }

  const toggleDescription = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'summary' ? 'detailed' : 'summary')
  }

  useEffect(() => {
    if (!isHovered && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      let position = carouselRef.current.scrollLeft
      
      const scroll = () => {
        if (!isHovered && carouselRef.current) {
          position += 1
          carouselRef.current.scrollLeft = position
          
          if (position >= scrollWidth / 2) {
            position = 0
            carouselRef.current.scrollLeft = 0
          }
        }
      }

      const intervalId = setInterval(scroll, 20)
      return () => clearInterval(intervalId)
    }
  }, [isHovered])

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white rounded-xl shadow-lg">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A66C2] text-center mb-8 tracking-tight">
          {t('projects.title')}
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg max-w-3xl mx-auto leading-relaxed">
          {t('projects.description')}
        </p>

        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-8 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-none w-[400px] bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div>
                  {/* Title and View Toggle */}
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-[#0A66C2]"
                      whileHover={{ x: 3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <div className="flex gap-3">
                      {project.url && (
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] hover:text-[#084a8d]"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                      <button
                        onClick={() => toggleDescription(project.id)}
                        className="text-[#0A66C2] hover:text-[#084a8d] text-sm font-medium"
                      >
                        {expandedId === project.id ? t('projects.showLess') : t('projects.readMore')}
                      </button>
                    </div>
                  </div>

                  {/* Description with AnimatePresence */}
                  <AnimatePresence mode="wait">
                    {expandedId === project.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <p className="text-gray-600 italic text-base mb-4">
                          "{project.review}"
                        </p>
                      </motion.div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-700 mb-4 text-base leading-relaxed line-clamp-2"
                      >
                        {project.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech: string) => (
                      <motion.span
                        key={tech}
                        className="text-sm font-medium px-3 py-1.5 rounded-full bg-[#E6F0F8] text-[#0A66C2]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Rating Section */}
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {renderStars(project.rating)}
                    <span className="text-gray-500 text-sm">({project.rating.toFixed(1)})</span>
                  </motion.div>

                  {/* Project Image */}
                  {project.image && (
                    <motion.div
                      className="relative group mt-4 h-48 overflow-hidden rounded-xl border border-gray-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      {project.url && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <FiExternalLink className="text-white opacity-0 group-hover:opacity-100 w-8 h-8" />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>{project.date}</span>
                    {project.private && (
                      <span className="italic">{t('projects.privateProject')}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auto Scroll Indicator */}
        <motion.div 
          className="flex justify-center mt-8 text-base text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
