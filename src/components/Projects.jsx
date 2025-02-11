/**
 * Projects Component
 * Displays a horizontal carousel of project cards with descriptions and links
 * Uses Framer Motion for animations and intersection observer for scroll-based animations
 */

import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'

// Projects data with client reviews
const projects = [
  {
    title: 'Energy Sector Text Mining & NLP Analysis',
    description: 'projects.nlpProject',
    tech: ['Python', 'NLP', 'Machine Learning', 'Web Scraping', 'Plotly', 'Sentiment Analysis'],
    rating: 5.00,
    review: {
      en: "In order to apply Text Mining, Sentiment Analysis, NLP, Machine Learning, Crawlers, and Web Scraping knowledge, data solutions were developed with topics relevant to the energy sector. These solutions scrape data from CNN Brazil websites (with a focus on the international energy scenario) and government agency websites such as ANP, ANEEL, and MME (with a focus on the national energy scenario). Once scraped, the data is manipulated and added to a dataframe, and finally presented via Plotly and Wordcloud, as shown in the figures below.",
      pt: "Com o objetivo de aplicar conhecimentos em Text Mining, Análise de Sentimentos, PLN, Machine Learning, Crawlers e Web Scraping, foram desenvolvidas soluções de dados com tópicos relevantes para o setor energético. Essas soluções extraem dados dos sites da CNN Brasil (com foco no cenário energético internacional) e sites de agências governamentais como ANP, ANEEL e MME (com foco no cenário energético nacional). Uma vez extraídos, os dados são manipulados e adicionados a um dataframe, e finalmente apresentados via Plotly e Wordcloud, como mostrado nas figuras abaixo."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'October, 2022',
    image: '/assets/cloud_view.png',
    url: 'https://www.upwork.com/freelancers/~01705d8c35f170c499?p=1636913026235174912'
  },
  {
    title: 'Brazilian Electric Generation System Analysis',
    description: 'projects.uspProject',
    tech: ['Python', 'Data Analysis', 'Plotly', 'GeoDataFrame', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "The project consists of an exploratory data analysis. The objective of this analysis is to visualize the Brazilian electric generation system in a diagrammatic and spatial way, extracting insights. For this, a dataframe of the GeoDataFrame type was used and, mainly, the power of the Plotly Express library optimized for the Python language.",
      pt: "O projeto consiste em uma análise exploratória de dados. O objetivo desta análise é visualizar o sistema de geração elétrica brasileiro de forma diagramática e espacial, extraindo insights. Para isso, foi utilizado um dataframe do tipo GeoDataFrame e, principalmente, o poder da biblioteca Plotly Express otimizada para a linguagem Python."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'January, 2023',
    image: '/assets/bar_charts_1.png',
    url: 'https://www.upwork.com/freelancers/viniciusg?p=1636904767317643264'
  },
  {
    title: 'ANEEL Data Engineering Project',
    description: 'projects.aneelProject',
    tech: ['Python', 'Data Engineering', 'Streamlit', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "With great satisfaction, I recommend Vinicius Guerra e Ribas. During his engineering graduation, he stood out in his internship at ANEEL and later completed a postgraduate degree in data science, evidenced by a notable course completion work that used ANEEL data in an innovative way. Additionally, his significant contributions to improving ANEEL's open data reflect his commitment.",
      pt: "Com grande satisfação, recomendo Vinicius Guerra e Ribas. Durante sua graduação em engenharia, destacou-se em seu estágio na ANEEL e, posteriormente, concluiu uma pós-graduação em ciência de dados, evidenciada por um notável trabalho de conclusão de curso que utilizou dados da ANEEL de maneira inovadora. Além disso, suas contribuições significativas para aprimorar os dados abertos da ANEEL refletem seu comprometimento."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'December 1, 2023',
    image: '/assets/aneel_project.png',
    url: 'https://vinici-analise-geracao-iipydashboard-geracao-brasil-app-1w9whk.streamlit.app/'
  },
  {
    title: 'Senior Python Developer - Data Extraction',
    description: 'projects.seniorPython',
    tech: ['Python', 'AWS', 'Data Engineering', 'Backend'],
    rating: 5.00,
    review: {
      en: "Everything went great, I can sincerely recommend Vinicius!",
      pt: "Tudo foi ótimo, posso sinceramente recomendar o Vinicius!"
    },
    source: 'Upwork',
    date: 'Apr 14, 2024 - May 30, 2024',
    private: true
  },
  {
    title: 'Data Scientists/Engineers ETL Project',
    description: 'projects.dataScientist',
    tech: ['ETL', 'ML', 'Python', 'AWS'],
    rating: 5.00,
    review: {
      en: "Vinicius did a great job on ETL and ML tasks using Amazon Web Services (AWS) capabilities. We'd be happy to work with this freelancer again.",
      pt: "Vinicius fez um ótimo trabalho nas tarefas de ETL e ML usando as capacidades da Amazon Web Services (AWS). Estamos felizes em trabalhar com este freelancer novamente."
    },
    source: 'Upwork',
    date: 'Jun 14, 2023 - Jun 26, 2023',
    private: true
  },
  {
    title: 'IBGE Data Project',
    description: 'projects.ibgeData',
    tech: ['Python', 'Data Engineering', 'ETL'],
    rating: 5.00,
    review: {
      en: "The work was done with professionalism and on schedule.",
      pt: "O trabalho foi realizado com profissionalismo e dentro do prazo."
    },
    source: 'Workana',
    date: 'Mar 17, 2023 - Apr 24, 2023',
    private: true
  },
  {
    title: 'Electricity Distribution Network Maps',
    description: 'projects.electricityMaps',
    tech: ['Python', 'GIS', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "Vinicius's work was amazing. Very complete and based on reliable sources of information, managing to finish the work with an impressive speed and great quality.",
      pt: "O trabalho do Vinicius foi incrível. Muito completo e baseado em fontes confiáveis de informação, conseguindo finalizar o trabalho com uma velocidade impressionante e ótima qualidade."
    },
    source: 'Upwork',
    date: 'Nov 13, 2022 - Nov 15, 2022',
    image: '/assets/south_america_map.jpeg',
    url: 'https://www.upwork.com/freelancers/viniciusg?p=1636909561297944576', // Adicionada a URL
  }
]

const Projects = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef(null)
  
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`inline ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  // Animation for continuous scrolling
  useEffect(() => {
    if (!isHovered && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      
      if (scrollWidth > clientWidth) {
        const scroll = () => {
          if (!isHovered && carouselRef.current) {
            carouselRef.current.scrollLeft += 1
            if (
              carouselRef.current.scrollLeft >=
              scrollWidth - clientWidth
            ) {
              carouselRef.current.scrollLeft = 0
            }
          }
        }

        const intervalId = setInterval(scroll, 20)
        return () => clearInterval(intervalId)
      }
    }
  }, [isHovered])

  return (
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Section header */}
        <h2 className="text-4xl font-bold text-center mb-4">
          {t('projects.title')}
        </h2>
        <p className="text-textSecondary text-center mb-12">
          {t('projects.description')}
        </p>

        {/* Projects carousel */}
        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                className="flex-none w-[400px] bg-secondary/5 rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Project details */}
                <div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-textSecondary mb-3 text-sm">{t(project.description)}</p>
                  
                  {/* Technologies used */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-secondary text-xs font-mono px-2 py-1 rounded-full bg-secondary/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Client Review */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(project.rating)}
                      <span className="text-textSecondary text-sm">({project.rating.toFixed(2)})</span>
                    </div>
                    <p className="text-textSecondary italic text-sm">
                      "{currentLanguage === 'pt' ? project.review.pt : project.review.en}"
                    </p>
                    <div className="mt-2 text-xs text-textSecondary">
                      <span className="font-semibold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Project status and link */}
                  <div className="flex items-center justify-between mt-2">
                    {project.private && (
                      <div className="text-xs text-textSecondary">
                        {t('projects.privateProject')}
                      </div>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Project image if available */}
                  {project.image && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative group mt-4 h-32 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-secondary/20 transition-opacity group-hover:opacity-0" />
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

        {/* Scroll indicators */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="text-sm text-textSecondary">
            {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Projects 