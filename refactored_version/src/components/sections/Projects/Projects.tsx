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
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16  bg-white rounded-lg shadow-lg">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A66C2] text-center mb-6">
          {t('projects.title')}
        </h2>
        <p className="text-gray-600 text-center mb-10">
          {t('projects.description')}
        </p>

        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-none w-[350px] bg-[white] rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  {/* Title and Links */}
                  <div className="flex justify-between items-start mb-3 ">
                    <h3 className="text-xl font-semibold text-[#0A66C2]">
                      {project.title}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0A66C2] hover:underline flex items-center gap-1"
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-[#E6F0F8] text-[#0A66C2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Rating and Review */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {renderStars(project.rating)}
                      <span className="text-gray-500 text-sm">({project.rating.toFixed(1)})</span>
                    </div>
                    <p className="italic text-sm text-gray-600">
                      "{project.review}"
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between mt-4">
                    {project.private && (
                      <div className="text-xs text-gray-500 italic">
                        {t('projects.privateProject')}
                      </div>
                    )}
                  </div>
                  {/* Image */}
                  {project.image && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative group mt-4 h-36 overflow-hidden rounded-lg border border-gray-300">
                        <div className="absolute inset-0 bg-[#0077B5]/30 transition-opacity group-hover:opacity-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auto Scroll Indicator */}
        <div className="flex justify-center mt-6 text-sm text-gray-500">
          {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
