export type NodeStatus = 'online' | 'active' | 'processing' | 'streaming'

export interface ArchNode {
  id: string
  label: string
  role: string
  status: NodeStatus
  metric?: string
}

export interface ArchLayer {
  id: string
  index: number
  title: string
  subtitle: string
  nodes: ArchNode[]
  flowLabel?: string
  throughput?: string
}

export interface ObservabilityTool {
  id: string
  name: string
  role: string
  status: NodeStatus
  metric: string
  color: string
}

export const architectureLayers: ArchLayer[] = [
  {
    id: 'ingress',
    index: 1,
    title: 'INGRESS',
    subtitle: 'Request entry · edge routing',
    flowLabel: 'HTTPS / REST',
    throughput: 'High traffic',
    nodes: [
      { id: 'user', label: 'Client / Partner', role: 'B2B · B2C traffic', status: 'active' },
      { id: 'gateway', label: 'API Gateway', role: 'Auth · rate limit · routing', status: 'online', metric: 'p99 45ms' },
    ],
  },
  {
    id: 'application',
    index: 2,
    title: 'APPLICATION',
    subtitle: 'Synchronous request handling',
    flowLabel: 'sync handlers',
    throughput: 'Django cluster',
    nodes: [
      {
        id: 'django',
        label: 'Django Services',
        role: 'Challan · documents · webhooks · retries',
        status: 'online',
        metric: '5 pods',
      },
    ],
  },
  {
    id: 'async',
    index: 3,
    title: 'ASYNC QUEUE',
    subtitle: 'Decouple heavy work from request path',
    flowLabel: 'task enqueue',
    throughput: 'queue depth 127',
    nodes: [
      { id: 'redis', label: 'Redis Queue', role: 'Broker · cache · result backend', status: 'online', metric: '94% hit' },
      { id: 'celery', label: 'Celery Workers', role: 'Background jobs · retries', status: 'processing', metric: 'Scaled pool' },
    ],
  },
  {
    id: 'events',
    index: 4,
    title: 'EVENT STREAM',
    subtitle: 'Durable async event backbone',
    flowLabel: 'publish / consume',
    throughput: '8 pipelines',
    nodes: [
      {
        id: 'kafka',
        label: 'Kafka Brokers',
        role: 'Ingestion · webhooks · audit events',
        status: 'streaming',
        metric: 'Multi-topic',
      },
    ],
  },
  {
    id: 'validation',
    index: 5,
    title: 'VALIDATION PIPELINE',
    subtitle: 'Data integrity at scale',
    flowLabel: 'DVT · audit batches',
    throughput: '35M+ rows',
    nodes: [
      {
        id: 'dvt',
        label: 'Validation Engine (DVT)',
        role: 'Row count · ID range · SHA-256 hash sampling',
        status: 'processing',
        metric: 'GCP → Linode',
      },
    ],
  },
  {
    id: 'persistence',
    index: 6,
    title: 'PERSISTENCE',
    subtitle: 'Authoritative storage',
    flowLabel: 'read / write',
    nodes: [
      { id: 'mysql', label: 'MySQL', role: 'Transactional · relational', status: 'online', metric: 'Primary store' },
      { id: 'mongo', label: 'MongoDB', role: 'Events · documents · logs', status: 'online', metric: 'replica OK' },
    ],
  },
]

export const observabilityStack: ObservabilityTool[] = [
  { id: 'grafana', name: 'Grafana', role: 'SLA dashboards', status: 'online', metric: 'Service health', color: '#f46800' },
  { id: 'kibana', name: 'Kibana', role: 'Log search & traces', status: 'active', metric: 'Incident debug', color: '#fec514' },
  { id: 'newrelic', name: 'New Relic', role: 'APM & alerts', status: 'online', metric: 'Request traces', color: '#1ce783' },
]

/** Resume-backed metrics only */
export const pipelineTelemetry = [
  { label: 'Rows validated (DVT)', value: '35M+', unit: 'GCP → Linode' },
  { label: 'Manual checks saved', value: '90%+', unit: 'automation' },
  { label: 'Bulk CSV processed', value: '25L+', unit: 'records' },
  { label: 'Personal projects', value: '2', unit: 'shipped' },
]
