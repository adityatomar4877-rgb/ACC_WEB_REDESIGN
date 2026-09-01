'use client';

import React, { useState } from 'react';

export default function CodeEditor() {
  const [copied, setCopied] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const rawCode = `const amityCodingClub = {
  builders: 1248,
  projects: 84,
  events: 42,
  mission: 'Build. Learn. Ship.',
  impact: 'Creating developers of tomorrow'
};

function makeImpact() {
  ideas.forEach(idea => {
    build(idea);
    inspire(others);
  });
}`;

  const codeLines = [
    { num: '01', content: <><span className="kw">const</span> <span className="var">amityCodingClub</span> = &#123;</> },
    { num: '02', content: <><span className="indent" />&nbsp;&nbsp;<span className="prop">builders:</span> <span className="num">1248</span>,</> },
    { num: '03', content: <><span className="indent" />&nbsp;&nbsp;<span className="prop">projects:</span> <span className="num">84</span>,</> },
    { num: '04', content: <><span className="indent" />&nbsp;&nbsp;<span className="prop">events:</span> <span className="num">42</span>,</> },
    { num: '05', content: <><span className="indent" />&nbsp;&nbsp;<span className="prop">mission:</span> <span className="str">&apos;Build. Learn. Ship.&apos;</span>,</> },
    { num: '06', content: <><span className="indent" />&nbsp;&nbsp;<span className="prop">impact:</span> <span className="str">&apos;Creating developers of tomorrow&apos;</span></> },
    { num: '07', content: <>&#125;;</> },
    { num: '08', content: <>&nbsp;</> },
    { num: '09', content: <><span className="kw">function</span> <span className="fn">makeImpact</span>() &#123;</> },
    { num: '10', content: <><span className="indent" />&nbsp;&nbsp;<span className="var">ideas</span>.<span className="fn">forEach</span>(<span className="arg">idea</span> =&gt; &#123;</> },
    { num: '11', content: <><span className="indent" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">build</span>(<span className="arg">idea</span>);</> },
    { num: '12', content: <><span className="indent" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">inspire</span>(<span className="arg">others</span>);</> },
    { num: '13', content: <><span className="indent" />&nbsp;&nbsp;&#125;);</> },
    { num: '14', content: <>&#125;</> }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-editor-container">
      {/* Subtle Technical Atmosphere Annotations */}
      <div className="tech-annotation top-right">
        <span className="tech-dot" />
        <span className="tech-label">01 INITIALIZE</span>
      </div>

      <div className="tech-line" />
      <div className="tech-node" />

      <div className="tech-annotation bottom-right">
        <span className="tech-label">// COMMUNITY<br />CONNECTED</span>
      </div>

      {/* Main Code Window */}
      <div className="code-window">
        {/* Header */}
        <div className="window-header">
          <div className="window-controls">
            <span className="win-dot red" />
            <span className="win-dot yellow" />
            <span className="win-dot green" />
          </div>

          <div className="window-tab">
            <span className="tab-name">amity_coding_club.js</span>
          </div>

          <button
            type="button"
            className="copy-btn"
            onClick={handleCopy}
            title="Copy snippet"
            aria-label="Copy Code Snippet"
          >
            {copied ? (
              <span className="copied-text">Copied!</span>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="code-body" tabIndex={0} role="region" aria-label="JavaScript Code Snippet">
          <pre className="code-pre">
            <code>
              {codeLines.map((line, idx) => (
                <div
                  key={line.num}
                  className={`code-line ${activeLine === idx ? 'highlighted' : ''}`}
                  onMouseEnter={() => setActiveLine(idx)}
                  onMouseLeave={() => setActiveLine(null)}
                >
                  <span className="line-num">{line.num}</span>
                  <span className="line-content">{line.content}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <style jsx>{`
        .code-editor-container {
          position: relative;
          width: 100%;
          max-width: 540px;
          margin-left: auto;
        }

        /* Subtle technical background annotations */
        .tech-annotation {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #9CA3AF;
          user-select: none;
          pointer-events: none;
        }

        .tech-annotation.top-right {
          top: -24px;
          right: -40px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tech-annotation.bottom-right {
          bottom: -28px;
          right: -40px;
          text-align: right;
          line-height: 1.3;
        }

        .tech-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-primary);
        }

        .tech-line {
          position: absolute;
          top: -10px;
          right: -24px;
          width: 1px;
          height: calc(100% + 20px);
          background: linear-gradient(to bottom, transparent, rgba(209, 213, 219, 0.6), transparent);
          pointer-events: none;
        }

        .tech-node {
          position: absolute;
          top: 45%;
          right: -28px;
          width: 9px;
          height: 9px;
          border: 1px solid var(--accent-primary);
          background-color: #FFFFFF;
          border-radius: 2px;
          pointer-events: none;
        }

        /* Code Window */
        .code-window {
          background-color: #FFFFFF;
          border: 1px solid var(--hairline);
          border-radius: 16px;
          box-shadow: 0 20px 48px -12px rgba(17, 24, 39, 0.08), 0 2px 6px rgba(17, 24, 39, 0.03);
          overflow: hidden;
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }

        .code-window:hover {
          box-shadow: 0 28px 60px -12px rgba(17, 24, 39, 0.12), 0 4px 12px rgba(17, 24, 39, 0.04);
        }

        .window-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .window-controls {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .win-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .win-dot.red { background-color: #FF5F56; }
        .win-dot.yellow { background-color: #FFBD2E; }
        .win-dot.green { background-color: #27C93F; }

        .window-tab {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ink-secondary);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .copy-btn {
          color: var(--ink-muted);
          padding: 4px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast), background var(--transition-fast);
        }

        .copy-btn:hover {
          color: var(--ink-primary);
          background-color: var(--canvas-subtle);
        }

        .copied-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--status-online);
          font-weight: 600;
        }

        .code-body {
          padding: 16px 20px 20px;
          background-color: #FFFFFF;
          overflow-x: auto;
        }

        .code-pre {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          line-height: 1.7;
          letter-spacing: -0.01em;
          color: var(--ink-primary);
        }

        .code-line {
          display: flex;
          align-items: baseline;
          padding: 1px 6px;
          border-radius: 4px;
          transition: background-color var(--transition-fast);
        }

        .code-line.highlighted {
          background-color: rgba(0, 102, 204, 0.04);
        }

        .line-num {
          user-select: none;
          width: 32px;
          flex-shrink: 0;
          color: #9CA3AF;
          font-size: 0.75rem;
          font-weight: 400;
        }

        .code-line.highlighted .line-num {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .line-content {
          flex: 1;
          white-space: pre;
        }

        /* Restrained Syntax Highlighting */
        :global(.kw) { color: #8B5CF6; font-weight: 500; }
        :global(.var) { color: #1E293B; }
        :global(.prop) { color: #475569; }
        :global(.num) { color: #0284C7; font-weight: 500; }
        :global(.str) { color: #10B981; }
        :global(.fn) { color: #0066CC; font-weight: 500; }
        :global(.arg) { color: #64748B; font-style: italic; }

        @media (max-width: 1024px) {
          .code-editor-container {
            margin: 0 auto;
          }
          .tech-annotation, .tech-line, .tech-node {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .code-body {
            padding: 12px 14px 16px;
          }
          .code-pre {
            font-size: 0.75rem;
            line-height: 1.6;
          }
          .line-num {
            width: 26px;
          }
        }
      `}</style>
    </div>
  );
}
