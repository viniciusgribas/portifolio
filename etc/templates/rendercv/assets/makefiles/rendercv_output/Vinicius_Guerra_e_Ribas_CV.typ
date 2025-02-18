
#import "@preview/fontawesome:0.5.0": fa-icon

#let name = "Vinicius Guerra e Ribas"
#let locale-catalog-page-numbering-style = context { "Vinicius Guerra e Ribas - Page " + str(here().page()) + " of " + str(counter(page).final().first()) + "" }
#let locale-catalog-last-updated-date-style = "Last updated in Feb 2025"
#let locale-catalog-language = "en"
#let design-page-size = "us-letter"
#let design-section-titles-font-size = 1.4em
#let design-colors-text = rgb(0, 0, 0)
#let design-colors-section-titles = rgb(0, 79, 144)
#let design-colors-last-updated-date-and-page-numbering = rgb(128, 128, 128)
#let design-colors-name = rgb(0, 79, 144)
#let design-colors-connections = rgb(0, 79, 144)
#let design-colors-links = rgb(0, 79, 144)
#let design-section-titles-font-family = "Source Sans 3"
#let design-section-titles-bold = true
#let design-section-titles-line-thickness = 0.5pt
#let design-section-titles-font-size = 1.4em
#let design-section-titles-type = "with-parial-line"
#let design-section-titles-vertical-space-above = 0.5cm
#let design-section-titles-vertical-space-below = 0.3cm
#let design-section-titles-small-caps = false
#let design-links-use-external-link-icon = true
#let design-text-font-size = 10pt
#let design-text-leading = 0.6em
#let design-text-font-family = "Source Sans 3"
#let design-text-alignment = "justified"
#let design-text-date-and-location-column-alignment = right
#let design-header-photo-width = 3.5cm
#let design-header-use-icons-for-connections = true
#let design-header-name-font-family = "Source Sans 3"
#let design-header-name-font-size = 30pt
#let design-header-name-bold = true
#let design-header-connections-font-family = "Source Sans 3"
#let design-header-vertical-space-between-name-and-connections = 0.7cm
#let design-header-vertical-space-between-connections-and-first-section = 0.7cm
#let design-header-use-icons-for-connections = true
#let design-header-horizontal-space-between-connections = 0.5cm
#let design-header-separator-between-connections = ""
#let design-header-alignment = center
#let design-highlights-summary-left-margin = 0cm
#let design-highlights-bullet = "•"
#let design-highlights-top-margin = 0.25cm
#let design-highlights-left-margin = 0.4cm
#let design-highlights-vertical-space-between-highlights = 0.25cm
#let design-highlights-horizontal-space-between-bullet-and-highlights = 0.5em
#let design-entries-vertical-space-between-entries = 1.2em
#let design-entries-date-and-location-width = 4.15cm
#let design-entries-allow-page-break-in-entries = true
#let design-entries-horizontal-space-between-columns = 0.1cm
#let design-entries-left-and-right-margin = 0.2cm
#let design-page-top-margin = 2cm
#let design-page-bottom-margin = 2cm
#let design-page-left-margin = 2cm
#let design-page-right-margin = 2cm
#let design-page-show-last-updated-date = true
#let design-page-show-page-numbering = true
#let design-links-underline = false
#let design-entry-types-education-entry-degree-column-width = 1cm
#let date = datetime.today()

// Metadata:
#set document(author: name, title: name + "'s CV", date: date)

// Page settings:
#set page(
  margin: (
    top: design-page-top-margin,
    bottom: design-page-bottom-margin,
    left: design-page-left-margin,
    right: design-page-right-margin,
  ),
  paper: design-page-size,
  footer: if design-page-show-page-numbering {
    text(
      fill: design-colors-last-updated-date-and-page-numbering,
      align(center, [_#locale-catalog-page-numbering-style _]),
      size: 0.9em,
    )
  } else {
    none
  },
  footer-descent: 0% - 0.3em + design-page-bottom-margin / 2,
)
// Text settings:
#let justify
#let hyphenate
#if design-text-alignment == "justified" {
  justify = true
  hyphenate = true
} else if design-text-alignment == "left" {
  justify = false
  hyphenate = false
} else if design-text-alignment == "justified-with-no-hyphenation" {
  justify = true
  hyphenate = false
}
#set text(
  font: design-text-font-family,
  size: design-text-font-size,
  lang: locale-catalog-language,
  hyphenate: hyphenate,
  fill: design-colors-text,
  // Disable ligatures for better ATS compatibility:
  ligatures: true,
)
#set par(
  spacing: 0pt,
  leading: design-text-leading,
  justify: justify,
)
#set enum(
  spacing: design-entries-vertical-space-between-entries,
)

// Highlights settings:
#let highlights(..content) = {
  list(
    ..content,
    marker: design-highlights-bullet,
    spacing: design-highlights-vertical-space-between-highlights,
    indent: design-highlights-left-margin,
    body-indent: design-highlights-horizontal-space-between-bullet-and-highlights,
  )
}
#show list: set list(
  marker: design-highlights-bullet,
  spacing: 0pt,
  indent: 0pt,
  body-indent: design-highlights-horizontal-space-between-bullet-and-highlights,
)

// Entry utilities:
#let three-col(
  left-column-width: 1fr,
  middle-column-width: 1fr,
  right-column-width: design-entries-date-and-location-width,
  left-content: "",
  middle-content: "",
  right-content: "",
  alignments: (auto, auto, auto),
) = [
  #block(
    grid(
      columns: (left-column-width, middle-column-width, right-column-width),
      column-gutter: design-entries-horizontal-space-between-columns,
      align: alignments,
      ([#set par(spacing: design-text-leading); #left-content]),
      ([#set par(spacing: design-text-leading); #middle-content]),
      ([#set par(spacing: design-text-leading); #right-content]),
    ),
    breakable: true,
    width: 100%,
  )
]

#let two-col(
  left-column-width: 1fr,
  right-column-width: design-entries-date-and-location-width,
  left-content: "",
  right-content: "",
  alignments: (auto, auto),
  column-gutter: design-entries-horizontal-space-between-columns,
) = [
  #block(
    grid(
      columns: (left-column-width, right-column-width),
      column-gutter: column-gutter,
      align: alignments,
      ([#set par(spacing: design-text-leading); #left-content]),
      ([#set par(spacing: design-text-leading); #right-content]),
    ),
    breakable: true,
    width: 100%,
  )
]

// Main heading settings:
#let header-font-weight
#if design-header-name-bold {
  header-font-weight = 700
} else {
  header-font-weight = 400
}
#show heading.where(level: 1): it => [
  #set par(spacing: 0pt)
  #set align(design-header-alignment)
  #set text(
    font: design-header-name-font-family,
    weight: header-font-weight,
    size: design-header-name-font-size,
    fill: design-colors-name,
  )
  #it.body
  // Vertical space after the name
  #v(design-header-vertical-space-between-name-and-connections)
]

#let section-title-font-weight
#if design-section-titles-bold {
  section-title-font-weight = 700
} else {
  section-title-font-weight = 400
}

#show heading.where(level: 2): it => [
  #set align(left)
  #set text(size: (1em / 1.2)) // reset
  #set text(
    font: design-section-titles-font-family,
    size: (design-section-titles-font-size),
    weight: section-title-font-weight,
    fill: design-colors-section-titles,
  )
  #let section-title = (
    if design-section-titles-small-caps [
      #smallcaps(it.body)
    ] else [
      #it.body
    ]
  )
  // Vertical space above the section title
  #v(design-section-titles-vertical-space-above, weak: true)
  #block(
    breakable: false,
    width: 100%,
    [
      #if design-section-titles-type == "moderncv" [
        #two-col(
          alignments: (right, left),
          left-column-width: design-entries-date-and-location-width,
          right-column-width: 1fr,
          left-content: [
            #align(horizon, box(width: 1fr, height: design-section-titles-line-thickness, fill: design-colors-section-titles))
          ],
          right-content: [
            #section-title
          ]
        )

      ] else [
        #box(
          [
            #section-title
            #if design-section-titles-type == "with-parial-line" [
              #box(width: 1fr, height: design-section-titles-line-thickness, fill: design-colors-section-titles)
            ] else if design-section-titles-type == "with-full-line" [

              #v(design-text-font-size * 0.4)
              #box(width: 1fr, height: design-section-titles-line-thickness, fill: design-colors-section-titles)
            ]
          ]
        )
      ]
     ] + v(1em),
  )
  #v(-1em)
  // Vertical space after the section title
  #v(design-section-titles-vertical-space-below - 0.5em)
]

// Links:
#let original-link = link
#let link(url, body) = {
  body = [#if design-links-underline [#underline(body)] else [#body]]
  body = [#if design-links-use-external-link-icon [#body#h(design-text-font-size/4)#box(
        fa-icon("external-link", size: 0.7em),
        baseline: -10%,
      )] else [#body]]
  body = [#set text(fill: design-colors-links);#body]
  original-link(url, body)
}

// Last updated date text:
#if design-page-show-last-updated-date {
  let dx
  if design-section-titles-type == "moderncv" {
    dx = 0cm
  } else {
    dx = -design-entries-left-and-right-margin
  }
  place(
    top + right,
    dy: -design-page-top-margin / 2,
    dx: dx,
    text(
      [_#locale-catalog-last-updated-date-style _],
      fill: design-colors-last-updated-date-and-page-numbering,
      size: 0.9em,
    ),
  )
}

#let connections(connections-list) = context {
  set text(fill: design-colors-connections, font: design-header-connections-font-family)
  set par(leading: design-text-leading*1.7, justify: false)
  let list-of-connections = ()
  let separator = (
    h(design-header-horizontal-space-between-connections / 2, weak: true)
      + design-header-separator-between-connections
      + h(design-header-horizontal-space-between-connections / 2, weak: true)
  )
  let starting-index = 0
  while (starting-index < connections-list.len()) {
    let left-sum-right-margin
    if type(page.margin) == "dictionary" {
      left-sum-right-margin = page.margin.left + page.margin.right
    } else {
      left-sum-right-margin = page.margin * 4
    }

    let ending-index = starting-index + 1
    while (
      measure(connections-list.slice(starting-index, ending-index).join(separator)).width
        < page.width - left-sum-right-margin
    ) {
      ending-index = ending-index + 1
      if ending-index > connections-list.len() {
        break
      }
    }
    if ending-index > connections-list.len() {
      ending-index = connections-list.len()
    }
    list-of-connections.push(connections-list.slice(starting-index, ending-index).join(separator))
    starting-index = ending-index
  }
  align(list-of-connections.join(linebreak()), design-header-alignment)
  v(design-header-vertical-space-between-connections-and-first-section - design-section-titles-vertical-space-above)
}

#let three-col-entry(
  left-column-width: 1fr,
  right-column-width: design-entries-date-and-location-width,
  left-content: "",
  middle-content: "",
  right-content: "",
  alignments: (left, auto, right),
) = (
  if design-section-titles-type == "moderncv" [
    #three-col(
      left-column-width: right-column-width,
      middle-column-width: left-column-width,
      right-column-width: 1fr,
      left-content: right-content,
      middle-content: [
        #block(
          [
            #left-content
          ],
          inset: (
            left: design-entries-left-and-right-margin,
            right: design-entries-left-and-right-margin,
          ),
          breakable: design-entries-allow-page-break-in-entries,
          width: 100%,
        )
      ],
      right-content: middle-content,
      alignments: (design-text-date-and-location-column-alignment, left, auto),
    )
  ] else [
    #block(
      [
        #three-col(
          left-column-width: left-column-width,
          right-column-width: right-column-width,
          left-content: left-content,
          middle-content: middle-content,
          right-content: right-content,
          alignments: alignments,
        )
      ],
      inset: (
        left: design-entries-left-and-right-margin,
        right: design-entries-left-and-right-margin,
      ),
      breakable: design-entries-allow-page-break-in-entries,
      width: 100%,
    )
  ]
)

#let two-col-entry(
  left-column-width: 1fr,
  right-column-width: design-entries-date-and-location-width,
  left-content: "",
  right-content: "",
  alignments: (auto, design-text-date-and-location-column-alignment),
  column-gutter: design-entries-horizontal-space-between-columns,
) = (
  if design-section-titles-type == "moderncv" [
    #two-col(
      left-column-width: right-column-width,
      right-column-width: left-column-width,
      left-content: right-content,
      right-content: [
        #block(
          [
            #left-content
          ],
          inset: (
            left: design-entries-left-and-right-margin,
            right: design-entries-left-and-right-margin,
          ),
          breakable: design-entries-allow-page-break-in-entries,
          width: 100%,
        )
      ],
      alignments: (design-text-date-and-location-column-alignment, auto),
    )
  ] else [
    #block(
      [
        #two-col(
          left-column-width: left-column-width,
          right-column-width: right-column-width,
          left-content: left-content,
          right-content: right-content,
          alignments: alignments,
        )
      ],
      inset: (
        left: design-entries-left-and-right-margin,
        right: design-entries-left-and-right-margin,
      ),
      breakable: design-entries-allow-page-break-in-entries,
      width: 100%,
    )
  ]
)

#let one-col-entry(content: "") = [
  #let left-space = design-entries-left-and-right-margin
  #if design-section-titles-type == "moderncv" [
    #(left-space = left-space + design-entries-date-and-location-width + design-entries-horizontal-space-between-columns)
  ]
  #block(
    [#set par(spacing: design-text-leading); #content],
    breakable: design-entries-allow-page-break-in-entries,
    inset: (
      left: left-space,
      right: design-entries-left-and-right-margin,
    ),
    width: 100%,
  )
]

= Vinicius Guerra e Ribas

// Print connections:
#let connections-list = (
  [#fa-icon("location-dot", size: 0.9em) #h(0.05cm)Rio de Janeiro - RJ, Brazil],
  [#box(original-link("mailto:viniciusgribas@gmail.com")[#fa-icon("envelope", size: 0.9em) #h(0.05cm)viniciusgribas\@gmail.com])],
  [#box(original-link("tel:+55-61-98165-7050")[#fa-icon("phone", size: 0.9em) #h(0.05cm)\(61\) 98165-7050])],
  [#box(original-link("https://viniciusgribas.netlify.app/")[#fa-icon("link", size: 0.9em) #h(0.05cm)viniciusgribas.netlify.app])],
  [#box(original-link("https://linkedin.com/in/vinicius-guerra-e-ribas")[#fa-icon("linkedin", size: 0.9em) #h(0.05cm)vinicius-guerra-e-ribas])],
  [#box(original-link("https://github.com/viniciusgribas")[#fa-icon("github", size: 0.9em) #h(0.05cm)viniciusgribas])],
)
#connections(connections-list)



== Summary


#one-col-entry(
  content: [Senior Data & Software Engineering professional with 5+ years of experience architecting and implementing scalable data solutions. Proven track record in leading complex projects for government agencies and Fortune 500 companies. Specialized in cloud-native architectures, machine learning operations, and enterprise data platforms.]
)


== Education


// YES DATE, YES DEGREE
#three-col-entry(
  left-column-width: 1cm,
  left-content: [#strong[MBA]],
  middle-content: [
    #strong[Universidade de São Paulo], Software Engineering
  ],
  right-content: [
    Apr 2024 – Jan 2026
  ],
)
#block(
  [
    #set par(spacing: 0pt)
    #v(design-highlights-top-margin);#highlights([100\% scholarship for additional specializations at Coursera],[#strong[Coursework:] Full Stack Development, Data and Business, Software Development, Management, and Cloud],)
  ],
  inset: (
    left: design-entry-types-education-entry-degree-column-width + design-entries-horizontal-space-between-columns + design-entries-left-and-right-margin,
    right: design-entries-left-and-right-margin,
  ),
)

#v(design-entries-vertical-space-between-entries)
// YES DATE, YES DEGREE
#three-col-entry(
  left-column-width: 1cm,
  left-content: [#strong[MBA]],
  middle-content: [
    #strong[Universidade de São Paulo], Data Science and Analytics
  ],
  right-content: [
    May 2021 – Jan 2023
  ],
)
#block(
  [
    #set par(spacing: 0pt)
    #v(design-highlights-top-margin);#highlights([Evaluated with the highest grade in the topics: Research Project, Results, Final Exams, and Thesis Defense],[#strong[Coursework:] Statistics, Supervised and Unsupervised Machine Learning Models, Trends in Data Science and Analytics, Big Data in the Business Environment],)
  ],
  inset: (
    left: design-entry-types-education-entry-degree-column-width + design-entries-horizontal-space-between-columns + design-entries-left-and-right-margin,
    right: design-entries-left-and-right-margin,
  ),
)

#v(design-entries-vertical-space-between-entries)
// YES DATE, YES DEGREE
#three-col-entry(
  left-column-width: 1cm,
  left-content: [#strong[BSc]],
  middle-content: [
    #strong[Universidade de Brasília], Energy Engineering
  ],
  right-content: [
    Jan 2014 – May 2021
  ],
)
#block(
  [
    #set par(spacing: 0pt)
    #v(design-highlights-top-margin);#highlights([Final thesis approved with top marks by the University of Brasília, used in voluntary data science work to combat COVID-19 in Brazil.],[#strong[Coursework:] Renewable Energy, Technology, Innovation, Sustainability, and Energy Systems Engineering],)
  ],
  inset: (
    left: design-entry-types-education-entry-degree-column-width + design-entries-horizontal-space-between-columns + design-entries-left-and-right-margin,
    right: design-entries-left-and-right-margin,
  ),
)



== Work Experience


#two-col-entry(
  left-content: [
    #strong[Raizen Energia S.A.], Data Engineer, Analytics Engineering
    #v(-design-text-leading)

    #v(design-highlights-top-margin);#highlights([Gathered business requirements from various departments \(Power, Finance, Logistics, Software, and IT\) and developed a cloud solution to democratize and enhance data accessibility within the company.],[Developed data quality solutions by monitoring completeness and integrity parameters, implementing sanitation rules, and enriching SSOT databases within a Data Lake House architecture.],[Corrected over 38,000 active customer accounts, enabling the implementation of marketing rules for billing and new sign-ups.],)
  ],
  right-content: [
    SP, Brazil \(Remote\)

Aug 2023 – present
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Raizen Energia S.A.], Data Engineer, ETL Pipelines Development
    #v(-design-text-leading)

    #v(design-highlights-top-margin);#highlights([Collected business requirements from various departments \(Power, Finance, Logistics, Software, and IT\) and developed cloud solutions to democratize and enhance data accessibility within the company.],[Developed a data solution that extracted information from all consumers in Brazil, and enriched the data using a Google API and a Machine Learning algorithm, enabling the identification of high-scoring leads.],[Architected, implemented, orchestrated, and monitored over 20 data pipelines, integrating sources such as business SharePoint, external APIs, dashboards, SQL databases, NoSQL databases, and data lakes.],)
  ],
  right-content: [
    SP, Brazil \(Remote\)

June 2022 – Aug 2023
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Energisa S.A.], Business Intelligence Analyst
    #v(-design-text-leading)

    #v(design-highlights-top-margin);#highlights([Developed algorithms to iterate with analyses in Excel, enhancing data warehousing and analytics capabilities.],[Employed data visualization tools for strategic market analysis and data-driven decision-making.],[Automated data extraction and transformation processes, reducing manual work by 75\%.],)
  ],
  right-content: [
    MS, Brazil \(Hybrid\)

Mar 2021 – June 2022
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Brazilian Electricity Regulatory Agency \(ANEEL\)], Data Scientist, Intern
    #v(-design-text-leading)

    #v(design-highlights-top-margin);#highlights([Demonstrated exceptional time management in data projects and ensured data security in compliance with governance standards.],[Played a pivotal role in assisting the Brazilian government in developing a comprehensive database of all energy customers in Brazil.],[Received formal recognition from the Brazilian government for outstanding work in the data science field.],)
  ],
  right-content: [
    DF, Brazil \(On-site\)

Jan 2019 – Mar 2021
  ],
)



== Awards


#two-col-entry(
  left-content: [
    #strong[Santander Open Academy Scholarship]
  ],
  right-content: [
    2024
  ],
)
#one-col-entry(
  content: [
    #v(design-highlights-top-margin);#highlights([Won a full scholarship to a software development school focused on Front-End, Backend, DevOps, Data Engineering, and Data Science.],)
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Upwork Top Rated Freelancer with 100\% Job Success and 5-Star Rating]
  ],
  right-content: [
    2022 – present
  ],
)
#one-col-entry(
  content: [
    #v(design-highlights-top-margin);#highlights([Achieved a 100\% job success rate and a 5-star rating on Upwork, with over 100\% project completion.],)
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Raizen Energia S.A. Exceptional Performance Recognition]
  ],
  right-content: [
    2023
  ],
)
#one-col-entry(
  content: [
    #v(design-highlights-top-margin);#highlights([Recognized for exceptional performance in culture, results-oriented work, and teamwork.],)
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Universidade de São Paulo Top Grade Recognition]
  ],
  right-content: [
    2023
  ],
)
#one-col-entry(
  content: [
    #v(design-highlights-top-margin);#highlights([Evaluated with the highest grade in the topics: Research Project, Results, Final Exams, and Thesis Defense.],)
  ],
)

#v(design-entries-vertical-space-between-entries)
#two-col-entry(
  left-content: [
    #strong[Brazilian Electricity Regulatory Agency \(ANEEL\) Recommendation Letter]
  ],
  right-content: [
    2021
  ],
)
#one-col-entry(
  content: [
    #v(design-highlights-top-margin);#highlights([Received formal recognition from the Brazilian government for outstanding work in the data science field.],)
  ],
)



== Certificates and Volunteering



#one-col-entry(
  content: [
    #strong[Certificates]

    #v(-design-text-leading)
    #v(design-highlights-top-margin);#highlights([Prompt Engineering for Developers Certificate - DeepLearning.AI],[Customer-Centric IT Strategy Certificate - University of Virginia],[Microsoft Azure for Data Engineers Certificate - Microsoft],)
  ],
)

#v(design-entries-vertical-space-between-entries)

#one-col-entry(
  content: [
    #strong[Volunteering]

    #v(-design-text-leading)
    #v(design-highlights-top-margin);#highlights([Litter-of-Light \(ONG\) Technology Volunteer for low-income communities in Brazil],[COVID-19 Data Science Volunteer for the Brazilian government],)
  ],
)



== Skills


#one-col-entry(
  content: [#strong[Data Engineering:] Spark, SQL, Big Data, ETL, API, Python]
)
#v(design-entries-vertical-space-between-entries)
#one-col-entry(
  content: [#strong[Data Science and Analytics:] Machine Learning, Prompt Engineering, Data Mining, Business Intelligence, Statistics, Data Visualization, R]
)
#v(design-entries-vertical-space-between-entries)
#one-col-entry(
  content: [#strong[Software Development and IT Operations \(DevOps\):] System Design, CI\/CD, Cloud Computing, Containers, Kubernetes, Monitoring, Data Governance]
)
#v(design-entries-vertical-space-between-entries)
#one-col-entry(
  content: [#strong[Soft Skills:] Leadership, Communication, Problem-Solving, Teamwork, Customer Focus, Adaptability, Decision-Making, Time Management, Strategic Thinking]
)


