export type FlowNodeType = 'source' | 'process' | 'store' | 'observe'

export interface FlowNode {
  id: string
  label: string
  type: FlowNodeType
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
}

export interface TechConcept {
  title: string
  body: string
}

export interface TechSystem {
  id: string
  name: string
  category: string
  tagline: string
  accent: string
  glow: string
  simpleWhat: string
  whyExists: string
  whyCompaniesUse: string[]
  productionUse: string[]
  useCases: string[]
  flowNodes: FlowNode[]
  flowEdges: FlowEdge[]
  concepts: TechConcept[]
  telemetry: { label: string; value: string }[]
}

export const arsenalSystems: TechSystem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    tagline: 'Primary production language',
    accent: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.35)',
    simpleWhat:
      'Python is a readable, versatile language — ideal for web backends, data pipelines, automation, and tooling. It powers most of the services and internal tools in this stack.',
    whyExists:
      'Teams need one language that can ship APIs fast, glue systems together, and process millions of rows without switching stacks for every problem.',
    whyCompaniesUse: [
      'Rapid API and backend development',
      'Rich ecosystem (Django, Celery, data libraries)',
      'Strong for scripting, ETL, and validation tooling',
      'Easy to hire and maintain at scale',
    ],
    productionUse: [
      'Primary language for Park+ backends — Django, Celery, Kafka integrations',
      'Database Validation Tool (DVT) for 35M+ row GCP → Linode migration',
      'Scraping, captcha workflows, and bulk CSV/batch pipelines (25L+ records)',
      'TradingBuddy and TrackIt project backends',
    ],
    useCases: ['Django APIs', 'Data pipelines', 'DVT & tooling', 'Automation'],
    flowNodes: [
      { id: 'dev', label: 'Application Code', type: 'source' },
      { id: 'django', label: 'Django / Scripts', type: 'process' },
      { id: 'worker', label: 'Celery Tasks', type: 'process' },
      { id: 'data', label: 'Pipelines & DVT', type: 'process' },
      { id: 'out', label: 'DB / APIs / Files', type: 'store' },
    ],
    flowEdges: [
      { from: 'dev', to: 'django', label: 'serve' },
      { from: 'django', to: 'worker', label: 'enqueue' },
      { from: 'worker', to: 'data', label: 'batch' },
      { from: 'data', to: 'out', label: 'output' },
    ],
    concepts: [
      { title: 'Why Python for backends', body: 'Fast iteration, clear code, huge libraries — trade-off is GIL for CPU-heavy work (often offloaded to workers).' },
      { title: 'Virtual environments', body: 'Isolate dependencies per project — requirements.txt or poetry in production deploys.' },
      { title: 'Type hints', body: 'Optional typing improves large-codebase maintainability in teams.' },
    ],
    telemetry: [
      { label: 'Role', value: 'Primary' },
      { label: 'Stack', value: 'Django · Celery' },
    ],
  },
  {
    id: 'golang',
    name: 'Golang',
    category: 'Languages',
    tagline: 'Fast compiled systems language',
    accent: '#00add8',
    glow: 'rgba(0, 173, 216, 0.35)',
    simpleWhat:
      'Go (Golang) is a compiled language built for concurrency and network services — simple syntax, fast binaries, and goroutines for handling many tasks at once.',
    whyExists:
      'Some workloads need raw speed, low memory, or single-binary deploys without a Python runtime. Go fills that gap in polyglot backends.',
    whyCompaniesUse: [
      'High-performance microservices and proxies',
      'CLI tools and DevOps utilities',
      'Concurrent network services (goroutines)',
      'Static binaries easy to deploy in containers',
    ],
    productionUse: [
      'Part of the broader backend skill set alongside Python (per resume)',
      'Useful mental model for concurrent systems that mirror Celery/Kafka patterns',
      'Foundation for reading and integrating Go-based infra tools in production',
    ],
    useCases: ['Microservices', 'CLIs', 'Concurrent I/O', 'Infra tools'],
    flowNodes: [
      { id: 'main', label: 'Go binary', type: 'source' },
      { id: 'handler', label: 'HTTP handlers', type: 'process' },
      { id: 'go', label: 'Goroutines', type: 'process' },
      { id: 'chan', label: 'Channels', type: 'process' },
      { id: 'svc', label: 'Downstream', type: 'store' },
    ],
    flowEdges: [
      { from: 'main', to: 'handler', label: 'route' },
      { from: 'handler', to: 'go', label: 'spawn' },
      { from: 'go', to: 'chan', label: 'sync' },
      { from: 'chan', to: 'svc', label: 'call' },
    ],
    concepts: [
      { title: 'Goroutines', body: 'Lightweight threads — cheap concurrency for I/O-bound services.' },
      { title: 'Channels', body: 'Safe communication between goroutines — avoids shared-memory bugs.' },
      { title: 'vs Python', body: 'Go for hot paths and services; Python for rapid feature delivery — common split.' },
    ],
    telemetry: [{ label: 'Paradigm', value: 'Compiled' }],
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Languages',
    tagline: 'Systems-level performance',
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.35)',
    simpleWhat:
      'C++ gives fine control over memory and CPU — used where every millisecond counts: databases, game engines, embedded systems, and high-performance libraries.',
    whyExists:
      'Higher-level languages depend on C++ under the hood (databases, interpreters, browsers). Understanding it helps you reason about performance limits.',
    whyCompaniesUse: [
      'Ultra-low latency systems',
      'Building performance-critical libraries',
      'Legacy enterprise and infra codebases',
      'Computer science fundamentals (algorithms, OS)',
    ],
    productionUse: [
      'Academic foundation from MANIT Bhopal — algorithms and systems programming',
      'Informs how you think about memory, complexity, and backend performance tuning',
      'Complements Python work when debugging slow queries or CPU-bound bottlenecks',
    ],
    useCases: ['Algorithms', 'Performance mindset', 'Systems basics', 'Native libs'],
    flowNodes: [
      { id: 'src', label: 'Source (.cpp)', type: 'source' },
      { id: 'compile', label: 'Compiler', type: 'process' },
      { id: 'binary', label: 'Native binary', type: 'process' },
      { id: 'run', label: 'CPU / Memory', type: 'store' },
    ],
    flowEdges: [
      { from: 'src', to: 'compile', label: 'build' },
      { from: 'compile', to: 'binary', label: 'link' },
      { from: 'binary', to: 'run', label: 'execute' },
    ],
    concepts: [
      { title: 'Memory management', body: 'Manual control — fast but requires discipline (RAII, smart pointers).' },
      { title: 'Why it matters for backend devs', body: 'MySQL, Redis, Kafka clients — understanding cost of copies and allocations.' },
      { title: 'Not daily driver here', body: 'Production work is Python-first; C++ shapes how you optimize hot paths.' },
    ],
    telemetry: [{ label: 'Foundation', value: 'CS core' }],
  },
  {
    id: 'kafka',
    name: 'Kafka',
    category: 'Event Streaming',
    tagline: 'Distributed event backbone',
    accent: '#f97316',
    glow: 'rgba(249, 115, 22, 0.35)',
    simpleWhat:
      'Kafka is a distributed log that stores events in order. Services publish messages to topics; other services read them at their own pace — like a high-throughput postal system for your backend.',
    whyExists:
      'When many services need the same data or must react to events without blocking each other, direct API calls break down. Kafka decouples producers and consumers so systems scale independently.',
    whyCompaniesUse: [
      'Handle millions of events per day without losing messages',
      'Replay data for debugging or reprocessing',
      'Build real-time pipelines (ingestion, analytics, webhooks)',
      'Survive spikes by buffering load in the log',
    ],
    productionUse: [
      'Ingestion pipelines for B2B/B2C partner and government data at Park+',
      'Event streams for webhook delivery and async downstream processing',
      'Decoupling Django APIs from heavy Celery work via published events',
      'Source-level observability — track which pipeline produced which event',
    ],
    useCases: ['Ingestion pipelines', 'Event streaming', 'Async processing', 'Distributed messaging'],
    flowNodes: [
      { id: 'producer', label: 'Django / API', type: 'source' },
      { id: 'broker', label: 'Kafka Brokers', type: 'process' },
      { id: 'topic', label: 'Topics / Partitions', type: 'process' },
      { id: 'consumer', label: 'Celery / Workers', type: 'process' },
      { id: 'store', label: 'MySQL / MongoDB', type: 'store' },
    ],
    flowEdges: [
      { from: 'producer', to: 'broker', label: 'publish' },
      { from: 'broker', to: 'topic', label: 'partition' },
      { from: 'topic', to: 'consumer', label: 'consume' },
      { from: 'consumer', to: 'store', label: 'persist' },
    ],
    concepts: [
      { title: 'Producer / Consumer', body: 'Producers write events; consumers read in groups. Multiple consumers can scale horizontally.' },
      { title: 'Partitions', body: 'Topics split into partitions for parallelism — higher throughput across brokers.' },
      { title: 'Consumer lag', body: 'How far behind a consumer is. Critical metric in production — alerts when lag spikes.' },
      { title: 'Retries & idempotency', body: 'Consumers must handle duplicate messages safely — design idempotent writes.' },
    ],
    telemetry: [
      { label: 'Role', value: 'Event streaming' },
      { label: 'Use', value: 'Ingestion · webhooks' },
    ],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Cache & Queue',
    tagline: 'In-memory speed layer',
    accent: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.35)',
    simpleWhat:
      'Redis keeps data in memory for ultra-fast reads and writes. It works as a cache, message broker for Celery, and short-term store for sessions, OTPs, and rate limits.',
    whyExists:
      'Databases are too slow for hot paths that need microsecond responses. Redis sits in front of MySQL or beside workers to absorb read pressure and coordinate tasks.',
    whyCompaniesUse: [
      'Cache expensive queries and API responses',
      'Broker background jobs (Celery)',
      'Session storage and OTP flows',
      'Rate limiting and distributed locks',
    ],
    productionUse: [
      'Celery broker and result backend for distributed workers',
      'Caching hot reads in Django APIs (challan, document flows)',
      'Reducing MySQL load during high-traffic production windows',
      'Coordinating retries and short-lived job metadata',
    ],
    useCases: ['Caching', 'Task queues', 'Sessions & OTP', 'Rate limiting'],
    flowNodes: [
      { id: 'api', label: 'API Request', type: 'source' },
      { id: 'redis', label: 'Redis', type: 'process' },
      { id: 'hit', label: 'Cache Hit', type: 'process' },
      { id: 'miss', label: 'Cache Miss', type: 'process' },
      { id: 'db', label: 'MySQL', type: 'store' },
    ],
    flowEdges: [
      { from: 'api', to: 'redis', label: 'lookup' },
      { from: 'redis', to: 'hit', label: 'fast path' },
      { from: 'redis', to: 'miss', label: 'miss' },
      { from: 'miss', to: 'db', label: 'fetch' },
    ],
    concepts: [
      { title: 'Cache hit ratio', body: 'Percentage of requests served from Redis — target 90%+ on hot endpoints.' },
      { title: 'TTL', body: 'Time-to-live on keys so stale data expires automatically.' },
      { title: 'Eviction', body: 'When memory fills, Redis removes keys by policy (LRU, etc.).' },
    ],
    telemetry: [
      { label: 'Role', value: 'Broker + Cache' },
      { label: 'Use', value: 'Celery · hot reads' },
    ],
  },
  {
    id: 'celery',
    name: 'Celery',
    category: 'Distributed Workers',
    tagline: 'Background job orchestration',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.35)',
    simpleWhat:
      'Celery runs long or heavy tasks outside the web request — PDF generation, bulk CSV processing, retries, and webhook dispatch — using a pool of worker processes.',
    whyExists:
      'HTTP requests must return quickly. Anything slow (minutes of work) belongs in a worker queue so users are not blocked and servers do not time out.',
    whyCompaniesUse: [
      'Offload slow work from APIs',
      'Retry failed jobs automatically',
      'Scale workers independently of web servers',
      'Schedule periodic tasks (cron-style)',
    ],
    productionUse: [
      'Challan verification, document generation, and webhook delivery workers',
      'Bulk CSV/batch pipelines (25L+ records) with improved batching and retries',
      'Fault-tolerant retries with rate limiting on audit pipelines',
      'Scaled worker pools with queue monitoring in production',
    ],
    useCases: ['Background jobs', 'Retries', 'Distributed workers', 'Task orchestration'],
    flowNodes: [
      { id: 'django', label: 'Django', type: 'source' },
      { id: 'queue', label: 'Redis Queue', type: 'process' },
      { id: 'worker', label: 'Celery Workers', type: 'process' },
      { id: 'retry', label: 'Retry Logic', type: 'process' },
      { id: 'out', label: 'DB / Webhook', type: 'store' },
    ],
    flowEdges: [
      { from: 'django', to: 'queue', label: 'enqueue' },
      { from: 'queue', to: 'worker', label: 'consume' },
      { from: 'worker', to: 'retry', label: 'on fail' },
      { from: 'worker', to: 'out', label: 'complete' },
    ],
    concepts: [
      { title: 'Tasks', body: 'Python functions decorated as tasks — invoked async with .delay() or .apply_async().' },
      { title: 'Queues', body: 'Separate queues for priority — critical vs bulk workloads.' },
      { title: 'Retries', body: 'Exponential backoff on failures — essential for external APIs and scrapers.' },
    ],
    telemetry: [
      { label: 'Bulk jobs', value: '25L+ records' },
      { label: 'Role', value: 'Async workers' },
    ],
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Application Framework',
    tagline: 'Production Python web core',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
    simpleWhat:
      'Django is a batteries-included Python framework for building secure, maintainable web APIs and admin tools — ORM, auth, migrations, and REST support out of the box.',
    whyExists:
      'Teams need a proven structure for CRUD APIs, auth, and database access without reinventing security and patterns on every project.',
    whyCompaniesUse: [
      'Rapid development of REST APIs (with DRF)',
      'Built-in ORM and migrations',
      'Mature ecosystem for enterprise backends',
      'Clear separation of apps, models, views',
    ],
    productionUse: [
      'Core backend for Park+ — challan, documents, webhooks, ingestion APIs',
      'Django REST Framework for partner and internal APIs',
      'TradingBuddy and TrackIt project backends',
      'Integrated with Celery, Redis, and Kafka in monolith-style services',
    ],
    useCases: ['REST APIs', 'ORM & migrations', 'Admin & auth', 'Service layer'],
    flowNodes: [
      { id: 'client', label: 'Client', type: 'source' },
      { id: 'gw', label: 'API Gateway', type: 'process' },
      { id: 'django', label: 'Django + DRF', type: 'process' },
      { id: 'celery', label: 'Celery', type: 'process' },
      { id: 'db', label: 'MySQL', type: 'store' },
    ],
    flowEdges: [
      { from: 'client', to: 'gw', label: 'HTTPS' },
      { from: 'gw', to: 'django', label: 'route' },
      { from: 'django', to: 'celery', label: 'async' },
      { from: 'django', to: 'db', label: 'ORM' },
    ],
    concepts: [
      { title: 'Request lifecycle', body: 'Middleware → URL routing → view → serializer → response.' },
      { title: 'ORM', body: 'Python objects map to SQL — migrations track schema changes.' },
      { title: 'DRF', body: 'Serializers validate input/output; viewsets standardize CRUD APIs.' },
    ],
    telemetry: [
      { label: 'Deploy', value: 'K8s pods' },
      { label: 'Stack', value: 'DRF · Celery' },
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Orchestration',
    tagline: 'Container fleet control plane',
    accent: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.35)',
    simpleWhat:
      'Kubernetes (K8s) runs and scales containerized apps — it decides which machine runs which pod, restarts failures, and rolls out new versions safely.',
    whyExists:
      'Running dozens of services manually on VMs does not scale. K8s automates deployment, health checks, and scaling for container workloads.',
    whyCompaniesUse: [
      'Zero-downtime rollouts',
      'Auto-restart unhealthy containers',
      'Horizontal scaling under load',
      'Standard deploy model across teams',
    ],
    productionUse: [
      'Deploying Django and Celery workloads to staging and production clusters',
      'Debugging pod crashes, rollout issues, and CI/CD deploy failures',
      'Running api-gateway, django-app, celery-worker, and kafka-broker pods',
      'Coordinating with Jenkins pipelines for image build → deploy',
    ],
    useCases: ['Pod orchestration', 'Rollouts', 'Scaling', 'Service discovery'],
    flowNodes: [
      { id: 'jenkins', label: 'Jenkins CI', type: 'source' },
      { id: 'image', label: 'Docker Image', type: 'process' },
      { id: 'k8s', label: 'K8s Control Plane', type: 'process' },
      { id: 'pod', label: 'Pods', type: 'process' },
      { id: 'svc', label: 'Services', type: 'store' },
    ],
    flowEdges: [
      { from: 'jenkins', to: 'image', label: 'build' },
      { from: 'image', to: 'k8s', label: 'deploy' },
      { from: 'k8s', to: 'pod', label: 'schedule' },
      { from: 'pod', to: 'svc', label: 'expose' },
    ],
    concepts: [
      { title: 'Pods', body: 'Smallest deploy unit — one or more containers sharing network/storage.' },
      { title: 'Deployments', body: 'Declarative desired state — K8s reconciles running pods to match.' },
      { title: 'Probes', body: 'Liveness/readiness checks — unhealthy pods get restarted or removed from traffic.' },
    ],
    telemetry: [
      { label: 'Namespace', value: 'production' },
      { label: 'Restarts', value: '0 (stable)' },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containers',
    tagline: 'Ship consistent environments',
    accent: '#0ea5e9',
    glow: 'rgba(14, 165, 233, 0.35)',
    simpleWhat:
      'Docker packages your app and its dependencies into an image that runs the same everywhere — laptop, staging, or production — eliminating “works on my machine” problems.',
    whyExists:
      'Dependencies and OS differences cause deploy bugs. Containers bundle code + runtime into one portable unit.',
    whyCompaniesUse: [
      'Reproducible builds and deploys',
      'Isolation between services',
      'Foundation for Kubernetes',
      'Faster onboarding for new environments',
    ],
    productionUse: [
      'Containerized Django, Celery, and supporting services for Park+',
      'Images built in Jenkins and deployed to K8s clusters',
      'Consistent staging vs production parity for debugging',
    ],
    useCases: ['Packaging', 'CI images', 'Local dev parity', 'K8s workloads'],
    flowNodes: [
      { id: 'code', label: 'Source Code', type: 'source' },
      { id: 'dockerfile', label: 'Dockerfile', type: 'process' },
      { id: 'image', label: 'Image', type: 'process' },
      { id: 'registry', label: 'Registry', type: 'store' },
      { id: 'run', label: 'Container', type: 'process' },
    ],
    flowEdges: [
      { from: 'code', to: 'dockerfile', label: 'build' },
      { from: 'dockerfile', to: 'image', label: 'layer' },
      { from: 'image', to: 'registry', label: 'push' },
      { from: 'registry', to: 'run', label: 'pull & run' },
    ],
    concepts: [
      { title: 'Images vs containers', body: 'Image is the template; container is a running instance.' },
      { title: 'Layers', body: 'Cached layers speed up rebuilds when only app code changes.' },
    ],
    telemetry: [{ label: 'Runtime', value: 'Production' }],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Relational Database',
    tagline: 'Transactional source of truth',
    accent: '#eab308',
    glow: 'rgba(234, 179, 8, 0.35)',
    simpleWhat:
      'MySQL stores structured relational data with strong consistency — users, orders, challans, and anything that needs ACID transactions and SQL queries.',
    whyExists:
      'Business data with strict relationships (foreign keys, joins) needs a reliable relational database that teams have operated for decades.',
    whyCompaniesUse: [
      'ACID transactions for financial and user data',
      'Complex joins and reporting queries',
      'Replication for read scaling and failover',
      'Mature tooling and operational playbooks',
    ],
    productionUse: [
      'Primary transactional store for Park+ backend services',
      '35M+ row validation during GCP → Linode migration (DVT)',
      'Replication lag monitoring (12ms target in ops checks)',
      'Schema migrations alongside Django ORM',
    ],
    useCases: ['Transactions', 'Relational models', 'Replication', 'Validation at scale'],
    flowNodes: [
      { id: 'app', label: 'Django ORM', type: 'source' },
      { id: 'primary', label: 'MySQL Primary', type: 'process' },
      { id: 'replica', label: 'Replica', type: 'process' },
      { id: 'backup', label: 'Backups', type: 'store' },
    ],
    flowEdges: [
      { from: 'app', to: 'primary', label: 'write' },
      { from: 'primary', to: 'replica', label: 'replicate' },
      { from: 'primary', to: 'backup', label: 'snapshot' },
    ],
    concepts: [
      { title: 'ACID', body: 'Atomicity, consistency, isolation, durability — critical for money and identity data.' },
      { title: 'Indexes', body: 'Speed up queries — wrong indexes mean slow APIs at scale.' },
      { title: 'Replication lag', body: 'Delay before replicas catch up — matters for read-after-write consistency.' },
    ],
    telemetry: [
      { label: 'Rows validated', value: '35M+' },
      { label: 'Role', value: 'Transactional' },
    ],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Document Database',
    tagline: 'Flexible document store',
    accent: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.35)',
    simpleWhat:
      'MongoDB stores JSON-like documents — great for event logs, ingestion payloads, and schemas that evolve without heavy migrations.',
    whyExists:
      'Not all data fits rigid tables. High-volume events, nested objects, and fast writes often land in document databases.',
    whyCompaniesUse: [
      'Flexible schema for evolving APIs',
      'High write throughput for events and logs',
      'Horizontal sharding at scale',
      'Good fit for analytics and ingestion buffers',
    ],
    productionUse: [
      'Event and ingestion data alongside Kafka pipelines',
      'Document storage for partner/integration payloads',
      'Complement to MySQL — relational core + document edge stores',
    ],
    useCases: ['Event logs', 'Ingestion payloads', 'Flexible schema', 'High writes'],
    flowNodes: [
      { id: 'kafka', label: 'Kafka', type: 'source' },
      { id: 'worker', label: 'Consumer', type: 'process' },
      { id: 'mongo', label: 'MongoDB', type: 'store' },
      { id: 'index', label: 'Indexes', type: 'process' },
    ],
    flowEdges: [
      { from: 'kafka', to: 'worker', label: 'stream' },
      { from: 'worker', to: 'mongo', label: 'insert' },
      { from: 'mongo', to: 'index', label: 'query' },
    ],
    concepts: [
      { title: 'Collections & documents', body: 'Like tables and rows, but nested JSON structures allowed.' },
      { title: 'Indexing', body: 'Query performance depends on indexes — same discipline as SQL.' },
    ],
    telemetry: [{ label: 'Role', value: 'Events + docs' }],
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'Observability',
    tagline: 'Metrics & SLA dashboards',
    accent: '#f46800',
    glow: 'rgba(244, 104, 0, 0.35)',
    simpleWhat:
      'Grafana turns metrics into live dashboards — CPU, latency, queue depth, error rates — so teams see system health at a glance and catch incidents early.',
    whyExists:
      'Raw metrics in a database are useless without visualization. On-call engineers need graphs, thresholds, and alerts.',
    whyCompaniesUse: [
      'SLA and SLO dashboards',
      'Alerting when metrics cross thresholds',
      'Unified view across services',
      'Incident response and postmortems',
    ],
    productionUse: [
      'SLA dashboards for production services at Park+',
      'Monitoring Kafka lag, Celery queues, and API latency',
      'Part of the Grafana + Kibana + New Relic observability stack',
      'Alerting pipelines tied to on-call playbooks',
    ],
    useCases: ['SLA dashboards', 'Alerting', 'Service health', 'Incident response'],
    flowNodes: [
      { id: 'apps', label: 'Services', type: 'source' },
      { id: 'metrics', label: 'Metrics', type: 'process' },
      { id: 'grafana', label: 'Grafana', type: 'observe' },
      { id: 'alert', label: 'Alerts', type: 'process' },
    ],
    flowEdges: [
      { from: 'apps', to: 'metrics', label: 'emit' },
      { from: 'metrics', to: 'grafana', label: 'visualize' },
      { from: 'grafana', to: 'alert', label: 'threshold' },
    ],
    concepts: [
      { title: 'Panels', body: 'Each chart is a panel — composed into dashboards per team or service.' },
      { title: 'Alerts', body: 'Fire when query result breaches limit — route to Slack/PagerDuty.' },
    ],
    telemetry: [{ label: 'Role', value: 'SLA dashboards' }],
  },
  {
    id: 'kibana',
    name: 'Kibana',
    category: 'Observability',
    tagline: 'Log search & discovery',
    accent: '#fec514',
    glow: 'rgba(254, 197, 20, 0.35)',
    simpleWhat:
      'Kibana lets you search and visualize logs — trace a failed request across services, filter by error type, and build timelines for debugging production issues.',
    whyExists:
      'When something breaks at 2 AM, you need to find the exact log lines across millions of events — not SSH into servers one by one.',
    whyCompaniesUse: [
      'Centralized log search',
      'Error tracking across microservices',
      'Security and audit log analysis',
      'Correlation with metrics (often paired with Elasticsearch)',
    ],
    productionUse: [
      'Production log search during incidents and CI/CD debugging',
      'Tracing ingestion failures and scraper errors',
      'Structured logging from Django and Celery workers',
      'Centralized log search during production incidents',
    ],
    useCases: ['Log search', 'Incident debug', 'Audit trails', 'Error analysis'],
    flowNodes: [
      { id: 'svc', label: 'Django / Celery', type: 'source' },
      { id: 'ship', label: 'Log Shipper', type: 'process' },
      { id: 'store', label: 'Log Store', type: 'store' },
      { id: 'kibana', label: 'Kibana', type: 'observe' },
    ],
    flowEdges: [
      { from: 'svc', to: 'ship', label: 'stdout' },
      { from: 'ship', to: 'store', label: 'index' },
      { from: 'store', to: 'kibana', label: 'search' },
    ],
    concepts: [
      { title: 'Structured logs', body: 'JSON logs with request_id make cross-service tracing possible.' },
      { title: 'Filters', body: 'Narrow by level, service, time — find needle in haystack.' },
    ],
    telemetry: [{ label: 'Role', value: 'Log search' }],
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'CI/CD',
    tagline: 'Build & deploy automation',
    accent: '#d97706',
    glow: 'rgba(217, 119, 6, 0.35)',
    simpleWhat:
      'Jenkins automates build, test, and deploy pipelines — every code push can trigger tests, Docker image builds, and rollout to Kubernetes.',
    whyExists:
      'Manual deploys are error-prone and slow. CI/CD pipelines enforce quality gates and repeatable releases.',
    whyCompaniesUse: [
      'Automated tests on every commit',
      'Docker image builds',
      'Deploy to staging/production',
      'Rollback and pipeline visibility',
    ],
    productionUse: [
      'CI/CD for backend services — resolving pipeline failures in production rollouts',
      'Building images deployed to K8s staging and production',
      'Integrated with Docker and Kubernetes deploy flow',
    ],
    useCases: ['CI pipelines', 'Docker builds', 'K8s deploys', 'Quality gates'],
    flowNodes: [
      { id: 'git', label: 'Git Push', type: 'source' },
      { id: 'jenkins', label: 'Jenkins', type: 'process' },
      { id: 'test', label: 'Tests', type: 'process' },
      { id: 'deploy', label: 'Deploy', type: 'process' },
    ],
    flowEdges: [
      { from: 'git', to: 'jenkins', label: 'trigger' },
      { from: 'jenkins', to: 'test', label: 'run' },
      { from: 'test', to: 'deploy', label: 'pass' },
    ],
    concepts: [
      { title: 'Pipeline', body: 'Stages: checkout → test → build → deploy — failures stop the line.' },
      { title: 'Artifacts', body: 'Built images stored for deploy stage to pick up.' },
    ],
    telemetry: [{ label: 'Role', value: 'CI/CD · K8s' }],
  },
  {
    id: 'gcp',
    name: 'GCP',
    category: 'Cloud Platform',
    tagline: 'Google Cloud infrastructure',
    accent: '#4285f4',
    glow: 'rgba(66, 133, 244, 0.35)',
    simpleWhat:
      'GCP (Google Cloud Platform) provides VMs, databases, networking, and managed services — the cloud where your apps run before or after migration.',
    whyExists:
      'Companies rent compute and storage instead of owning data centers — scale up/down and pay for what you use.',
    whyCompaniesUse: [
      'Managed databases and Kubernetes (GKE)',
      'Global networking and load balancing',
      'IAM and security controls',
      'Hybrid and multi-cloud strategies',
    ],
    productionUse: [
      'Source environment for 35M+ row database migration (GCP → Linode)',
      'Running production workloads and validation (DVT) with SSH tunneling',
      'Cloud infra alongside Linode for multi-cloud operations',
    ],
    useCases: ['Cloud hosting', 'Migrations', 'Managed services', 'Networking'],
    flowNodes: [
      { id: 'gcp', label: 'GCP MySQL', type: 'source' },
      { id: 'dvt', label: 'DVT Tool', type: 'process' },
      { id: 'tunnel', label: 'SSH Tunnel', type: 'process' },
      { id: 'linode', label: 'Linode Target', type: 'store' },
    ],
    flowEdges: [
      { from: 'gcp', to: 'tunnel', label: 'secure' },
      { from: 'tunnel', to: 'dvt', label: 'validate' },
      { from: 'dvt', to: 'linode', label: 'certify' },
    ],
    concepts: [
      { title: 'Migration', body: 'Moving 35M+ rows required partitioned validation, not one big copy.' },
      { title: 'IAM', body: 'Service accounts and roles control who accesses what.' },
    ],
    telemetry: [{ label: 'Migration', value: '35M+ rows' }],
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    category: 'Observability',
    tagline: 'APM & production alerts',
    accent: '#1ce783',
    glow: 'rgba(28, 231, 131, 0.35)',
    simpleWhat:
      'New Relic monitors application performance (APM) — slow database queries, external API latency, error rates — with traces that show exactly where time is spent.',
    whyExists:
      'Metrics tell you something is slow; APM tells you which line of code or which dependency caused it.',
    whyCompaniesUse: [
      'End-to-end request tracing',
      'Database and external service breakdown',
      'Error inbox and alerting',
      'Capacity planning from real traffic',
    ],
    productionUse: [
      'APM for Django production services',
      'Alerting and availability tracking for production services',
      'Faster incident response with distributed traces',
      'Alongside Grafana dashboards and Kibana logs',
    ],
    useCases: ['APM traces', 'Alerts', 'Error tracking', 'Latency analysis'],
    flowNodes: [
      { id: 'req', label: 'HTTP Request', type: 'source' },
      { id: 'apm', label: 'New Relic Agent', type: 'process' },
      { id: 'trace', label: 'Trace', type: 'observe' },
      { id: 'alert', label: 'Alert', type: 'process' },
    ],
    flowEdges: [
      { from: 'req', to: 'apm', label: 'instrument' },
      { from: 'apm', to: 'trace', label: 'record' },
      { from: 'trace', to: 'alert', label: 'SLO breach' },
    ],
    concepts: [
      { title: 'Transactions', body: 'Each API request is a transaction — timed per segment (DB, HTTP, cache).' },
      { title: 'Apdex', body: 'User satisfaction score based on response time thresholds.' },
    ],
    telemetry: [{ label: 'Role', value: 'APM traces' }],
  },
  {
    id: 'linode',
    name: 'Linode',
    category: 'Cloud Platform',
    tagline: 'Migration target infrastructure',
    accent: '#00b159',
    glow: 'rgba(0, 177, 89, 0.35)',
    simpleWhat:
      'Linode provides cloud VMs and managed infrastructure — in my work it is the target environment for large-scale database migration from GCP, with validation before cutover.',
    whyExists:
      'Teams choose cloud providers for cost, region, or strategy. Migrations require proving data integrity on the destination before switching traffic.',
    whyCompaniesUse: [
      'Alternative or secondary cloud for workloads',
      'Cost-effective compute for specific services',
      'Multi-cloud resilience',
      'Controlled migration targets',
    ],
    productionUse: [
      'Destination for 35M+ row GCP → Linode database migration at Park+',
      'DVT (Data Validation Tool) runs comparing source and target row counts, ID ranges, and hash samples',
      'SSH-tunneled validation workflows before production cutover',
      'Multi-cloud operations alongside GCP',
    ],
    useCases: ['DB migration', 'DVT validation', 'Multi-cloud', 'Production hosting'],
    flowNodes: [
      { id: 'gcp', label: 'GCP Source', type: 'source' },
      { id: 'dvt', label: 'DVT Checks', type: 'process' },
      { id: 'tunnel', label: 'SSH Tunnel', type: 'process' },
      { id: 'linode', label: 'Linode MySQL', type: 'store' },
    ],
    flowEdges: [
      { from: 'gcp', to: 'tunnel', label: 'read' },
      { from: 'tunnel', to: 'dvt', label: 'compare' },
      { from: 'dvt', to: 'linode', label: 'certify' },
    ],
    concepts: [
      { title: 'DVT', body: 'Row count, ID range, and SHA-256 hash sampling — not a blind copy.' },
      { title: 'Cutover', body: 'Traffic moves only after validation passes across partitions.' },
    ],
    telemetry: [{ label: 'Validated', value: '35M+ rows' }],
  },
]

export function getTechById(id: string): TechSystem | undefined {
  return arsenalSystems.find((t) => t.id === id)
}
