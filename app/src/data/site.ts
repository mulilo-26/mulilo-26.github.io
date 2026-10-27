export type NavItem = { label: string; to: string }

export const site = {
  name: 'Emmanuel Mulilo',
  role: 'Computer Science Student & Data Analyst',
  tagline:
    'I build things that work: local AI pipelines, database systems, and networks that hold up under load.',
  summary:
    'Computer Science student working across data analysis, software development, and database systems. I care about understanding a system before optimising it.',
  // Set this to your address to turn on the mailto contact form.
  email: null as string | null,
  cvPath: '/assets/resume/emmanuel-mulilo-cv.pdf',
  cvAvailable: false,
  location: null as string | null,
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
  { value: '04', label: 'Languages' },
  { value: '01', label: 'Reverted experiment' },
]

export const skills = [
  {
    label: 'Languages',
    items: ['C++', 'SQL / MySQL', 'Python', 'HTML / CSS / JavaScript'],
  },
  {
    label: 'Tools',
    items: ['MySQL Workbench', 'VS Code', 'Git & GitHub', 'Linux', 'Ollama'],
  },
  {
    label: 'Concepts',
    items: [
      'Data structures & algorithms',
      'Database design & normalisation',
      'Computer architecture',
      'Object-oriented programming',
      'Data analysis & visualisation',
    ],
  },
]

export const education = {
  degree: 'BSc Computer Science',
  status: 'In progress',
  focus: 'Data structures, algorithms, database systems',
}
