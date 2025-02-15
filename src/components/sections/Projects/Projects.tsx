import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'

const Projects = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
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
        transition={{ duration: 0.7, ease: "easeOut" }}
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
                  {/* Title and Links */}
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-[#0A66C2]"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-[#0A66C2] hover:underline flex items-center gap-2 font-medium"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 text-base leading-relaxed">
                    {project.description}
                  </p>
                  
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

                  {/* Rating and Review */}
                  <div className="mb-4">
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {renderStars(project.rating)}
                      <span className="text-gray-500 text-base">({project.rating.toFixed(1)})</span>
                    </motion.div>
                    <p className="italic text-base text-gray-600 leading-relaxed">
                      "{project.review}"
                    </p>
                    <div className="text-sm text-gray-500 mt-2 font-medium">
                      <span className="font-bold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between mt-6">
                    {project.private && (
                      <div className="text-sm text-gray-500 italic">
                        {t('projects.privateProject')}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  {project.image && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative group mt-6 h-48 overflow-hidden rounded-xl border border-gray-200">
                        <div className="absolute inset-0 bg-[#0077B5]/20 transition-opacity duration-300 group-hover:opacity-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </motion.a>
                  )}
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
        