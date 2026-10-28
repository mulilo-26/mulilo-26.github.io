export type NavItem = { label: string; to: string }

export const site = {
  name: 'Emmanuel Mulilo',
  role: 'Computer Science Student & Data Analyst',
  tagline:
    'I build things that work: local AI pipelines, database systems, and networks that hold up under load.',
  summary:
    'Computer Science student working across data analysis, software development, and database systems. I care about understanding a system before optimising it.',
  email: 'mulilo.zimba@gmail.com',
  cvPath: '/resume/emmanuel-mulilo-cv.pdf',
  cvAvailable: true,
  location: 'Copperbelt, Zambia',
  github: 'https://github.com/mulilo-26',
  linkedin: 'https://www.linkedin.com/in/emmanuel-mulilo-7b3078191/',
  url: 'https://mulilo-26.github.io',
}

export const nav: NavItem[] = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/#about' },
  { label: 'Résumé', to: '/resume' },
  { label: 'Contact', to: '/#contact' },
]

export const stats = [
  { value: '03', label: 'Projects' },
  { value: '2023', label: 'Studying since' },
  { value: '01', label: 'Reverted experiment' },
]

export const skills = [
  {
    label: 'Languages & core',
    items: ['C++', 'SQL (MySQL Workbench)'],
  },
  {
    label: 'AI & agentic workflows',
    items: [
      'Local RAG pipelines',
      'Ollama',
      'OpenCode',
      'Model Context Protocol',
      'Vector search',
    ],
  },
  {
    label: 'Systems & networking',
    items: [
      'Linux',
      'Windows',
      'OpenWrt',
      'SQM / CAKE',
      'Multi-router bridging',
    ],
  },
  {
    label: 'Developer tools',
    items: ['Git', 'GitHub', 'Office suite'],
  },
]

export const education = {
  school: 'The Copperbelt University',
  degree: 'BSc Computer Science',
  status: 'In progress',
  period: 'Nov 2023 – Present',
  location: 'Kitwe, Zambia',
}
