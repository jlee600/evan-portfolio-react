import React, { useState, useEffect } from "react";
import {
  Github,
  Mail,
  MapPin,
  Link as LinkIcon,
  Briefcase,
  Star,
  BookOpen,
  Code2,
  Layers,
  ArrowUpRight,
  GithubIcon,
  Linkedin,
  FolderGit2,
  FileText,
  Spotlight,
  TrendingUp,
  Boxes,
  Sun, 
  Moon
} from "lucide-react";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from "recharts";

const globalCSS = `
:root {
  --bg: #ffffff;
  --shell-bg: #f6f8fa;
  --bg-subtle: #ffffff;
  --fg: #24292f;
  --fg-muted: #57606a;
  --border: #d0d7de;
  --border-subtle: #d8dee4;
  --accent: #0969da;
  --accent-soft: #ddf4ff;
  --shadow: 0 1px 0 rgba(31,35,40,0.04);
}
:root[data-theme="dark"] {
  --bg: #0d1117;
  --shell-bg: #010409; 
  --bg-subtle: #0d1117;  
  --fg: #c9d1d9;
  --fg-muted: #8b949e;
  --border: #30363d;
  --border-subtle: #21262d;
  --accent: #58a6ff;
  --accent-soft: #1f6feb33;
  --shadow: 0 0 0 rgba(0,0,0,0);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--fg);
}
`;

type TabId = "overview" | "experience" | "projects" | "skills" | "contact";
type ProjectTag = "Full Stack" | "Data" | "Systems";
type Project = {
  id: number;
  name: string;
  description: string;
  tech: string;
  year: string;
  href?: string; 
  demo?: string; 
  img?: string;
};

const IMPACT_AT_A_GLANCE = [
  {
    label: "Automation savings",
    value: "33%",
    detail:
      "Shorter analysis time across 27 research workflows with n8n + AI agents at KLSA",
  },
  {
    label: "Experiment setup",
    value: "55%",
    detail:
      "Faster Jetson controller setup from the real-time dashboard used by EPIC Lab researchers",
  },
  {
    label: "Deployments",
    value: "43%",
    detail:
      "Faster SDK deployment cycles after CI/CD work on GitHub Actions and AWS at SendSafely",
  },
];

const TECH_STACK_AT_A_GLANCE = [
  {
    label: "Languages",
    value: "Python · Java · SQL",
    detail: "C, TypeScript, JavaScript, and Assembly",
  },
  {
    label: "Backend & data",
    value: "FastAPI · REST · SQL",
    detail: "PostgreSQL, MySQL, SQLite, and data tooling",
  },
  {
    label: "Cloud & workflow",
    value: "AWS · GitHub Actions",
    detail: "KMS, S3, Secrets Manager, and n8n",
  },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Collab-Plan AI",
    description:
      "AI-powered meeting and conversation assistant with transcription.",
    tech: "Python · FastAPI · React · SQLite · HuggingFace",
    year: "2025",
    href: "https://github.com/jlee600/CollabPlan-AI",
    demo: "https://youtu.be/iZvC5hSalXE",
    img: "/img/collabplan.png",
  },
  {
    id: 2,
    name: "Hip-Exo Skeleton",
    description: "Development tools and controllers for a robotic hip exoskeleton platform.",
    tech: "Python · ML · Mechatronics",
    year: "2025",
    href: "https://www.epic.gatech.edu/projects/",
    img: "/img/hipexo.jpg",
  },
  {
    id: 3,
    name: "Master Exoskeleton Dashboard",
    description: "Live dashboard and launcher for exoskeleton controller scripts.",
    tech: "Python · SSH · Linux",
    year: "2025",
    href: "https://github.com/jlee600/Exo-Launcher",
    demo: "/img/exo_dashboard.pdf",
    img: "/img/rhex2.png",
  },
  {
    id: 4,
    name: "Pipelined LC-3200b CPU",
    description:
      "Five-stage pipelined CPU in CircuitSim with hazard detection",
    tech: "Assembly · CircuitSim · Excel",
    year: "2025",
    href: "https://github.com/jlee600/lc3200b-pipelined-processor",
    demo: "/img/lc3_report.pdf",
    img: "/img/lc3.png",
  },
  {
    id: 5,
    name: "Airline Management System",
    description: "MySQL database for managing airline operations and routes.",
    tech: "MySQL · Draw.io",
    year: "2025",
    href: "https://github.com/jlee600/Airline-Management-System",
    img: "/img/airline.png",
  },
  {
    id: 6,
    name: "Spotify-Wrapped Clone",
    description: "Android app surfacing personalized listening stats.",
    tech: "Java · Kotlin · Android Studio · SQLite · Spotify API",
    year: "2024",
    href: "https://github.com/jlee600/Spotify-Project",
    demo: "https://youtu.be/cEpOLU2JK2M",
    img: "/img/spotify.png",
  },
  {
    id: 7,
    name: "Han River EDA",
    description: "Exploratory data analysis on South Korea's Han River.",
    tech: "Python · Pandas · Matplotlib",
    year: "2023",
    href: "https://github.com/jlee600/HanRiverEDA/blob/main/Downloads/1302_project_1.ipynb",
    demo: "/img/eda_report.pdf",
    img: "/img/eda.png",
  },
];

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BookOpen size={15} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={15} /> },
  { id: "projects", label: "Projects", icon: <Layers size={15} /> },
  { id: "skills", label: "Skills", icon: <Code2 size={15} /> },
  { id: "contact", label: "Contact", icon: <Mail size={15} /> },
];

// small helper
function classNames(...list: Array<string | false | null | undefined>) {
  return list.filter(Boolean).join(" ");
}
function FocusMixRow({
  label,
  level,
}: {
  label: string;
  level: number;
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-[var(--fg-muted)]">{label}</span>
      <div className="ml-2">
        <LevelSquares level={level} />
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="min-h-screen">
      <style>{globalCSS}</style>

      {/* Top bar */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--shell-bg)] shadow-sm">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 h-14 flex items-center gap-3">
          <span className="text-sm text-[var(--fg-muted)]">EvanLee</span>
          <span className="text-sm text-[var(--fg-muted)] opacity-60">/</span>
          <span className="text-sm font-semibold text-[var(--fg)]">portfolio</span>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
            >
              {theme === "light" ? (
                <>
                  <Moon size={13} />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun size={13} />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto max-w-[1500px] px-4 md:px-6 pb-10 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left column / sidebar */}
          <aside className="w-full max-w-sm xl:max-w-md lg:sticky lg:top-20 space-y-4">
            {/* Avatar card */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full overflow-hidden border border-[var(--border-subtle)] bg-[#fff]">
                  <img
                    src="/img/profile.jpg"
                    alt="Evan Lee"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* text block */}
                <div className="pt-[2px]">
                  <div className="text-[17px] font-semibold leading-tight">
                    Evan Lee
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--fg-muted)]">
                    <span className="font-medium text-[var(--fg)]">Software engineer</span>
                    <span className="opacity-70"> · CS @ Georgia Tech</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-[var(--fg-muted)]">
                Backend and data focused developer who likes clean systems,
                fast feedback loops, and practical ML.
              </p>

              <div className="mt-3 flex flex-col gap-1 text-[13px] text-[var(--fg-muted)]">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>Atlanta, GA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GithubIcon size={14} />
                  <a
                    href="https://github.com/jlee600"
                    className="text-[var(--accent)] hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/jlee600
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={14} />
                  <a
                    href="/img/resume.pdf"
                    className="text-[var(--accent)] hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>

            {/* Small stats card like GitHub profile summary */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4">
              <div className="mt-2 flex items-center justify-between text-[12px] text-[var(--fg-muted)]">
                <span>Tech focus</span>
                <span className="font-semibold text-[var(--fg)]">
                  Backend · Data · AI
                </span>
                
              </div>
              <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
                <div className="space-y-1">
                  <FocusMixRow label="Backend" level={5} />
                  <FocusMixRow label="Data" level={5} />
                  <FocusMixRow label="DevOps" level={4} />
                  <FocusMixRow label="Frontend" level={3} />
                </div>
              </div>
            </div>
          </aside>

          {/* Right column / content */}
          <section className="flex-1 min-w-0 w-full">
            {/* Tabs */}
            <nav className="border-b border-[var(--border-subtle)] mb-4">
              <ul className="flex flex-wrap gap-2 text-[13px]">
                {TABS.map((tab) => {
                  const active = tab.id === activeTab;
                  return (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={classNames(
                          "inline-flex items-center gap-1.5 px-3 py-2 border-b-2 text-[13px]",
                          active
                            ? "border-[var(--accent)] text-[var(--fg)] font-semibold"
                            : "border-transparent text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-subtle)]"
                        )}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Active tab content */}
            <div>
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "experience" && <ExperienceTab />}
              {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "skills" && <SkillsTab />}
              {activeTab === "contact" && <ContactTab />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* -------------------- Overview -------------------- */

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* About */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold flex items-center gap-2 text-[var(--accent)]">
            <BookOpen size={16} className="text-[var(--fg-muted)]" />
            Overview
          </h2>

          <a
            href="/img/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[var(--accent)] hover:underline flex items-center gap-1"
          >
            Resume
            <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-[var(--fg-muted)] max-w-[70ch]">
          I am a Computer Science student at{" "}
          <span className="font-semibold text-[var(--fg)]">Georgia Tech</span>{" "}
          focusing on Information Internetworks<br></br>and Intelligence. I like working
          on systems where data, infra, and machine learning meet, especially
          when there is a clear feedback loop from users or hardware.
        </p>
      </section>

      {/* Current focus */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-2 flex items-center gap-2 text-[var(--accent)]">
          <Spotlight size={16} className="text-[var(--fg-muted)]" />
          Current Focus
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-[var(--fg-muted)]">
          <li>Building agentic workflows for planning and analysis at KLSA.</li>
          <li>
            Improving exoskeleton control tools and dashboards for the EPIC
            Lab.
          </li>
          <li>Preparing for 2026 SWE / data internships.</li>
        </ul>
      </section>

      {/* Pinned work */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
          <Star size={16} className="text-[var(--fg-muted)]" />
          Pinned Work
        </h2>

        <div className="grid md:grid-cols-3 gap-3">
          {[
            {
              title: "CollabPlan-AI",
              desc: "Local-first meeting analysis with transcription, diarization, and action items.",
              tech: "Python · FastAPI · React · SQLite · HF",
              link: "https://github.com/jlee600/CollabPlan-AI",
            },
            {
              title: "Exo-Launcher",
              desc: "Control tools and dashboards for a Jetson-based robotic hip exoskeleton.",
              tech: "Python · Jetson · Dash · SSH",
              link: "https://github.com/jlee600/Exo-Launcher",
            },
            {
              title: "lc3200b-pipeline",
              desc: "Five-stage pipelined CPU with hazard detection and forwarding.",
              tech: "CircuitSim · Assembly",
              link: "https://github.com/jlee600/lc3200b-pipelined-processor",
            },
          ].map((proj) => (
            <a
              key={proj.title}
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-4 hover:border-[var(--accent)] hover:bg-[var(--bg-subtle)]/95 transition-colors"
            >
              <div className="text-[14px] font-semibold text-[var(--fg)] group-hover:underline flex items-center gap-1">
                {proj.title}
              </div>
              <p className="text-[12px] leading-relaxed text-[var(--fg-muted)] mt-1">
                {proj.desc}
              </p>
              <div className="text-[11px] text-[var(--fg-muted)] mt-2">
                {proj.tech}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Impact strip */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <div className="space-y-4">
          <div>
            <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
              <TrendingUp size={16} className="text-[var(--fg-muted)]" />
              Impact at a glance
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 text-[12px]">
              {IMPACT_AT_A_GLANCE.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-transparent px-3 py-2"
                >
                  <div className="text-[11px] text-[var(--fg-muted)]">
                    {item.label}
                  </div>
                  <div className="text-[18px] font-semibold text-[var(--fg)] leading-tight">
                    {item.value}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--fg-muted)]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="py-1" />

          <div>
            <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
              <Boxes size={16} className="text-[var(--fg-muted)]" />
              Tech Stack at a glance
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 text-[12px]">
              {TECH_STACK_AT_A_GLANCE.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-transparent px-3 py-2"
                >
                  <div className="text-[11px] text-[var(--fg-muted)]">
                    {item.label}
                  </div>
                  <div className="text-[15px] font-semibold text-[var(--fg)] leading-tight">
                    {item.value}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--fg-muted)]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
</section>
    </div>
  );
}

function PinnedRepo({ project }: { project: Project }) {
  const primaryHref = project.href ?? project.demo ?? "#";

  return (
    <a
      href={primaryHref}
      target="_blank"
      rel="noreferrer"
      className="group rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] hover:bg-[var(--bg)] transition-colors shadow-[var(--shadow)] overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      {project.img && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)]">
          <img
            src={project.img}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name + Year */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <div className="text-[14px] font-semibold leading-tight group-hover:underline">
              {project.name}
            </div>
          </div>

          <span className="text-[11px] text-[var(--fg-muted)]">
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Footer: tech + demo pushed to bottom */}
        <div className="mt-auto pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <p className="text-[11px] text-[var(--fg-muted)] truncate">
            {project.tech}
          </p>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-[var(--accent)] inline-flex items-center gap-1 group-hover:underline"
            >
              Demo <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>
    </a>
  );
}

/* -------------------- Experience -------------------- */

function ExperienceTab() {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
          <Briefcase size={16} className="text-[var(--fg-muted)]" />
          Experience
        </h2>

        <div className="space-y-4">
          <ExperienceItem
            company="K.L. Scott & Associates"
            role="AI Agent Software Dev Intern"
            dates="Fall 2025"
            logo="/img/logo/klsa.jpg"
            bullets={[
              "Designing and building AI agentic workflows that use LLMs for planning and analysis.",
              "Integrating AI tools with existing data and reporting stacks for public sector clients.",
            ]}
          />
          <ExperienceItem
            company="Georgia Tech Research Institute"
            role="Software Engineer"
            dates="Spring 2025 – Present"
            logo="/img/logo/gtri.jpg"
            bullets={[
              "Working on ML-driven controllers and tooling for a hip exoskeleton platform.",
              "Shipping dashboards and scripts that make it easier for researchers to run experiments.",
            ]}
          />
          <ExperienceItem
            company="SendSafely"
            role="Software Engineering Intern"
            dates="Summer 2025"
            logo="/img/logo/ss.png"
            bullets={[
              "Automated SDK release and deployment flows across several languages.",
              "Helped migrate encryption workflows toward AWS KMS based key management.",
            ]}
          />
          <ExperienceItem
            company="GSU Department of Computer Science"
            role="Object-Oriented Programming Head Tutor"
            dates="Fall 2023"
            logo="/img/logo/gsu.png"
            bullets={[
              "Ran weekly review sessions for CS 1301/1302 covering core OOP and data structure concepts.",
              "Built practice sets and examples that strengthened understanding for first-year students.",
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function ExperienceItem({
  company,
  role,
  dates,
  bullets,
  logo,
}: {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  logo?: string;
}) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
      <div className="flex items-start justify-between">
        {/* Left side: logo + company */}
        <div className="flex items-center gap-2">
          {logo && (
            <div className="h-5 w-5 rounded-sm overflow-hidden opacity-70">
              <img
                src={logo}
                alt={`${company} logo`}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div>
            <h3 className="text-[14px] font-semibold tracking-tight">
              {company}
            </h3>
            <p className="text-[13px] text-[var(--fg-muted)]">{role}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="text-[12px] text-[var(--fg-muted)]">{dates}</div>
      </div>

      {/* Bullets */}
      <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[13px] text-[var(--fg-muted)]">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------- Projects -------------------- */

function ProjectsTab() {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
          <Layers size={16} className="text-[var(--fg-muted)]" />
          Projects
        </h2>

        {/* was: grid gap-4 sm:grid-cols-2 xl:grid-cols-3 */}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <PinnedRepo key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------- Skills -------------------- */

type SkillLevel = 1 | 2 | 3 | 4 | 5;
type SkillItem = { name: string; level: SkillLevel };
type SkillGroup = {
  category: "Backend" | "Frontend" | "Data" | "Cloud / DevOps" | "Tooling" | "Team";
  items: { name: string; level: SkillLevel }[];
};

const SKILLS: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      { name: "Python", level: 5 },
      { name: "Java / Kotlin", level: 5 },
      { name: "PostgreSQL / MySQL", level: 4 },
      { name: "FastAPI", level: 4 },
      { name: "REST APIs", level: 4 },
      { name: "C", level: 3 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Android (Java/XML)", level: 4 },
      { name: "Javascript / Typescript", level: 4 },
      { name: "HTML / CSS", level: 3 },
      { name: "React", level: 3 },
      { name: "Tailwind", level: 3 },
      { name: "Vite", level: 2 },
    ],
  },
  {
    category: "Data",
    items: [
      { name: "Pandas / Numpy", level: 5 },
      { name: "Matplotlib", level: 5 },
      { name: "Dash / Plotly", level: 4 },
      { name: "Hugging Face", level: 3 },
      { name: "TCN", level: 2 },
    ],
  },
  {
    category: "Cloud / DevOps",
    items: [
      { name: "GitHub Actions", level: 5 },
      { name: "Shell scripting", level: 4 },
      { name: "Jira", level: 4 },
      { name: "AWS (KMS, S3, Secrets)", level: 3 },
      { name: "Docker", level: 2 },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git", level: 5 },
      { name: "VS Code / IntelliJ", level: 5 },
      { name: "MySQL Workbench / DataGrip", level: 4 },
      { name: "LaTeX", level: 2 },
    ],
  },
  {
    category: "Team",
    items: [
      { name: "Mentoring / Peer Instruction", level: 5 },
      { name: "Cross-Team Collaboration", level: 5 },
      { name: "Code Reviews", level: 4 },
      { name: "Technical Documentation", level: 4 },
    ],
  },
];

// map 6 groups to 4 radar axes
const RADAR_GROUPS: Record<SkillGroup["category"], "Backend" | "Frontend" | "Data" | "DevOps" | null> = {
  Backend: "Backend",
  Frontend: "Frontend",
  Data: "Data",
  "Cloud / DevOps": "DevOps",
  Tooling: null,
  Team: null,
};

type RadarPoint = { name: string; score: number };

// average levels per axis and scale to 0–100
function makeRadarData(skills: SkillGroup[]): RadarPoint[] {
  const buckets: Record<string, { sum: number; n: number }> = {};

  Object.values(RADAR_GROUPS).forEach((axis) => {
    if (axis) buckets[axis] = { sum: 0, n: 0 };
  });

  skills.forEach((group) => {
    const axis = RADAR_GROUPS[group.category];
    if (!axis) return;

    group.items.forEach((item) => {
      buckets[axis].sum += item.level;
      buckets[axis].n += 1;
    });
  });

  return Object.entries(buckets).map(([name, { sum, n }]) => ({
    name,
    score: n ? Math.round((sum / n) * 20) : 0, 
  }));
}

function SkillsTab() {
  const radarData = makeRadarData(SKILLS);

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
          <Code2 size={16} className="text-[var(--fg-muted)]" />
          Skills
        </h2>

        {/* Radar card */}
        <div className="mb-5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 md:px-4 md:py-2">
          <div className="mx-auto flex max-w-[540px] flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full max-w-[260px]">
              <SkillRadar data={radarData} />
            </div>
            <p className="text-[12px] md:text-[13px] text-[var(--fg-muted)] text-center sm:text-left sm:max-w-[240px] leading-snug">
              Strongest in <span className="font-semibold">Backend</span> and{" "}
              <span className="font-semibold">Data</span>, with solid{" "}
              <span className="font-semibold">Cloud / DevOps</span> and enough{" "}
              <span className="font-semibold">Frontend</span> to ship tools and
              dashboards.
            </p>
          </div>
        </div>

        <p className="text-[13px] text-[var(--fg-muted)] mb-4">
          Snapshot of the areas I use most often. Darker squares mean higher comfort.
        </p>

        {/* Skill groups, fed from SKILLS */}
        <div className="grid gap-4 md:grid-cols-2">
          {SKILLS.map((group) => (
            <SkillGroupGrid
              key={group.category}
              title={group.category}
              items={group.items.map((i) => ({
                name: i.name,
                level: i.level,
              }))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillRadar({ data }: { data: RadarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart
        data={data}
        outerRadius="72%"
        startAngle={90}
        endAngle={-270}
        margin={{ top: 18, right: 24, bottom: 14, left: 24 }}
      >
        <defs>
          <linearGradient id="radarFillMini" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.12} />
          </linearGradient>
        </defs>

        <PolarGrid
          stroke="rgba(0,0,0,0.08)"
          gridType="polygon"
          radialLines={false}
        />

        <PolarAngleAxis
          dataKey="name"
          tick={{
            fill: "var(--fg-muted)",
            fontSize: 11,
            fontWeight: 500,
          }}
        />

        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
          tickLine={false}
        />

        <Radar
          name="Focus"
          dataKey="score"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="url(#radarFillMini)"
          dot={{ r: 3, strokeWidth: 0 }}
          isAnimationActive={false}
        />

        <Tooltip
          formatter={(value: number) => [`${value}%`, "Relative focus"]}
          labelFormatter={(label) => label}
          contentStyle={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 11,
          }}
          itemStyle={{ color: "var(--accent)" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function SkillGroupGrid({
  title,
  items,
}: {
  title: string;
  items: SkillItem[];
}) {
  return (
    <div className="border border-[var(--border-subtle)] rounded-md p-3 bg-[var(--bg-subtle)]">
      <div className="text-[13px] font-semibold mb-2">{title}</div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <SkillRow key={item.name} name={item.name} level={item.level} />
        ))}
      </div>
    </div>
  );
}

function LevelSquares({ level }: { level: number }) {
  const shades = [
    "#ebedf0", 
    "#c6e48b", 
    "#9be9a8", 
    "#40c463", 
    "#30a14e", 
    "#216e39",
  ];

  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => {
        const paletteIndex = i < level ? level : 0;
        return (
          <div
            key={i}
            className="h-3 w-3 rounded-[2px]"
            style={{ backgroundColor: shades[paletteIndex] }}
          />
        );
      })}
    </div>
  );
}

function SkillRow({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-[var(--fg-muted)]">{name}</span>
      <div className="flex items-center gap-2 min-w-[110px] justify-end">
        <LevelSquares level={level} />
      </div>
    </div>
  );
}

/* -------------------- Contact -------------------- */

function ContactTab() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    window.location.href = "mailto:evanj3034@gmail.com";
  };

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] p-4 md:p-5">
        <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2 text-[var(--accent)]">
          <Mail size={16} className="text-[var(--fg-muted)]" />
          Contact
        </h2>

        <p className="text-[13px] text-[var(--fg-muted)] mb-3">
          Happy to talk about roles, projects, or anything related to systems,
          data, or human augmentation.
        </p>

        <div className="space-y-2 text-[13px] text-[var(--fg-muted)]">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <a
              href="mailto:evanj3034@gmail.com"
              onClick={handleEmailClick}
              className="flex items-center gap-2 text-[var(--accent)] hover:underline"
            >
              evanj3034@gmail.com
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-2">
            <Github size={14} />
            <a
              href="https://github.com/jlee600"
              className="text-[var(--accent)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              github.com/jlee600
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-2">
            <Linkedin size={14} />
            <a
              href="https://www.linkedin.com/in/jlee4223/"
              className="text-[var(--accent)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/jlee4223
            </a>
          </div>
        </div>

        {/* Recruiter notes */}
        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[12px] text-[var(--fg-muted)]">
          <div className="font-semibold text-[var(--accent)] mb-1">
            Quick notes for recruiters
          </div>

          <ul className="space-y-1">
            <li>
              <span className="font-semibold text-[var(--fg)]">Authorization:</span>
              &nbsp;Green card holder; naturalization in progress (expected February 2026).
            </li>
            <li>
              <span className="font-semibold text-[var(--fg)]">Location:</span>
              &nbsp;Based in Atlanta, open to remote and relocations.
            </li>
            <li>
              <span className="font-semibold text-[var(--fg)]">Interest:</span>
              &nbsp;Open to backend and data-focused SWE roles for 2026.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}