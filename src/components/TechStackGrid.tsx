'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Server, Brain, Cloud,
  ChevronRight, ExternalLink, Zap,
  GitBranch, BarChart3, Activity
} from 'lucide-react';

/* ─── Data Types ─── */
interface TechItem {
  name: string;
  role: string;
  project: string;
  repo: string;
  description: string;
  tags: string[];
  stats: { loc: string; projects: number; score: string };
}

interface TechCategory {
  domain: string;
  num: string;
  description: string;
  icon: React.ReactNode;
  technologies: TechItem[];
}

/* ─── Tech Data ─── */
const TECH_CATEGORIES: TechCategory[] = [
  {
    domain: 'FRONTEND',
    num: '01',
    description: 'Component architecture, state sync & fluid micro-interactions.',
    icon: <Code2 size={18} />,
    technologies: [
      {
        name: 'React 19',
        role: 'UI Foundation',
        project: 'AI Campus Navigator',
        repo: 'campus-navigator',
        description: 'Building resilient, interactive UI with a component-first architecture and modern state management.',
        tags: ['Components', 'Hooks', 'Context API', 'Suspense'],
        stats: { loc: '12K+', projects: 3, score: '98%' }
      },
      {
        name: 'Next.js 15',
        role: 'App Router & SSR',
        project: 'Amity OS Portal',
        repo: 'amity-os',
        description: 'Server-side rendering with React Server Components, streaming, and edge-first deployments.',
        tags: ['App Router', 'RSC', 'Edge Functions', 'ISR'],
        stats: { loc: '8K+', projects: 2, score: '96%' }
      },
      {
        name: 'TypeScript',
        role: 'Type Safety',
        project: 'CodeCollab IDE',
        repo: 'codecollab-ide',
        description: 'End-to-end type safety across monorepos with strict mode, generics, and discriminated unions.',
        tags: ['Strict Mode', 'Generics', 'Zod', 'tRPC'],
        stats: { loc: '24K+', projects: 5, score: '99%' }
      },
      {
        name: 'Tailwind / Vanilla CSS',
        role: 'Design Tokens',
        project: 'ACC Web 2026',
        repo: 'acc-web',
        description: 'Utility-first styling combined with custom properties for a cohesive, maintainable design system.',
        tags: ['Utility-First', 'CSS Variables', 'Responsive', 'Motion'],
        stats: { loc: '6K+', projects: 4, score: '95%' }
      }
    ]
  },
  {
    domain: 'BACKEND',
    num: '02',
    description: 'Distributed microservices, high-throughput RPCs & caching layers.',
    icon: <Server size={18} />,
    technologies: [
      {
        name: 'Node.js / Bun',
        role: 'Edge Runtimes',
        project: 'Amity OS Backend',
        repo: 'amity-os-api',
        description: 'High-performance JavaScript runtimes powering real-time APIs with WebSocket and event-driven architecture.',
        tags: ['Express', 'tRPC', 'WebSocket', 'Streams'],
        stats: { loc: '15K+', projects: 3, score: '97%' }
      },
      {
        name: 'Python / FastAPI',
        role: 'High-speed Async API',
        project: 'DevHunt AI Backend',
        repo: 'devhunt',
        description: 'Async Python APIs with automatic OpenAPI docs, dependency injection, and Pydantic validation.',
        tags: ['AsyncIO', 'Pydantic', 'OpenAPI', 'SQLAlchemy'],
        stats: { loc: '9K+', projects: 2, score: '94%' }
      },
      {
        name: 'Go / Rust',
        role: 'Systems Concurrency',
        project: 'CodeCollab Engine',
        repo: 'codecollab-engine',
        description: 'Memory-safe systems programming for real-time collaboration engines and concurrent task schedulers.',
        tags: ['Goroutines', 'Channels', 'Tokio', 'WASM'],
        stats: { loc: '11K+', projects: 2, score: '99%' }
      },
      {
        name: 'PostgreSQL & Redis',
        role: 'Data Layer & Caching',
        project: 'ACC Club Hub',
        repo: 'acc-hub',
        description: 'Relational data modeling with advanced indexing, pub/sub event buses, and in-memory caching layers.',
        tags: ['JSONB', 'Full-Text', 'Pub/Sub', 'Streams'],
        stats: { loc: '5K+', projects: 4, score: '96%' }
      }
    ]
  },
  {
    domain: 'AI & MACHINE LEARNING',
    num: '03',
    description: 'Vector embeddings, neural pathfinding & autonomous agent swarms.',
    icon: <Brain size={18} />,
    technologies: [
      {
        name: 'PyTorch',
        role: 'Deep Learning',
        project: 'Vision Attendance',
        repo: 'vision-ai',
        description: 'Training and deploying deep neural networks for computer vision and natural language understanding.',
        tags: ['CNNs', 'Transformers', 'CUDA', 'ONNX'],
        stats: { loc: '7K+', projects: 2, score: '92%' }
      },
      {
        name: 'TensorFlow',
        role: 'Edge Inference',
        project: 'AI Campus Navigator',
        repo: 'campus-navigator',
        description: 'Optimized inference pipelines for on-device AI with TensorFlow Lite and model quantization.',
        tags: ['TFLite', 'Quantization', 'SavedModel', 'Serving'],
        stats: { loc: '4K+', projects: 1, score: '89%' }
      },
      {
        name: 'ChromaDB / pgvector',
        role: 'Vector Search',
        project: 'DevHunt Matchmaker',
        repo: 'devhunt',
        description: 'Semantic search and similarity matching with vector embeddings and approximate nearest neighbors.',
        tags: ['Embeddings', 'ANN', 'HNSW', 'Cosine'],
        stats: { loc: '3K+', projects: 2, score: '91%' }
      },
      {
        name: 'LLM Orchestration',
        role: 'LangGraph & RAG',
        project: 'Syllabus AI Agent',
        repo: 'syllabus-ai',
        description: 'Multi-agent orchestration with retrieval-augmented generation, tool calling, and reasoning chains.',
        tags: ['LangChain', 'RAG', 'Tool Calling', 'Agents'],
        stats: { loc: '6K+', projects: 2, score: '87%' }
      }
    ]
  },
  {
    domain: 'CLOUD & INFRA',
    num: '04',
    description: 'Container pipelines, Kubernetes clusters & telemetry meshes.',
    icon: <Cloud size={18} />,
    technologies: [
      {
        name: 'AWS & GCP',
        role: 'Cloud Infrastructure',
        project: 'Hackathon Cloud',
        repo: 'hack-infra',
        description: 'Multi-cloud deployments with IaC, auto-scaling compute, and managed database services.',
        tags: ['Lambda', 'Cloud Run', 'Terraform', 'CDN'],
        stats: { loc: '2K+', projects: 3, score: '95%' }
      },
      {
        name: 'Docker & K8s',
        role: 'Container Orchestration',
        project: 'CodeCollab Sandbox',
        repo: 'sandbox-k8s',
        description: 'Containerized microservices with Kubernetes orchestration, Helm charts, and rolling deployments.',
        tags: ['Compose', 'Helm', 'Ingress', 'HPA'],
        stats: { loc: '3K+', projects: 2, score: '97%' }
      },
      {
        name: 'TimescaleDB / MQTT',
        role: 'IoT Telemetry Mesh',
        project: 'EcoPulse Campus Grid',
        repo: 'ecopulse-iot',
        description: 'Time-series data pipelines with MQTT brokers for real-time IoT sensor telemetry and alerting.',
        tags: ['Time-Series', 'MQTT', 'Grafana', 'Alerts'],
        stats: { loc: '4K+', projects: 1, score: '93%' }
      },
      {
        name: 'GitHub Actions',
        role: 'Automated CI/CD',
        project: 'ACC Core Repos',
        repo: 'ci-pipelines',
        description: 'Automated build, test, and deploy pipelines with matrix testing and artifact caching.',
        tags: ['Workflows', 'Matrix', 'Caching', 'Secrets'],
        stats: { loc: '1K+', projects: 6, score: '99%' }
      }
    ]
  }
];

export default function TechStackGrid() {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleTechClick = (tech: TechItem) => {
    if (selectedTech?.name === tech.name) {
      setSelectedTech(null);
    } else {
      setSelectedTech(tech);
    }
  };

  // Scroll expanded card into view
  useEffect(() => {
    if (selectedTech && detailRef.current) {
      const timeout = setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [selectedTech]);

  return (
    <section className="tech-stack-section" aria-label="Developer Technologies">
      <div className="container">
        {/* Section Header */}
        <div className="tech-header">
          <div className="section-meta">
            <span>05 / TECHNICAL ECOSYSTEM</span>
          </div>
          <h2 className="section-title">Technologies we engineer with.</h2>
          <p className="section-description">
            We focus on production-grade tools, modern paradigms, and high-performance stacks.
            Click any technology to see active club implementations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="tech-categories-grid">
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.domain} className="tech-category-card">
              <div className="category-header">
                <div className="category-header-top">
                  <span className="domain-num">{cat.num}</span>
                  <span className="domain-icon">{cat.icon}</span>
                </div>
                <span className="domain-label">{cat.domain}</span>
                <p className="domain-desc">{cat.description}</p>
              </div>

              <div className="tech-items-stack">
                {cat.technologies.map((tech) => {
                  const isSelected = selectedTech?.name === tech.name;
                  return (
                    <div
                      key={tech.name}
                      className={`tech-row-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleTechClick(tech)}
                    >
                      <div className="tech-main-info">
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-role">{tech.role}</span>
                      </div>
                      <div className="tech-active-badge">
                        <span className="dot" />
                        <span className="project-tag">{tech.project}</span>
                        <ChevronRight
                          size={12}
                          className="chevron-icon"
                          style={{
                            transform: isSelected ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Expanded Detail Card ─── */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              ref={detailRef}
              className="tech-detail-card"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="detail-inner">
                {/* Left: Tech Info */}
                <div className="detail-left">
                  <div className="detail-header">
                    <span className="detail-label">ACTIVE TECHNOLOGY</span>
                    <h3 className="detail-name">{selectedTech.name}</h3>
                    <span className="detail-role">{selectedTech.role}</span>
                  </div>
                  <p className="detail-desc">{selectedTech.description}</p>
                  <div className="detail-tags">
                    {selectedTech.tags.map((tag) => (
                      <span key={tag} className="detail-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Center: Used-in Project */}
                <div className="detail-center">
                  <div className="detail-section-label">
                    <Activity size={12} />
                    <span>USED IN</span>
                  </div>
                  <span className="detail-sub">Active club implementations</span>

                  <div className="detail-project-card">
                    <div className="project-card-icon">
                      <Zap size={20} />
                    </div>
                    <div className="project-card-info">
                      <span className="project-card-name">{selectedTech.project}</span>
                      <span className="project-card-desc">
                        Production application using {selectedTech.name}
                      </span>
                    </div>
                    <ChevronRight size={16} className="project-card-arrow" />
                  </div>
                </div>

                {/* Right: Impact Stats */}
                <div className="detail-right">
                  <div className="detail-section-label">
                    <BarChart3 size={12} />
                    <span>IMPACT</span>
                  </div>
                  <span className="detail-sub">Real results with this technology</span>

                  <div className="detail-stats">
                    <div className="stat-row">
                      <Code2 size={16} className="stat-icon" />
                      <span className="stat-value">{selectedTech.stats.loc}</span>
                      <span className="stat-label">Lines of Code</span>
                    </div>
                    <div className="stat-row">
                      <GitBranch size={16} className="stat-icon" />
                      <span className="stat-value">{selectedTech.stats.projects}</span>
                      <span className="stat-label">Active Projects</span>
                    </div>
                    <div className="stat-row">
                      <Activity size={16} className="stat-icon" />
                      <span className="stat-value">{selectedTech.stats.score}</span>
                      <span className="stat-label">Performance Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .tech-stack-section {
          padding: 80px 0;
          background-color: var(--canvas-primary);
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .tech-header {
          margin-bottom: 48px;
        }

        /* ─── Categories Grid ─── */
        .tech-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .tech-category-card {
          background-color: var(--canvas-primary);
          border: 1px solid var(--hairline);
          border-radius: 18px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease;
        }

        .tech-category-card:hover {
          border-color: rgba(91, 61, 245, 0.2);
        }

        .category-header {
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .category-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .domain-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }

        :global(.domain-icon) {
          color: var(--accent-primary);
          opacity: 0.6;
        }

        .domain-label {
          font-family: var(--font-mono);
          font-size: 0.78125rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--ink-heading);
          display: block;
          margin-bottom: 6px;
        }

        .domain-desc {
          font-size: 0.8125rem;
          color: var(--ink-secondary);
          line-height: 1.45;
        }

        /* ─── Tech Row Items ─── */
        .tech-items-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tech-row-item {
          padding: 10px 12px;
          border-radius: 10px;
          background: var(--canvas-subtle, #F8FAFC);
          border: 1.5px solid transparent;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .tech-row-item:hover {
          background: #FFFFFF;
          border-color: rgba(91, 61, 245, 0.2);
          box-shadow: 0 4px 12px rgba(91, 61, 245, 0.06);
          transform: translateX(3px);
        }

        .tech-row-item.selected {
          background: #FFFFFF;
          border-color: var(--accent-primary);
          box-shadow: 0 4px 16px rgba(91, 61, 245, 0.12);
        }

        .tech-main-info {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .tech-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink-heading);
        }

        .tech-role {
          font-size: 0.6875rem;
          color: var(--ink-secondary);
        }

        .tech-active-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tech-active-badge .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-primary);
        }

        .project-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--ink-muted);
          flex: 1;
        }

        :global(.chevron-icon) {
          color: var(--ink-muted);
          flex-shrink: 0;
        }

        .tech-row-item:hover .project-tag,
        .tech-row-item.selected .project-tag {
          color: var(--accent-primary);
        }

        .tech-row-item:hover :global(.chevron-icon),
        .tech-row-item.selected :global(.chevron-icon) {
          color: var(--accent-primary);
        }

        /* ─── Expanded Detail Card ─── */
        :global(.tech-detail-card) {
          margin-top: 28px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #0B0F1A 0%, #111827 100%);
          border: 1px solid rgba(91, 61, 245, 0.2);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.2);
        }

        .detail-inner {
          display: grid;
          grid-template-columns: 1.1fr 1fr 0.9fr;
          gap: 0;
          min-height: 240px;
        }

        /* Left Panel */
        .detail-left {
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .detail-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: #5B3DF5;
          letter-spacing: 0.08em;
        }

        .detail-name {
          font-size: 1.75rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .detail-role {
          font-size: 0.875rem;
          font-weight: 500;
          color: #94A3B8;
        }

        .detail-desc {
          font-size: 0.875rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .detail-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: #5B3DF5;
          background: rgba(91, 61, 245, 0.12);
          border: 1px solid rgba(91, 61, 245, 0.2);
          padding: 3px 10px;
          border-radius: 6px;
        }

        /* Center Panel */
        .detail-center {
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .detail-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: #5B3DF5;
          letter-spacing: 0.08em;
        }

        .detail-sub {
          font-size: 0.75rem;
          color: #64748B;
        }

        .detail-project-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 16px;
          margin-top: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .detail-project-card:hover {
          background: rgba(91, 61, 245, 0.08);
          border-color: rgba(91, 61, 245, 0.3);
        }

        .project-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(91, 61, 245, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #8B5CF6;
        }

        .project-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .project-card-name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #F1F5F9;
        }

        .project-card-desc {
          font-size: 0.75rem;
          color: #64748B;
          line-height: 1.4;
        }

        :global(.project-card-arrow) {
          color: #475569;
          flex-shrink: 0;
        }

        /* Right Panel */
        .detail-right {
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-stats {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
        }

        .stat-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        :global(.stat-icon) {
          color: #5B3DF5;
          flex-shrink: 0;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: #F1F5F9;
          min-width: 50px;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: #64748B;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .tech-categories-grid {
            grid-template-columns: 1fr 1fr;
          }
          .detail-inner {
            grid-template-columns: 1fr;
          }
          .detail-left,
          .detail-center {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
        }

        @media (max-width: 640px) {
          .tech-categories-grid {
            grid-template-columns: 1fr;
          }
          .detail-left,
          .detail-center,
          .detail-right {
            padding: 24px 20px;
          }
          .detail-name {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  );
}
