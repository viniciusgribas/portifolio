import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Hero section
      'hero.greeting': 'Hi, I\'m Vinicius Guerra e Ribas',
      'hero.intro': 'I specialize in',
      'hero.specialties': [
        'Data Engineering',
        'Data Science',
        'Artificial Intelligence',
        'Software Engineering',
        'Software Development'
      ],
      'hero.stats': {
        'projects': {
          'number': '50+',
          'label': 'Projects and Data Pipelines'
        },
        'countries': {
          'number': '10+',
          'label': 'International Projects'
        },
        'experience': {
          'number': '5+',
          'label': 'Years in Engineering and Data'
        }
      },
      'hero.description': 'As a software and data engineer, I am dedicated to crafting innovative, ' +
                          'data-driven solutions that tackle complex challenges across various industries. ' +
                          'My expertise lies in developing scalable and efficient products that drive ' +
                          'organizational success.',
      
      // About section
      'about.title': 'About Me',
      'about.description': 'With a strong foundation in data engineering, data science, AI, and software development, ' +
                          'I create technology that empowers organizations and enhances lives. ' +
                          'My focus is on delivering scalable, efficient, and inclusive solutions tailored to diverse needs.',
      'about.description2': 'Currently, I am a software developer specializing in data and AI.' +
                          'I use best practices in Cloud Computing, DevSecOps, Software Architecture, Data Engineering, and Artificial Intelligence to create ' +
                          'robust and scalable solutions.',
      'about.description3': 'I am always seeking new challenges and opportunities to learn and grow, believing that collaboration and knowledge sharing are essential for success.',
      
      // Projects section
      'projects.title': 'Featured Projects',
      'projects.description': 'Take a look at some of my recent projects and client collaborations. Each project represents a unique challenge solved through innovative solutions.',
      'projects.privateProject': '(Private project - Source code and details protected by NDA)',
      'projects.nlpProject': 'Developed advanced text mining and NLP solutions for energy sector analysis, implementing web scraping and sentiment analysis on news and government data sources.',
      'projects.uspProject': 'Conducted comprehensive exploratory data analysis of the Brazilian electric generation system, creating interactive visualizations and spatial analysis using Python and advanced data visualization libraries.',
      'projects.aneelProject': 'Developed innovative data analysis solutions for the Brazilian Electricity Regulatory Agency (ANEEL), focusing on open data and energy sector visualization tools.',
      'projects.seniorPython': 'Led the development of data extraction systems and backend infrastructure, implementing efficient solutions for complex data processing requirements.',
      'projects.dataScientist': 'Developed ETL pipelines and machine learning models using AWS services, creating scalable data processing solutions.',
      'projects.ibgeData': 'Created data processing pipelines for Brazilian government statistical data, ensuring accurate and efficient data transformation.',
      'projects.electricityMaps': 'Developed visualization tools for electricity distribution networks, creating interactive maps and data analysis systems.',
      'projects.autoScroll': 'Auto-scrolling • Hover to pause',
      'projects.hoverPause': 'Paused • Move mouse away to continue',
      'projects.viewProject': 'View Project',
      
      // Contact section
      'contact.title': 'Get in Touch',
      'contact.description': 'I enjoy connecting with like-minded professionals and solving complex problems. ' +
                            'Feel free to reach out if you have any questions or want to collaborate ' +
                            'on exciting projects!',
      'contact.button': 'Say Hello',
    },
  },
  pt: {
    translation: {
      // Hero section
      'hero.greeting': 'Olá, me chamo Vinicius Guerra e Ribas',
      'hero.intro': 'Especialista em',
      'hero.specialties': [
        'Engenharia de Dados',
        'Ciência de Dados',
        'Inteligência Artificial', 
        'Engenharia de Software',
        'Desenvolvimento de Software'
      ],
      'hero.stats': {
        'projects': {
          'number': '50+',
          'label': 'Projetos e Pipelines de Dados'
        },
        'countries': {
          'number': '10+',
          'label': 'Projetos Internacionais'
        },
        'experience': {
          'number': '5+',
          'label': 'Anos em Engenharia e Dados'
        }
      },
      'hero.description': 'Como engenheiro de software e dados, dedico-me a criar soluções inovadoras e orientadas por dados ' +
                          'que enfrentam desafios complexos em diversos setores. Minha especialidade está em desenvolver ' +
                          'produtos escaláveis e eficientes que impulsionam o sucesso organizacional.',
      
      // About section
      'about.title': 'Sobre Mim',
      'about.description': 'Com uma base sólida em engenharia de dados, ciência de dados, IA e desenvolvimento de software, ' +
                          'crio tecnologias que capacitam organizações e melhoram vidas. ' +
                          'Meu foco está em entregar soluções escaláveis, eficientes e inclusivas, adaptadas a diversas necessidades.',
      'about.description2': 'Atualmente, sou desenvolvedor de software especialista em dados e IA.' +
                          'Utilizo das melhores práticas de Cloud Computing, DevSecOps,' +
                          'Arquitetura de Software, Engenharia de dados e Inteligência Artificial para criar ' +
                          'soluções robustas e escaláveis.',
      'about.description3': 'Estou sempre em busca de novos desafios e oportunidades para aprender e crescer, ' +
                            'acreditando que a colaboração e a troca de conhecimentos são fundamentais para o sucesso.',
      
      // Projects section
      'projects.title': 'Projetos em Destaque',
      'projects.description': 'Conheça alguns dos meus projetos recentes e colaborações com clientes. Cada projeto representa um desafio único resolvido através de soluções inovadoras.',
      'projects.privateProject': '(Projeto privado - Código fonte e detalhes protegidos por NDA)',
      'projects.nlpProject': 'Desenvolveu soluções avançadas de mineração de texto e processamento de linguagem natural para análise do setor energético, implementando raspagem de web e análise de sentimento em fontes de dados de notícias e governos.',
      'projects.uspProject': 'Conduziu análise exploratória de dados abrangente do sistema elétrico brasileiro, criando visualizações interativas e análise espacial usando Python e bibliotecas avançadas de visualização de dados.',
      'projects.aneelProject': 'Desenvolveu soluções de análise de dados inovadoras para a Agência Reguladora de Energia Elétrica Brasileira (ANEEL), focando em dados abertos e ferramentas de visualização para o setor energético.',
      'projects.seniorPython': 'Liderou o desenvolvimento de sistemas de extração de dados e infraestrutura backend, implementando soluções eficientes para requisitos complexos de processamento de dados.',
      'projects.dataScientist': 'Desenvolveu pipelines ETL e modelos de machine learning usando serviços AWS, criando soluções escaláveis de processamento de dados.',
      'projects.ibgeData': 'Criou pipelines de processamento de dados estatísticos do governo brasileiro, garantindo transformação precisa e eficiente dos dados.',
      'projects.electricityMaps': 'Desenvolveu ferramentas de visualização para redes de distribuição de energia elétrica, criando mapas interativos e sistemas de análise de dados.',
      'projects.autoScroll': 'Rolagem automática • Passe o mouse para pausar',
      'projects.hoverPause': 'Pausado • Retire o mouse para continuar',
      'projects.viewProject': 'Ver Projeto',
      
      // Contact section
      'contact.title': 'Entre em Contato',
      'contact.description': 'Adoro me conectar com profissionais que compartilham da mesma visão e resolver problemas complexos. ' +
                            'Sinta-se à vontade para entrar em contato se tiver alguma dúvida ou quiser colaborar ' +
                            'em projetos interessantes!',
      'contact.button': 'Diga Olá',
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n 