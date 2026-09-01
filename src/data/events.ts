export interface EventItem {
  id: string;
  code: string;
  month: string;
  day: string;
  year: string;
  time: string;
  title: string;
  subtitle: string;
  category: 'Hackathons' | 'AI / ML' | 'Workshops' | 'Open Source' | 'Keynotes';
  format: 'In-Person (Campus)' | 'Hybrid' | 'Virtual';
  location: string;
  attendeesCount: string;
  capacity?: string;
  registrationDeadline?: string;
  description: string;
  fullDescription?: string;
  banner: string;
  prizes?: string;
  tags: string[];
  highlights?: string[];
  prerequisites?: string[];
  agenda: { time: string; topic: string; speaker?: string }[];
  speakers: { name: string; title: string; company: string; avatar?: string }[];
  status: 'Upcoming' | 'Registration Open' | 'Sold Out' | 'Completed';
  featuredOnHome: boolean;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'hackathon-3-0',
    code: '#01',
    month: 'MAY',
    day: '24',
    year: '2026',
    time: '09:00 AM - 09:00 PM (36 Hours)',
    title: 'Hackathon 3.0',
    subtitle: '500+ Participants • $5,000 Prize Pool',
    category: 'Hackathons',
    format: 'In-Person (Campus)',
    location: 'Main Auditorium & Innovation Labs, Sector 125, Noida',
    attendeesCount: '500+ Participants',
    capacity: '600 Builders Max',
    registrationDeadline: 'May 20, 2026 (11:59 PM IST)',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    prizes: '$5,000 Total Prize Pool + $25k Cloud Credits + Startup Fast-Tracks',
    tags: ['Fullstack', 'AI/ML', 'Web3', 'Mobile', 'DevOps'],
    highlights: [
      '36 Hours of Non-stop Rapid Prototyping',
      '1-on-1 Engineering Mentorship from Google, Razorpay & Stripe Engineers',
      'Direct On-Spot Interviews & Internships for Top 10 Teams',
      'Exclusive Amity Coding Club Swag Packs, Hardware Kits & Free Meals'
    ],
    prerequisites: [
      'Bring your laptop, charger, and valid Student / University ID',
      'Teams of 2 to 4 members (solo participants can match at team formation)',
      'Basic familiarity with Git and modern development frameworks'
    ],
    description: 'Amity’s largest annual student hackathon. 36 hours of non-stop building, mentoring from Tier-1 engineers, and direct hiring interviews with top tech startups.',
    fullDescription: 'Join hundreds of developers, designers, and innovators for Amity’s premier 36-hour hackathon. Whether you are building autonomous AI agents, next-generation web applications, decentralised protocols, or systems infrastructure, Hackathon 3.0 provides the hardware, cloud infrastructure, mentorship, and VC connections to take your prototype from zero to production.',
    agenda: [
      { time: '09:00 AM', topic: 'Opening Keynote & Problem Statements Release' },
      { time: '11:00 AM', topic: 'Hacking Begins & Mentor Matching' },
      { time: '02:00 PM', topic: 'Tech Talk: Scaling Microservices Under Load' },
      { time: '07:00 PM', topic: 'Midnight Lightning Pitch Round' },
      { time: '09:00 AM (Day 2)', topic: 'Code Freeze & Devpost Project Submission' },
      { time: '04:00 PM (Day 2)', topic: 'Grand Finale Demos & Award Ceremony' }
    ],
    speakers: [
      { name: 'Arjun Kapoor', title: 'Staff Engineer', company: 'Google' },
      { name: 'Megha Singhania', title: 'VP of Engineering', company: 'Razorpay' }
    ],
    status: 'Registration Open',
    featuredOnHome: true
  },
  {
    id: 'aiml-workshop-llms',
    code: '#02',
    month: 'JUN',
    day: '08',
    year: '2026',
    time: '02:00 PM - 06:00 PM IST',
    title: 'AI/ML Workshop',
    subtitle: 'Build with LLMs & Autonomous Agents',
    category: 'AI / ML',
    format: 'Hybrid',
    location: 'CS Lab 304 + Live Stream',
    attendeesCount: '250+ Registered',
    capacity: '100 Onsite Seats + Unlimited Stream',
    registrationDeadline: 'June 06, 2026',
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    prizes: 'Free OpenAI & Anthropic API Credits for Attendees + Certificate of Mastery',
    tags: ['LLMs', 'RAG Pipelines', 'LangGraph', 'ChromaDB', 'LoRA Fine-tuning'],
    highlights: [
      'Deep dive into Transformer attention mechanisms and vector embeddings',
      'Live code-along: build a production-grade multi-agent research assistant',
      'Fine-tuning open source models (Llama 3 & DeepSeek) with LoRA/QLoRA',
      'Deploying LLM endpoints with high-throughput vLLM inference servers'
    ],
    prerequisites: [
      'Intermediate Python knowledge (classes, async, typing)',
      'Familiarity with Git and virtual environments (conda/poetry)',
      'Google Colab account or local CUDA GPU environment'
    ],
    description: 'Hands-on deep dive into building retrieval-augmented generation (RAG) pipelines, function calling agents, and fine-tuning open-source models with LoRA.',
    fullDescription: 'Autonomous AI is transforming the software industry. In this intensive 4-hour hands-on workshop, you will go beyond simple prompt engineering to build enterprise-grade agentic workflows with LangGraph, ChromaDB vector stores, and custom LoRA adapters deployed directly onto the cloud.',
    agenda: [
      { time: '02:00 PM', topic: 'Transformers Architecture & Attention Deep Dive' },
      { time: '03:15 PM', topic: 'Hands-on: Building a RAG Pipeline with ChromaDB' },
      { time: '04:45 PM', topic: 'Multi-Agent Orchestration with LangGraph' },
      { time: '05:30 PM', topic: 'Fine-Tuning Open Source LLMs with LoRA & Q&A' }
    ],
    speakers: [
      { name: 'Dr. Sameer Joshi', title: 'Principal AI Researcher', company: 'DeepMind Fellow' },
      { name: 'Priya Patel', title: 'AI/ML Lead', company: 'Amity Coding Club' }
    ],
    status: 'Registration Open',
    featuredOnHome: true
  },
  {
    id: 'codefest-2026',
    code: '#03',
    month: 'JUN',
    day: '27',
    year: '2026',
    time: '10:00 AM - 10:00 AM (24 Hours)',
    title: 'CodeFest 2026',
    subtitle: '24 Hours of Code & Algorithmic Clashes',
    category: 'Workshops',
    format: 'In-Person (Campus)',
    location: 'Amity Central Library Concourse',
    attendeesCount: '350+ Coders',
    capacity: '400 Participants',
    registrationDeadline: 'June 25, 2026',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    prizes: '$2,500 Cash Prizes + Mechanical Keyboards + ICPC Camp Invitations',
    tags: ['Competitive Programming', 'Algorithms', 'Data Structures', 'Debugging Duel'],
    highlights: [
      '3-Tier Algorithmic Elimination Tournament',
      'Live Mystery Bug CTF challenge under real-time leaderboards',
      'Speed prototyping showdown with instant automated test validation',
      'Exclusive workshop on Dynamic Programming on Trees and Graphs'
    ],
    prerequisites: [
      'Laptop with preferred CP environment (C++, Java, or Python)',
      'Active Codeforces / LeetCode profile',
      'Enthusiasm for high-intensity problem solving under clock pressure'
    ],
    description: 'A 24-hour sprint combining rapid software prototyping, algorithmic speed rounds, and competitive debugging duels under high time pressure.',
    fullDescription: 'CodeFest 2026 tests your algorithmic grit, dynamic programming mastery, and bug-hunting reflexes. Compete solo or in pairs across three intense rounds designed by ICPC World Finalists and FAANG engineers.',
    agenda: [
      { time: '10:00 AM', topic: 'Algorithmic Speed Duel Stage 1 (Easy-Medium)' },
      { time: '02:00 PM', topic: 'Fullstack Micro-App Sprint (4 Hours)' },
      { time: '08:00 PM', topic: 'Mystery Bug CTF Tournament' },
      { time: '02:00 AM', topic: 'Hardcore Graph & DP Final Round' },
      { time: '09:00 AM', topic: 'Leaderboard Unveil & Trophy Presentation' }
    ],
    speakers: [
      { name: 'Harsh Agarwal', title: 'ICPC World Finalist', company: 'ACC CP Lead' }
    ],
    status: 'Registration Open',
    featuredOnHome: true
  },
  {
    id: 'open-source-day',
    code: '#04',
    month: 'JUL',
    day: '15',
    year: '2026',
    time: '11:00 AM - 05:00 PM IST',
    title: 'Open Source Day',
    subtitle: 'Build. Contribute. Inspire.',
    category: 'Open Source',
    format: 'Virtual',
    location: 'Discord Community Stage + GitHub Workshop',
    attendeesCount: '400+ Contributors',
    capacity: 'Open to All',
    registrationDeadline: 'July 14, 2026',
    banner: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80',
    prizes: 'GitHub Swag Kits + Fast-Track GSoC Mentorship Sessions',
    tags: ['Git', 'GitHub', 'Open Source', 'GSoC', 'CI/CD'],
    highlights: [
      'Step-by-step guidance to landing your first Pull Request on major repos',
      'Mastering interactive Git rebase, cherry-pick, and merge conflict resolution',
      'Insider roadmap to cracking Google Summer of Code (GSoC) & LFX',
      'Direct contribution sprint to popular open source frameworks'
    ],
    prerequisites: [
      'GitHub account set up with SSH keys configured',
      'Git installed locally on terminal',
      'Curiosity to read other developers’ code and submit improvements'
    ],
    description: 'Learn Git workflows, understand licensing, and submit your first Pull Request to high-impact open source repositories with 1-on-1 mentorship.',
    fullDescription: 'Open Source powers modern software engineering. Join us on Discord and GitHub as seasoned open-source maintainers walk you through codebase navigation, good first issues, licensing, pull request etiquette, and automated CI pipelines.',
    agenda: [
      { time: '11:00 AM', topic: 'Git Internals & Advanced Rebase Mastery' },
      { time: '01:00 PM', topic: 'Tackling "Good First Issues" Live on Stream' },
      { time: '03:30 PM', topic: 'Becoming an OSS Maintainer & GSoC Roadmap' },
      { time: '04:30 PM', topic: 'Community PR Review Sprint & Wrap-up' }
    ],
    speakers: [
      { name: 'Karan Mehra', title: 'Kubernetes Contributor', company: 'Amity Alumni' }
    ],
    status: 'Registration Open',
    featuredOnHome: true
  },
  {
    id: 'systems-rust-deep-dive',
    code: '#05',
    month: 'AUG',
    day: '04',
    year: '2026',
    time: '04:00 PM - 07:00 PM IST',
    title: 'Systems Engineering with Rust',
    subtitle: 'Memory Safety, Concurrency & WASM',
    category: 'Workshops',
    format: 'In-Person (Campus)',
    location: 'Lab 201, Engineering Block',
    attendeesCount: '120 Seats Max',
    capacity: '120 Seats (Strict Limit)',
    registrationDeadline: 'August 02, 2026',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    prizes: 'Rust Programming Books + Custom Ferrite Crab Pins & Stickers',
    tags: ['Rust', 'Systems Programming', 'Concurrency', 'WebAssembly', 'Memory Safety'],
    highlights: [
      'Conquering the Rust Borrow Checker without fighting the compiler',
      'Zero-cost abstractions, traits, and memory-safe concurrency',
      'Compiling Rust to WebAssembly (WASM) for ultra-fast browser logic',
      'Live build: Multi-threaded asynchronous TCP server with Tokio'
    ],
    prerequisites: [
      'Rust toolchain installed via rustup (rustc 1.78+)',
      'VS Code with rust-analyzer extension',
      'Fundamental understanding of pointers and stack vs heap'
    ],
    description: 'Explore Rust ownership model, fearless concurrency, and compiling systems modules to WebAssembly for browser deployment.',
    fullDescription: 'Rust is revolutionizing operating systems, browsers, high-frequency trading, and cloud infrastructure. In this 3-hour intensive session, we demystify ownership, lifetimes, unsafe blocks, and compile real-time modules into high-speed WebAssembly.',
    agenda: [
      { time: '04:00 PM', topic: 'Borrow Checker & Lifetimes Visualized' },
      { time: '04:45 PM', topic: 'Fearless Concurrency & Channel Communication' },
      { time: '05:30 PM', topic: 'Writing a Multi-threaded Web Server from Scratch' },
      { time: '06:30 PM', topic: 'WASM Compilation & In-Browser Execution' }
    ],
    speakers: [
      { name: 'Vikram Sethi', title: 'Systems Engineer', company: 'Amity Coding Club' }
    ],
    status: 'Registration Open',
    featuredOnHome: false
  },
  {
    id: 'cloud-devops-summit',
    code: '#06',
    month: 'AUG',
    day: '22',
    year: '2026',
    time: '10:00 AM - 04:00 PM IST',
    title: 'Cloud & DevOps Summit',
    subtitle: 'Kubernetes, Terraform & CI/CD Pipelines',
    category: 'Keynotes',
    format: 'Hybrid',
    location: 'Amity Tech Amphitheater',
    attendeesCount: '300+ Attendees',
    capacity: '300 Campus Seats + Online',
    registrationDeadline: 'August 20, 2026',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    prizes: 'AWS Cloud Certification Vouchers & ACC Cloud Badges',
    tags: ['Kubernetes', 'Terraform', 'Docker', 'AWS', 'OpenTelemetry', 'DevOps'],
    highlights: [
      'Production cluster provisioning with Terraform and GitOps (ArgoCD)',
      'Zero-downtime rolling deployments and blue/green traffic shifting',
      'Observability in distributed microservices with OpenTelemetry & Grafana',
      'Cloud Architecture panel with AWS & Azure certified architects'
    ],
    prerequisites: [
      'Basic familiarity with Linux command line and Docker',
      'Free-tier AWS account configured',
      'Laptop for hands-on cluster interaction'
    ],
    description: 'Industry practitioners demonstrate how production-grade cloud architectures operate at scale with zero-downtime deployments.',
    fullDescription: 'Learn how modern tech enterprises architect resilient, multi-region cloud infrastructures handling millions of requests per second. From declarative infrastructure with Terraform to self-healing Kubernetes clusters and distributed telemetry, this summit provides actionable architectural patterns.',
    agenda: [
      { time: '10:00 AM', topic: 'Modern Infrastructure as Code with Terraform' },
      { time: '11:30 AM', topic: 'Deploying High-Availability Kubernetes Workloads' },
      { time: '01:30 PM', topic: 'Observability & Distributed Tracing with OpenTelemetry' },
      { time: '03:00 PM', topic: 'Architect Panel: Lessons from 99.99% Uptime Systems' }
    ],
    speakers: [
      { name: 'Nikhil Verma', title: 'Cloud Architect', company: 'AWS Community Hero' }
    ],
    status: 'Registration Open',
    featuredOnHome: false
  }
];
