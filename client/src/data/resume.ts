export const profile = {
  name: 'Priyanshu Rai',
  osName: 'PriyanshuOS',
  title: 'Backend Software Engineer',
  role: 'Software Development Engineer',
  company: 'Park+',
  period: 'Mar 2025 — Present',
  education: 'MANIT Bhopal',
  location: 'India',
  email: 'ppprai1712@gmail.com',
  phone: '+91 8103723400',
  github: 'https://github.com/prrai1712',
  githubUsername: 'prrai1712',
  linkedin: 'https://www.linkedin.com/in/prrai1712/',
  cvUrl: '/Priyanshu_Rai_Resume.pdf',
  cvFileName: 'Priyanshu_Rai_Resume.pdf',
  pitch:
    'I build and run production backend systems in Python — APIs, background jobs, data pipelines, and tools that keep large databases correct and fast.',
  summary:
    'Backend engineer with hands-on experience in Django, Celery, Redis, and Kafka. I work on database migrations, data validation at scale, ingestion pipelines, scraping systems, and production monitoring.',
}

export const roles = [
  'Backend Software Engineer',
  'Python · Django · Kafka',
  'Production Systems at Park+',
  'Data Validation & Migrations',
]

/** Short highlights visitors see first — plain language, all from resume */
export const careerHighlights = [
  {
    label: 'Rows validated (DVT)',
    value: '35M+',
    detail: 'GCP → Linode migration checks',
  },
  {
    label: 'Manual work reduced',
    value: '90%+',
    detail: 'Automated audit pipelines',
  },
  {
    label: 'Bulk data processed',
    value: '25L+',
    detail: 'CSV & batch pipelines',
  },
  {
    label: 'Personal projects',
    value: '2',
    detail: 'TradingBuddy & TrackIt',
  },
]

export const whatIDo = [
  {
    title: 'Backend APIs & jobs',
    description: 'Django services with Celery, Redis, and Kafka — challan checks, documents, retries, webhooks.',
    stack: 'Django · Celery · Redis · Kafka',
  },
  {
    title: 'Database validation (DVT)',
    description: 'Tool to verify 35M+ rows when moving data cloud-to-cloud — counts, IDs, and hash checks.',
    stack: 'Python · SSH · SHA-256 sampling',
  },
  {
    title: 'Data ingestion',
    description: 'B2B/B2C pipelines with clean schemas, safe retries, and clear logging per data source.',
    stack: 'Kafka · MySQL · MongoDB',
  },
  {
    title: 'Scraping & reliability',
    description: 'Scrapers with captcha handling, proxies, and monitoring so production stays healthy.',
    stack: 'Grafana · Kibana · New Relic',
  },
]

export const workLog = [
  'Built DVT to validate 35M+ rows for GCP → Linode migration',
  'Cut manual DB verification effort by over 90%',
  'Shipped challan, document, and webhook backends at Park+',
  'Improved bulk CSV pipelines for 25L+ records',
  'Set up Grafana / Kibana / New Relic dashboards & alerts',
]

export const technologies = [
  { name: 'Python', category: 'language' },
  { name: 'Django', category: 'framework' },
  { name: 'DRF', category: 'framework' },
  { name: 'Celery', category: 'queue' },
  { name: 'Redis', category: 'cache' },
  { name: 'Kafka', category: 'streaming' },
  { name: 'MySQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Docker', category: 'container' },
  { name: 'Kubernetes', category: 'orchestration' },
  { name: 'Jenkins', category: 'cicd' },
  { name: 'GCP', category: 'cloud' },
  { name: 'Linode', category: 'cloud' },
  { name: 'Grafana', category: 'observability' },
  { name: 'Kibana', category: 'observability' },
  { name: 'New Relic', category: 'observability' },
  { name: 'Golang', category: 'language' },
]

export const achievements = [
  '35M+ row database validation (DVT)',
  '90%+ less manual verification',
  '25L+ record batch pipelines',
  'Production observability & on-call',
]

export const projects = [
  {
    id: 'tradingbuddy',
    name: 'TradingBuddy',
    subtitle: 'Real-Time Market Analytics',
    description:
      'A TradingView-style app for live prices, OHLC data, options by expiry, and history — with fast APIs and caching.',
    stack: ['Python', 'Django', 'Redis', 'REST APIs'],
    status: 'project',
    metrics: {
      focus: 'Market data',
      features: 'EMA · RSI · MACD',
      type: 'Watchlists & alerts',
    },
    tags: ['analytics', 'real-time'],
    highlights: [
      'Live and historical market APIs with low-latency reads',
      'Technical indicators: EMA, RSI, MACD',
      'Built to handle frequent updates and many users',
    ],
  },
  {
    id: 'trackit',
    name: 'TrackIt',
    subtitle: 'Debt & Expense Management',
    description:
      'Django backend for tracking expenses, managing debt, and planning repayments — with JWT-secured APIs and dashboards.',
    stack: ['Python', 'Django', 'JWT', 'REST APIs'],
    status: 'project',
    metrics: {
      focus: 'Personal finance',
      features: 'Repayment planner',
      type: 'Exportable reports',
    },
    tags: ['fintech', 'django'],
    highlights: [
      'Monthly spend and dues dashboards',
      'Priority-based debt repayment schedules',
      'Exportable financial summaries',
    ],
  },
]

export const experience = [
  {
    id: 'parkplus',
    role: 'Software Development Engineer',
    company: 'Park+',
    period: 'Mar 2025 — Present',
    type: 'current',
    highlights: [
      'Run high-traffic backends for challan verification, PDF generation, retries, and webhooks (Django, Celery, Redis, Kafka).',
      'Built Database Validation Tool (DVT) for 35M+ row migration from GCP to Linode — row counts, ID ranges, SHA-256 hash checks.',
      'Automated audit pipelines that cut manual verification by over 90%.',
      'Built B2B/B2C ingestion with normalized schemas, idempotent writes, and per-source monitoring.',
      'Improved scraping & captcha flows with sessions, proxies, and OCR fallback.',
      'Own observability with Kibana, Grafana, and New Relic — dashboards, alerts, and incident playbooks.',
      'Deploy and debug with Docker, Jenkins, and Kubernetes in staging and production.',
      'Optimized bulk CSV jobs for 25L+ records — better batching, transactions, and retries.',
    ],
  },
  {
    id: 'education',
    role: 'B.Tech — Computer Science & Engineering',
    company: 'MANIT, Bhopal',
    period: '2025 · CGPA 7.41/10',
    type: 'education',
    highlights: [
      'B.Tech CSE, MANIT Bhopal (2025) — CGPA 7.41/10',
      'JNV Sagar — Class XII: 93.6%',
    ],
  },
]

export const skillCategories = [
  { label: 'Languages', items: ['Python', 'Golang', 'C++', 'Java'] },
  {
    label: 'Backend',
    items: ['Django', 'Django REST Framework', 'Redis', 'Celery', 'Kafka', 'REST APIs', 'Microservices'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MongoDB', 'Indexing', 'Query Optimization', 'Data Validation', 'Replication'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker', 'Linux', 'Jenkins', 'Kubernetes', 'CI/CD', 'GCP', 'Linode'],
  },
  {
    label: 'Observability',
    items: ['Kibana', 'Grafana', 'New Relic', 'Structured Logging', 'SLA Dashboards'],
  },
]

export const infraNodes = [
  { id: 'api', label: 'API Gateway', x: 0, y: 0, type: 'gateway' },
  { id: 'django', label: 'Django', x: -2, y: 1, type: 'service' },
  { id: 'celery', label: 'Celery', x: 2, y: 1, type: 'worker' },
  { id: 'kafka', label: 'Kafka', x: 0, y: 2, type: 'stream' },
  { id: 'redis', label: 'Redis', x: -2, y: -1, type: 'cache' },
  { id: 'mysql', label: 'MySQL', x: 2, y: -1, type: 'database' },
  { id: 'mongo', label: 'MongoDB', x: -1, y: 2, type: 'database' },
  { id: 'grafana', label: 'Monitoring', x: 1, y: 2, type: 'observability' },
]

export const infraConnections = [
  ['api', 'django'],
  ['api', 'redis'],
  ['django', 'celery'],
  ['django', 'mysql'],
  ['celery', 'kafka'],
  ['kafka', 'mongo'],
  ['django', 'grafana'],
  ['celery', 'grafana'],
]

export const terminalLines = [
  { type: 'prompt', text: 'priyanshu@priyanshuos ~ % whoami' },
  { type: 'output', text: 'Priyanshu Rai — Backend Software Engineer' },
  { type: 'output', text: 'Company: Park+ (Mar 2025 — Present)' },
  { type: 'output', text: 'Focus: Python · Django · Kafka · data validation · production systems' },
  { type: 'prompt', text: 'priyanshu@priyanshuos ~ % cat highlights.txt' },
  { type: 'output', text: '→ Validated 35M+ database rows (GCP → Linode migration)' },
  { type: 'output', text: '→ Reduced manual DB checks by 90%+' },
  { type: 'output', text: '→ Optimized bulk CSV pipelines (25L+ records)' },
  { type: 'output', text: '→ Projects: TradingBuddy, TrackIt' },
  { type: 'prompt', text: 'priyanshu@priyanshuos ~ % _' },
]

export function generateHeatmapData(): number[][] {
  const weeks = 52
  const days = 7
  const data: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const week: number[] = []
    for (let d = 0; d < days; d++) {
      const base = Math.random()
      const intensity =
        base > 0.35 ? Math.floor(Math.random() * 3) + (base > 0.75 ? 1 : 0) : 0
      week.push(intensity)
    }
    data.push(week)
  }
  return data
}
