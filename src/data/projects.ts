export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'AI / ML' | 'Web' | 'Mobile' | 'Systems & Cloud' | 'Open Source';
  featured: boolean;
  tags: string[];
  metrics?: { label: string; value: string }[];
  contributors: { name: string; role: string; avatar?: string }[];
  githubUrl: string;
  liveUrl?: string;
  previewType: 'map' | 'terminal' | 'dashboard' | 'code';
  status: 'Production' | 'Beta' | 'Active Development' | 'Open Source';
  version: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-campus-navigator',
    title: 'AI Campus Navigator',
    subtitle: 'Smart navigation system for Amity University using AI and real-time data.',
    description: 'Autonomous pathfinding, real-time classroom routing, and event guidance engineered specifically for Amity University campus.',
    longDescription: 'Engineered by club members to solve spatial navigation across 60+ academic blocks. Integrates vector campus map tiles with Dijkstra + A* pathfinding, accessibility routing for differently abled students, and live lecture hall occupancy feeds.',
    category: 'AI / ML',
    featured: true,
    tags: ['React', 'Python', 'TensorFlow', 'Mapbox', 'FastAPI'],
    metrics: [
      { label: 'Active Daily Users', value: '4,200+' },
      { label: 'Latency', value: '< 18ms' },
      { label: 'Accuracy', value: '99.4%' }
    ],
    contributors: [
      { name: 'Aditya Vardhan', role: 'AI Lead' },
      { name: 'Rohan Sharma', role: 'Systems Engineer' },
      { name: 'Priya Patel', role: 'Frontend Architect' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/campus-navigator',
    liveUrl: 'https://navigator.amitycodingclub.org',
    previewType: 'map',
    status: 'Production',
    version: 'v2.4.0'
  },
  {
    id: 'amity-os-portal',
    title: 'Amity OS / Student Hub',
    subtitle: 'High-performance unified dashboard for attendance, assignments, and hackathon teams.',
    description: 'A lightning-fast, privacy-first portal replacing slow legacy ERPs with instant cached state and modern UX.',
    longDescription: 'Created as an open-source initiative to eliminate clunky student workflows. Features offline-first PWA caching, timetable synchronization with Google Calendar, and one-click hackathon squad matching.',
    category: 'Web',
    featured: true,
    tags: ['Next.js 15', 'TypeScript', 'Tailwind', 'Redis', 'PostgreSQL'],
    metrics: [
      { label: 'Page Load', value: '0.2s' },
      { label: 'Requests Cached', value: '94%' },
      { label: 'Stars on GitHub', value: '380+' }
    ],
    contributors: [
      { name: 'Siddharth Rao', role: 'Fullstack Lead' },
      { name: 'Ananya Gupta', role: 'UI/UX Lead' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/amity-os',
    liveUrl: 'https://os.amitycodingclub.org',
    previewType: 'dashboard',
    status: 'Production',
    version: 'v3.1.2'
  },
  {
    id: 'codecollab-ide',
    title: 'CodeCollab Live IDE',
    subtitle: 'Collaborative in-browser pair programming IDE with WebAssembly execution.',
    description: 'Real-time multi-cursor editor with low-latency CRDT synchronization and sandboxed code execution in C++, Rust, and Python.',
    longDescription: 'Built for club mentorship sessions and coding interviews. Supports live voice/text chat, automated test case execution, and syntax highlighting with monaco editor integration.',
    category: 'Systems & Cloud',
    featured: true,
    tags: ['Rust', 'WebAssembly', 'Yjs', 'WebSockets', 'Docker'],
    metrics: [
      { label: 'Sync Latency', value: '< 12ms' },
      { label: 'Languages Supported', value: '14+' },
      { label: 'Sessions Run', value: '1,800+' }
    ],
    contributors: [
      { name: 'Karan Mehra', role: 'Systems Dev' },
      { name: 'Vikram Sethi', role: 'DevOps Lead' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/codecollab-ide',
    liveUrl: 'https://collab.amitycodingclub.org',
    previewType: 'code',
    status: 'Beta',
    version: 'v1.1.0'
  },
  {
    id: 'ecopulse-iot',
    title: 'EcoPulse Campus Grid',
    subtitle: 'Distributed IoT energy monitoring and air quality tracking across campus.',
    description: 'Sensor mesh network monitoring carbon footprints, laboratory power utilization, and ambient climate indicators in real-time.',
    longDescription: 'Combines ESP32 microcontrollers with MQTT brokers and TimescaleDB to provide live environmental telemetry. Deployed in 8 engineering laboratories to automate HVAC cutoff during idle hours.',
    category: 'Open Source',
    featured: true,
    tags: ['C++', 'MQTT', 'TimescaleDB', 'Grafana', 'Next.js'],
    metrics: [
      { label: 'Energy Saved', value: '18.4%' },
      { label: 'Nodes Deployed', value: '48' },
      { label: 'Data Points/Day', value: '1.2M' }
    ],
    contributors: [
      { name: 'Nikhil Verma', role: 'IoT Lead' },
      { name: 'Tanvi Nair', role: 'Data Analyst' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/ecopulse-iot',
    liveUrl: 'https://ecopulse.amitycodingclub.org',
    previewType: 'terminal',
    status: 'Active Development',
    version: 'v0.9.4'
  },
  {
    id: 'devhunt-ai',
    title: 'DevHunt Matchmaker',
    subtitle: 'AI-assisted teammate finder for national and global hackathons.',
    description: 'Vector embeddings matching complementary skills, project histories, and hackathon track ambitions.',
    longDescription: 'DevHunt uses cosine similarity on developer GitHub repositories and interest tags to suggest balanced 4-person teams (e.g. 1 AI + 1 Frontend + 1 Backend + 1 Pitch Lead).',
    category: 'AI / ML',
    featured: false,
    tags: ['Python', 'OpenAI API', 'ChromaDB', 'React', 'Node.js'],
    metrics: [
      { label: 'Teams Formed', value: '230+' },
      { label: 'Podium Finishes', value: '34' }
    ],
    contributors: [
      { name: 'Aditya Vardhan', role: 'Lead Architect' },
      { name: 'Shreya Roy', role: 'Product Manager' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/devhunt',
    liveUrl: 'https://devhunt.amitycodingclub.org',
    previewType: 'dashboard',
    status: 'Production',
    version: 'v2.0.1'
  },
  {
    id: 'algopack-library',
    title: 'AlgoPack Visualizer',
    subtitle: 'Interactive algorithm and data structure visualizer for competitive programmers.',
    description: 'Step-by-step visual playback for complex graph theory, dynamic programming, and spatial tree data structures.',
    longDescription: 'A go-to resource for ACC candidates preparing for ICPC and FAANG coding interviews. Includes time-complexity step execution and custom input testbeds.',
    category: 'Open Source',
    featured: false,
    tags: ['TypeScript', 'Canvas API', 'D3.js', 'Vite'],
    metrics: [
      { label: 'Algorithms Covered', value: '65+' },
      { label: 'Monthly Visitors', value: '12K+' }
    ],
    contributors: [
      { name: 'Harsh Agarwal', role: 'CP Lead' },
      { name: 'Ria Das', role: 'Frontend Dev' }
    ],
    githubUrl: 'https://github.com/amity-coding-club/algopack',
    liveUrl: 'https://algopack.amitycodingclub.org',
    previewType: 'code',
    status: 'Production',
    version: 'v1.4.0'
  }
];
