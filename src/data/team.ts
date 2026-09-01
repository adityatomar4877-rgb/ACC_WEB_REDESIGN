export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: 'Leadership' | 'Core Leads' | 'Technical Mentors' | 'Alumni';
  bio: string;
  avatarInitials: string;
  focus: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  projectsLed?: string[];
  isLeadership?: boolean;
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'aditya-vardhan',
    name: 'Aditya Vardhan',
    role: 'President & AI Lead',
    group: 'Leadership',
    bio: 'Architecting developer ecosystems and building intelligent systems. Passionate about machine learning infrastructure and open-source tooling.',
    avatarInitials: 'AV',
    focus: ['Machine Learning', 'Systems Architecture', 'Distributed Systems'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    projectsLed: ['AI Campus Navigator', 'DevHunt AI'],
    isLeadership: true
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    role: 'Vice President & Frontend Lead',
    group: 'Leadership',
    bio: 'Specializing in design systems, micro-interactions, and accessible web standards. Bridging human-centered design with high-performance React architectures.',
    avatarInitials: 'PP',
    focus: ['Design Systems', 'React / Next.js', 'Web Performance'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    projectsLed: ['ACC Design System', 'Amity OS'],
    isLeadership: true
  },
  {
    id: 'siddharth-rao',
    name: 'Siddharth Rao',
    role: 'Technical Director',
    group: 'Leadership',
    bio: 'Backend enthusiast focused on distributed databases, event-driven architectures, and high-concurrency microservices.',
    avatarInitials: 'SR',
    focus: ['Distributed Systems', 'Go / Rust', 'Kubernetes'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    projectsLed: ['Amity OS Backend', 'CodeCollab Engine'],
    isLeadership: true
  },
  {
    id: 'ananya-gupta',
    name: 'Ananya Gupta',
    role: 'Head of Product & Design',
    group: 'Leadership',
    bio: 'Crafting minimalist, intuitive developer tools with Apple & Airbnb design disciplines. Advocate for typography and ergonomic UX.',
    avatarInitials: 'AG',
    focus: ['Product Design', 'Design Tokens', 'Interaction Design'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    projectsLed: ['ACC Website 2026', 'DevHunt UI'],
    isLeadership: true
  },
  {
    id: 'harsh-agarwal',
    name: 'Harsh Agarwal',
    role: 'Competitive Programming Lead',
    group: 'Core Leads',
    bio: 'Candidate Master on Codeforces, ICPC Regionalist. Training students in graph algorithms, DP optimization, and mathematical proofs.',
    avatarInitials: 'HA',
    focus: ['Algorithms', 'C++', 'Data Structures'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    projectsLed: ['AlgoPack Library', 'Weekly CP Contests']
  },
  {
    id: 'vikram-sethi',
    name: 'Vikram Sethi',
    role: 'Cloud & DevOps Lead',
    group: 'Core Leads',
    bio: 'Automating CI/CD pipelines, container orchestration, and serverless edge deployments on AWS and GCP.',
    avatarInitials: 'VS',
    focus: ['Docker', 'Terraform', 'AWS', 'CI/CD'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    projectsLed: ['Club Infrastructure', 'Edge Deployments']
  },
  {
    id: 'tanvi-nair',
    name: 'Tanvi Nair',
    role: 'Data Science & Research Lead',
    group: 'Core Leads',
    bio: 'Investigating deep learning model interpretability, computer vision, and ethical AI applications in education.',
    avatarInitials: 'TN',
    focus: ['PyTorch', 'Computer Vision', 'Data Ethics'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    projectsLed: ['EcoPulse Analytics']
  },
  {
    id: 'karan-mehra',
    name: 'Karan Mehra',
    role: 'Open Source Coordinator',
    group: 'Core Leads',
    bio: 'Active upstream contributor to open-source developer tooling. Guiding freshmen through their first pull requests and GSoC proposals.',
    avatarInitials: 'KM',
    focus: ['Rust', 'WebAssembly', 'Open Source'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    projectsLed: ['CodeCollab IDE']
  },
  {
    id: 'dr-sameer-joshi',
    name: 'Dr. Sameer Joshi',
    role: 'Faculty Mentor & Research Advisor',
    group: 'Technical Mentors',
    bio: 'Professor of Computer Science & Engineering. Guiding academic research papers, patent filings, and club innovation grants.',
    avatarInitials: 'SJ',
    focus: ['Distributed AI', 'Computer Networks', 'Research Methodologies'],
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'rohan-sharma',
    name: 'Rohan Sharma',
    role: 'Alumni Advisor (Staff at Google)',
    group: 'Alumni',
    bio: 'Former ACC President (2023). Mentoring students on systems scalability, software engineering best practices, and career navigation.',
    avatarInitials: 'RS',
    focus: ['Large Scale Systems', 'Distributed Storage', 'Mentorship'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
];
