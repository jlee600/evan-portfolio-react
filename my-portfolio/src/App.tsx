import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, } from "recharts";

/**
 * Global CSS: base vars + micro-animations + ambient gradient + halo + pulse
 */
const globalCSS = `
:root{
  --bg:#FBFBFD; --fg:#111111; --fgSoft:#6E6E73; --fgDim:#8E8E93;
  --hairline:#E5E5EA; --accent:#003057;  /* Georgia Tech navy */
--accent2:#4F9DDE; --glass: rgba(255,255,255,0.72); --card:#FFFFFF;
}
html,body,#root{height:100%}
body{margin:0; font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",Segoe UI,Roboto,Helvetica,Arial,sans-serif;}
*{outline-color:var(--accent)}

/* Button pulse (very faint) */
.resume-glow {
  position: relative;
  animation: gentlePulse 3s ease-in-out infinite;
}

.resume-glow::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  background: radial-gradient(circle at center, rgba(0,122,255,0.45), transparent 70%);
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: gentlePulse 5s ease-in-out infinite;
}

@keyframes gentlePulse {
  0%, 85%, 100% { opacity: 0; transform: scale(1); }
  45% { opacity: 0.9; transform: scale(1.07); }
}

/* Ambient drifting gradient */
@keyframes drift {
  0% { transform: translate3d(-10%, -10%, 0) scale(1.1); }
  50% { transform: translate3d(5%, 5%, 0) scale(1.1); }
  100% { transform: translate3d(-10%, -10%, 0) scale(1.1); }
}

/* Smooth section transition dim */
body.dim .fade-layer{ opacity: 0.08; }
.fade-layer{ pointer-events:none; position:fixed; inset:0; background: #000; opacity:0; transition: opacity .35s; z-index:30; }

/* Hover accent reveal */
.hover-accent{ position:relative; }
.hover-accent::after{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  -webkit-mask: 
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  padding:1px;
  transition:opacity .25s;
}
.hover-accent:hover::after{ opacity:1; }

/* Cursor halo element styling */
.cursor-halo{
  position:fixed; top:0; left:0; width:80px; height:80px; border-radius:50%;
  background: radial-gradient(closest-side, rgba(0,122,255,0.20), rgba(0,122,255,0.0));
  filter: blur(8px);
  pointer-events:none; z-index:25; transform: translate(-50%, -50%);
}
.cursor-halo.grow{ width:96px; height:96px; }

.exp-item {
  border-left: 2px solid transparent;
  transition: border-color 0.25s ease, background-color 0.25s ease;
}

.exp-item.active {
  border-left-color: var(--accent);
  background: rgba(0, 122, 255, 0.03); /* subtle background to match hover */
}

/* Reduce motion safety */
@media (prefers-reduced-motion: reduce){
  .cursor-halo{ display:none; }
}

.skill-level {
  display: inline-block;
  width: 70px;  /* keeps all labels same width */
  text-align: right;
}

.skill-dot:hover {
  transform: scale(1.3);
  filter: brightness(1.3);
  transition: transform 0.2s ease, filter 0.2s ease;
}
`;

// skills 
type SkillLevel = 1 | 2 | 3 | 4 | 5;

type SkillGroup = {
  category:
    | "Backend"
    | "Frontend"
    | "Data"
    | "Cloud / DevOps"
    | "Tooling"
    | "Team";
  items: { name: string; level: SkillLevel; note?: string }[];
};

const SKILL_LEVEL_LABEL: Record<
  SkillLevel,
  "Familiar" | "Working" | "Proficient" | "Advanced" | "Expert"
> = {
  1: "Familiar",
  2: "Working",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

const SKILLS: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      { name: "Python", level: 5 },
      { name: "Java", level: 5 },
      { name: "SQLite / MySQL", level: 4 },
      { name: "FastAPI", level: 4 },
      { name: "REST APIs", level: 4 },
      { name: "C", level: 3 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Javascript / Typescript", level: 4 },
      { name: "HTML / CSS", level: 4 },
      { name: "React", level: 3 },
      { name: "Tailwind", level: 3 },
      { name: "Vite", level: 3 },
      { name: "Android (Java/XML)", level: 2 },
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
      { name: "Shell Scripting", level: 4 }, 
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

const HIGHLIGHTS = Array.from(
  new Set(
    SKILLS.flatMap((g) => g.items.filter((i) => i.level >= 4).map((i) => i.name))
  )
).slice(0, 8);

// keep this
const LEVEL_COLOR: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "rgba(0,122,255,0.15)", // Familiar
  2: "rgba(0,122,255,0.30)", // Working
  3: "rgba(0,122,255,0.50)", // Proficient
  4: "rgba(0,122,255,0.75)", // Advanced
  5: "rgba(0,122,255,1.00)", // Expert
};

function DotMeter({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const shade = LEVEL_COLOR[level];
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= level;
        return (
          <span
            key={n}
            className="skill-dot block h-2.5 w-2.5 rounded-full"
            style={{
              // filled dots get the level shade; others use hairline
              backgroundColor: filled ? shade : "var(--hairline)",
            }}
          />
        );
      })}
    </div>
  );
}

// skill groups to 4 categories
const RADAR_GROUPS: Record<string, "Backend" | "Frontend" | "Data" | "DevOps" | null> = {
  "Backend": "Backend",
  "Frontend": "Frontend",
  "Data": "Data",
  "Cloud / DevOps": "DevOps",
  "Tooling": null,
  "Team": null,
};

function makeRadarData() {
  const buckets: Record<string, { sum: number; n: number }> = {};
  Object.values(RADAR_GROUPS).forEach((cat) => {
    if (cat) buckets[cat] = { sum: 0, n: 0 };
  });

  SKILLS.forEach((group) => {
    const cat = RADAR_GROUPS[group.category] || null;
    if (!cat) return;
    group.items.forEach((it) => {
      buckets[cat].sum += it.level;
      buckets[cat].n += 1;
    });
  });

  return Object.entries(buckets).map(([name, { sum, n }]) => ({
    name,
    score: n ? Math.round((sum / n) * 20) : 0, 
  }));
}

// experience
const EXPERIENCE = [
  {
    company: "K.L. Scott & Associates",
    role: "AI Agent Software Dev Intern",
    location: "Atlanta, GA",
    dates: "Fall 2025",
    logo: "/img/logo/klsa.jpg",
    bullets: [
      "Built autonomous AI agents leveraging LLMs, NLP, and reinforcement learning for government workflows.",
      "Developed modular agent pipelines to automate decision processes and improve data interoperability.",
      "Integrated agentic frameworks with legacy systems to streamline analytics and reduce manual oversight."
    ],
    tech: "Python, LLM, ML, Reinforcement Learning, NLP"
  },
  {
    company: "Georgia Tech Research Institute",
    role: "Software Engineer",
    location: "Atlanta, GA",
    dates: "Spring 2025 – Present",
    logo: "/img/logo/gtri.jpg",
    bullets: [
      "Engineered machine-learning-driven controllers for robotic exoskeletons to predict user motion intent.",
      "Refined torque-assistance logic across gait conditions and user profiles to enhance system adaptability.",
      "Built and deployed a live sensor-visualization dashboard for real-time monitoring and diagnostics."
    ],
    tech: "Python, TCN, Dash, Plotly, Jetson"
  },
  {
    company: "SendSafely",
    role: "Software Eng Intern",
    location: "Newark, DE",
    dates: "Summer 2025",
    logo: "/img/logo/ss.png",
    bullets: [
      "Automated SDK release and deployment pipelines across Python, Java, and JavaScript codebases.",
      "Migrated encryption workflows to AWS KMS, improving security and reducing key-rotation overhead.",
      "Enhanced backend reliability and data throughput for the secure file-transfer service."
    ],
    tech: "Java, Spring, AWS, JavaScript, GitHub Actions"
  },
  {
    company: "Georgia State Honors Program",
    role: "OOP Head Tutor",
    location: "Atlanta, GA",
    dates: "Fall 2023",
    logo: "/img/logo/gsu.png",
    bullets: [
      "Led a team of six tutors and organized weekly sessions for over 30 students in CS1301 and CS1302.",
      "Taught OOP, data structures, and algorithmic thinking through guided practice and code reviews.",
      "Created supplemental materials and assessments that improved student comprehension and outcomes."
    ],
    tech: "Python, Pandas"
  }
];

// Project
type Project = {
  id: number;
  title: string;
  blurb: string;
  stack: string[];
  year: string;
  tag: "Full Stack" | "Data" | "Systems";
  img: string;
  github?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Collab-Plan AI",
    blurb: "AI-powered meeting and conversation assistant",
    stack: ["Python", "FastAPI", "React", "SQLite", "HuggingFace"],
    year: "2025",
    tag: "Full Stack",
    img: "/img/collabplan.png",
    github: "https://github.com/jlee600/CollabPlan-AI",
    demo: "https://youtu.be/iZvC5hSalXE"
  },
  {
    id: 2,
    title: "Hip-Exo Skeleton",
    blurb: "Development of a robotic hip exoskeleton",
    stack: ["Python", "ML", "Mechatronics"],
    year: "2025",
    tag: "Systems",
    img: "/img/hipexo.jpg",
    demo: "https://www.epic.gatech.edu/projects/"
  },
  {
    id: 3,
    title: "Master Exoskeleton Dashboard",
    blurb: "Live updating dashboard for exoskeleton controller scripts",
    stack: ["Python", "SSH", "Linux"],
    year: "2025",
    tag: "Data",
    img: "/img/rhex.png",
  },
  {
    id: 4,
    title: "Fully functional five-stage pipelined CPU",
    blurb: "CircuitSim implementation of CPU with hazard detection and forwarding",
    stack: ["CircuitSim", "MS Excel"],
    year: "2025",
    tag: "Systems",
    img: "/img/lc3.png"
  },
  {
    id: 5,
    title: "Airline Management System",
    blurb: "MySQL datbase for managing airline operations",
    stack: ["MySQL", "Draw.io"],
    year: "2025",
    tag: "Data",
    img: "/img/airline.png",
    github: "https://github.com/jlee600/Airline-Management-System",
  },
  {
    id: 6,
    title: "Spotify-Wrapped Clone",
    blurb: "A personalized music stats dashboard",
    stack: ["Java", "Kotlin", "Android Studio", "SQLite", "Spotify API"],
    year: "2024",
    tag: "Full Stack",
    img: "/img/spotify.png",
    github: "https://github.com/jlee600/Spotify-Project",
    demo: "https://youtu.be/cEpOLU2JK2M"
  },
  {
    id: 7,
    title: "EDA on HAN-River",
    blurb: "Exploratory data analysis on South Korea's Han River",
    stack: ["Python", "Pandas", "Matplotlib"],
    year: "2023",
    tag: "Data",
    img: "/img/eda.png",
    github: "https://github.com/jlee600/HanRiverEDA/blob/main/Downloads/1302_project_1.ipynb",
    demo: "/img/eda_report.pdf"
  }
];

// project filters
const filters = ["All", "Full Stack", "Data", "Systems"] as const;
type Filter = typeof filters[number];

function classNames(...n: Array<string | false | null | undefined>) {
  return n.filter(Boolean).join(" ");
}

export function filterProjects(projects: typeof PROJECTS, active: Filter) {
  if (active === "All") return projects;
  return projects.filter((p) => p.tag === active);
}

/** Motion section: fade + lift on scroll (spring) */
const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      duration: 0.5,
    },
  },
} as const;

function MotionSection({
  id,
  children,
  className = ""
}: React.PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

/** Card hover lift (micro) */
const cardHover = {
  whileHover: {
    y: -4,
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
  whileTap: { scale: 0.985 },
} as const;

export default function ApplePortfolio() {
  const [active, setActive] = useState<Filter>("All");
  const visible = useMemo(() => filterProjects(PROJECTS, active), [active]);

  /** Cursor halo: follow with slight spring; grow over interactive */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('[data-interactive="true"]')) {
        haloRef.current?.classList.add("grow");
      } else {
        haloRef.current?.classList.remove("grow");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  /** Smooth section transition: brief dim before anchor scroll */
  useEffect(() => {
    const handler = (ev: Event) => {
      const a = ev.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      ev.preventDefault();
      document.body.classList.add("dim");
      const el = document.querySelector(href);
      window.setTimeout(() => {
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => document.body.classList.remove("dim"), 350);
      }, 60);
    };
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );
    navLinks.forEach((n) => n.addEventListener("click", handler));
    return () => navLinks.forEach((n) => n.removeEventListener("click", handler));
  }, []);

  /** Keep native smooth when not using the dim effect */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased selection:bg-[var(--accent)/15] selection:text-[var(--accent)] relative overflow-x-clip">
      <style>{globalCSS}</style>

      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-10 opacity-[0.08]"
        style={{
          background:
            "linear-gradient(115deg, rgba(0,122,255,0.5), rgba(90,200,250,0.5), rgba(0,0,0,0))",
          animation: "drift 22s linear infinite"
        }}
      />
      {/* Dim overlay for smooth section transitions */}
      <div className="fade-layer" />

      {/* Cursor halo */}
      <motion.div
        ref={haloRef}
        className="cursor-halo"
        style={{ x: smoothX, y: smoothY }}
        aria-hidden
      />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur bg-[var(--glass)] border-b border-[var(--hairline)]">
        <nav className="mx-auto max-w-[1100px] h-16 flex items-center px-4">
          <div className="text-base font-semibold tracking-[-0.01em]">Evan Lee</div>
          <div className="ml-auto hidden sm:flex items-center gap-6 text-sm">
            <NavLink href="#home" label="Home" />
            {/* <NavLink href="#about" label="About" /> */}
            <NavLink href="#skills" label="Skills" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#projects" label="Projects" />
            {/* <NavLink href="#now" label="Now" /> */}
            <NavLink href="#contact" label="Contact" />
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <MotionSection id="home" className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(0,122,255,0.05)] via-transparent to-transparent" />
          <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-16">
            {/* 2-col layout: image left, content right */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,320px)_1fr] gap-8 md:gap-12 items-center">
              {/* Left: square profile image */}
              <div className="order-1 md:order-none">
                <img
                  src="/img/profile.jpg"         
                  alt="Evan Lee"
                  className="w-[220px] md:w-[320px] aspect-square object-cover rounded-[12px] border border-[var(--hairline)] shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-[var(--card)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Right: your original heading, copy, CTAs, quick cards */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-5xl md:text-6xl font-bold tracking-[-0.02em] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent"
                >
                  Evan Lee
                </motion.h1>

                <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-4 text-lg text-[var(--fgSoft)] max-w-[60ch]"
                >
                  Software Engineer
                </motion.p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/img/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-glow h-9 inline-flex items-center gap-1 px-4 rounded-[12px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white shadow-lg"
                    data-interactive="true"
                  >
                    View Resume <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="#contact"
                    className="h-9 inline-flex items-center px-4 rounded-[12px] border border-[var(--hairline)] transition hover-accent"
                    data-interactive="true"
                  >
                    Contact
                  </a>
                  <a
                    href="#projects"
                    className="h-9 inline-flex items-center px-4 rounded-[12px] border border-[var(--hairline)] transition hover-accent"
                    data-interactive="true"
                  >
                    View projects
                  </a>
                </div>

                {/* Quick cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Current", company: "K.L. Scott & Associates", role: "AI Agent SDE Intern" },
                    { title: "Previous", company: "SendSafely", role: "SWE Intern" },
                    { title: "Focus", company: "", role: <>Backend, Data, <br /> Artificial Intelligence</> },
                  ].map((c) => (
                    <motion.div
                      key={c.title}
                      {...cardHover}
                      className="hover-accent rounded-2xl border border-[var(--hairline)] p-4 bg-[var(--card)]"
                      data-interactive="true"
                    >
                      
                      <div className="text-sm text-[var(--fgDim)] mb-1">{c.title}</div>
                      {c.company ? (
                        <>
                          <div className="text-sm font-semibold text-[var(--fg)] leading-tight">{c.company}</div>
                          <div className="text-sm text-[var(--fgSoft)]">{c.role}</div>
                        </>
                      ) : (
                        <div className="text-sm font-medium text-[var(--fg)]">{c.role}</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* About */}
        <MotionSection id="about" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
            <SectionTitle title="About" />
            <p className="mt-4 max-w-[70ch] text-[17px] leading-7 text-[var(--fgSoft)]">
              I am a CS major at <span className="text-[#B3A369] font-medium">Georgia Tech</span>, concentrating in Information Internetworks and Intelligence. 
              <br />
              I enjoy designing clean architectures, building fast prototypes, and solving problems at the intersection of code and human impact.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { k: "School", v: "Georgia Institute of Techology" },
                { k: "Study Focus", v: "Information & Intelligence" },
                { k: "Skills", v: "Python, Java, SQL, Javascript" },
                { k: "Position", v: "Software Engineering" },
              ].map((t) => (
                <motion.div
                  key={t.k}
                  {...cardHover}
                  className="hover-accent rounded-xl border border-[var(--hairline)] p-4 bg-[var(--card)]"
                  data-interactive="true"
                >
                  <div className="text-xs text-[var(--fgDim)]">{t.k}</div>
                  <div className="text-sm mt-1 font-medium">{t.v}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--hairline)] pt-4">
            <div className="text-sm text-[var(--fgDim)] mb-2 font-medium">
              Relevant Coursework
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "Data Structures & Algos",
                "Systems & Networks",
                "Computer Org & Prog",
                "Database Systems",
                "Artificial Intelligence",
                "Computer Vision",
              ].map((course) => (
                <span
                  key={course}
                  className="course-chip px-3 py-1.5 rounded-full border border-[var(--hairline)] bg-[var(--card)] text-[var(--fgSoft)]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
          </div>
        </MotionSection>

        {/* Skills */}
        <MotionSection id="skills" className="border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
          <SectionTitle title="Skills" />
          <p className="mt-4 mb-6 text-[15px] leading-relaxed text-[var(--fgSoft)] max-w-[70ch]">
            My technical foundation spans backend systems, data-driven ML work, and cloud infrastructure, with a strong emphasis on building reliable tools for research and deployment.
          </p>
          
          {/* Focus Radar */}
          <div className="mt-6 rounded-xl border border-[var(--hairline)] bg-[var(--card)] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Radar chart */}
            <div className="flex-1 min-w-[280px]">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={makeRadarData()} outerRadius="72%" startAngle={90} endAngle={-270}>
                  <defs>
                    <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.12" />
                    </linearGradient>
                  </defs>

                  <PolarGrid stroke="rgba(0,0,0,0.10)" gridType="polygon" radialLines={false} />
                  <PolarAngleAxis
                    dataKey="name"
                    tick={{ fill: "var(--fgSoft)", fontSize: 12, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "var(--fgDim)", fontSize: 7.5 }}
                    tickFormatter={(v) => `${v}%`}
                    tickCount={6}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Radar
                    name="Focus"
                    dataKey="score"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    fill="url(#radarFill)"
                    dot={{ r: 3, strokeWidth: 0 }}
                    isAnimationActive={false}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v}%`]} // just shows the value
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--hairline)",
                      borderRadius: 8,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                      padding: "6px 10px",
                      fontSize: 11,
                      color: "var(--fg)",
                    }}
                    itemStyle={{
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                    labelStyle={{
                      display: "none", // hide redundant title line
                    }}
                    cursor={{ stroke: "transparent" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right: Explanation */}
            <div className="flex-1 text-sm text-[var(--fgSoft)] leading-relaxed">
            <div className="text-[17px] md:text-[18px] font-semibold text-[var(--fg)] mb-3">
              What this shows
            </div>
              <p>
                The radar chart compares emphasis across four key skill areas.
                A wider reach means higher relative strength in that category.
                <br />
                <br />
                <span className="text-[var(--fg)] font-medium">Backend</span> and{" "}
                <span className="text-[var(--fg)] font-medium">Data</span> form the
                foundation of my profile, with solid depth in{" "}
                <span className="text-[var(--fg)] font-medium">DevOps</span> and
                supporting <span className="text-[var(--fg)] font-medium">Frontend</span> experience
                for full-stack development.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--hairline)] pt-4" />

          {/* Highlights */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-[var(--accent)]">Highlights:</span>
            {HIGHLIGHTS.map((h) => (
              <span key={h} className="text-[var(--fgSoft)]">{h}</span>
            ))}
          </div>
          
          <div className="mt-2 text-xs text-[var(--fgDim)]">
            Levels: 1 <span className="mx-1">Familiar</span> · 2 Working · 3 Proficient · 4 Advanced · 5 Expert
          </div>

          {/* Category cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((group) => (
              <motion.div
                key={group.category}
                {...cardHover}
                className="hover-accent rounded-xl border border-[var(--hairline)] p-4 bg-[var(--card)]"
                data-interactive="true"
              >
                <div className="text-sm font-semibold text-[var(--fg)] mb-2">
                  {group.category}
                </div>

                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3"
                      title={`${skill.name} — ${SKILL_LEVEL_LABEL[skill.level]}`}
                      aria-label={`${skill.name} proficiency: ${skill.level} of 5 (${SKILL_LEVEL_LABEL[skill.level]})`}
                    >
                      <span className="text-sm text-[var(--fgSoft)]">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <DotMeter level={skill.level} />
                        <span className="skill-level text-xs text-[var(--fgDim)] hidden sm:block">
                          {SKILL_LEVEL_LABEL[skill.level]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        </MotionSection>
        
        {/* Experience */}
<MotionSection id="experience" className="border-t border-[var(--hairline)]">
  <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
    <SectionTitle title="Experience" />

    <div className="mt-4 rounded-2xl">
      {EXPERIENCE.map((e, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          tabIndex={0}
          className="
            relative bg-[var(--card)] p-5 md:p-6 rounded-xl ring-0
            focus:ring-2 focus:ring-[var(--accent)/35]
            before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[2px]
            before:bg-[var(--accent)] before:opacity-0
            hover:before:opacity-100 focus:before:opacity-100
            transition-[transform,opacity,box-shadow]
          "
          aria-label={`${e.company}, ${e.role}, ${e.dates}`}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Logo chip */}
              <div
                className="
                  relative h-8 w-8 shrink-0 rounded-md
                  border border-[var(--hairline)]
                  bg-[var(--card)]
                  ring-1 ring-transparent
                  hover:ring-[var(--accent)/25] focus:ring-[var(--accent)/25]
                  transition
                "
                style={{
                  background:
                    e.logo
                      ? `url(${e.logo}) center/cover no-repeat`
                      : `linear-gradient(135deg, var(--accent)/10, transparent)`
                }}
                aria-hidden
              >
                {!e.logo && (
                  <div className="absolute inset-0 grid place-items-center text-[10px] font-semibold text-[var(--fgSoft)]">
                    {e.company.split(' ').map(w => w[0]).slice(0,2).join('')}
                  </div>
                )}
                {/* Glow ring */}
                <span
                  className="pointer-events-none absolute -inset-[2px] rounded-[10px]"
                  style={{
                    background:
                      'radial-gradient(40% 40% at 50% 50%, rgba(0,122,255,0.18), transparent 70%)'
                  }}
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <div className="text-base font-semibold tracking-[-0.01em]">
                  {e.company}
                </div>
                <span className="hidden sm:inline text-xs text-[var(--fgDim)]">•</span>
                <div className="text-sm text-[var(--fgDim)]">{e.role}</div>
              </div>
            </div>

            {/* Date pill */}
            <div className="inline-flex items-center rounded-full border border-[var(--hairline)] px-2.5 py-1 text-xs text-[var(--fgDim)] bg-[var(--card)]">
              <time>{e.dates}</time>
            </div>
          </div>

          {/* Bullets */}
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-[var(--fgSoft)] leading-[1.35]">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          {/* Optional tech chips (toggle by uncomment) */}
          {/* <div className="mt-3 flex flex-wrap gap-2">
            {e.techList?.slice(0, 6).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full border border-[var(--hairline)] bg-[var(--card)] text-[var(--accent)]"
              >
                {t}
              </span>
            ))}
          </div> */}
        </motion.div>
      ))}
    </div>
  </div>
</MotionSection>

        {/* Projects */}
        <MotionSection id="projects" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
            <SectionTitle title="Projects" />

            {/* Filter chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm border transition",
                    active === f
                      ? "relative isolate overflow-hidden rounded-full px-3 py-1.5 text-sm \
                        border-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] \
                        text-white shadow-sm bg-clip-padding"
                      : "px-3 py-1.5 rounded-full text-sm border border-[var(--hairline)] hover-accent"
                  )}
                  data-interactive="true"
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {visible.map((p) => (
                <motion.article
                  key={p.id}
                  {...cardHover}
                  className="group hover-accent overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--card)]"
                  data-interactive="true"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.img || "/img/placeholder.png"}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold tracking-[-0.01em]">{p.title}</h3>
                      <span className="text-xs text-[var(--fgDim)]">{p.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--fgSoft)]">{p.blurb}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--hairline)] text-[var(--accent)]">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Links row */}
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                          data-interactive="true"
                        >
                          <Github size={16} /> Code
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                          data-interactive="true"
                        >
                          Demo <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Now / What I'm Working On */}
        <MotionSection id="now" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
            <SectionTitle title="What I'm Working On" />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
              className="mt-5 rounded-2xl border border-[var(--hairline)] bg-[var(--card)] p-6 hover-accent"
            >
              <p className="text-[17px] leading-7 text-[var(--fgSoft)] max-w-[70ch]">
                Currently building autonomous AI agents at{" "}
                <span className="font-medium text-[var(--fg)]">K.L. Scott &amp; Associates</span> and
                enhancing real-time control systems at{" "}
                <span className="font-medium text-[var(--fg)]">Georgia Tech’s EPIC Lab</span>.
                Preparing for <span className="font-medium text-[var(--fg)]">Summer 2026 SWE & Data internships</span>.
              </p>
              <div className="my-4 h-px bg-[var(--hairline)]" />
              <p className="mt-4 text-[15px] text-[var(--fgSoft)] italic">Personal Project Spotlight</p>
              {/* CityScape IQ card */}
              <div className="mt-6 rounded-xl border border-[var(--hairline)] p-5 bg-[var(--card)]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">CityScape IQ - Local Urban Insights</h3>
                  {/* screenshots/doc link placeholder*/}
                  {/* <a
                    href="/docs/cityscape-iq.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] inline-flex items-center gap-1 text-sm hover:underline"
                  >
                    Screenshots / Doc <ArrowUpRight size={16} />
                  </a> */}
                </div>

                <p className="mt-2 text-sm text-[var(--fgSoft)] max-w-[75ch]">
                  CityScape IQ analyzes live and recorded traffic footage to detect vehicles, people, and events such as congestion or stopped cars. 
                  It fuses weather and public transit data to forecast short-term congestion and lets users query and explore results through an interactive web dashboard.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-xs font-medium text-[var(--fgDim)]">Key Tasks</div>
                    <ul className="mt-1 text-sm text-[var(--fgSoft)] list-disc pl-5 space-y-1">
                      <li>Object detection &amp; simple tracking</li>
                      <li>Event logic (congestion, stopped vehicle)</li>
                      <li>Short-term congestion forecasting</li>
                      <li>NL query over results</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--fgDim)]">Stack</div>
                    <ul className="mt-1 text-sm text-[var(--fgSoft)] list-disc pl-5 space-y-1">
                      <li>Python, FastAPI, SQLite, Parquet</li>
                      <li>HF + YOLO / OpenMMLab</li>
                      <li>Prophet / PyTorch Forecasting</li>
                      <li>React + Vite + Tailwind, Leaflet</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--fgDim)]">MVP Scope</div>
                    <ul className="mt-1 text-sm text-[var(--fgSoft)] list-disc pl-5 space-y-1">
                      <li>2–5 FPS sampling &amp; counts</li>
                      <li>Weather + GTFS fusion</li>
                      <li>Event clips &amp; searchable gallery</li>
                      <li>Map pins + timeline + queries</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 text-xs text-[var(--fgDim)]">
                  System: video → detector → tracker → event engine → SQLite/Parquet → forecaster → API → web UI.
                </div>
              </div>

              <div className="mt-4 text-sm text-[var(--fgDim)] italic">
                Last updated Oct 2025
              </div>
            </motion.div>
          </div>
        </MotionSection>

        {/* Contact */}
        <MotionSection id="contact" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.01em] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">Let's talk</h2>
                <p className="mt-1 text-sm text-[var(--fgSoft)]">Open to 2026 roles and collabs.</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="mailto:evanj3034@gmail.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] transition hover-accent" target="_blank" rel="noopener noreferrer"data-interactive="true"><Mail size={16}/> Email</a>
                <a href="https://github.com/jlee600" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] transition hover-accent" target="_blank" rel="noopener noreferrer"data-interactive="true"><Github size={16}/> GitHub</a>
                <a href="https://www.linkedin.com/in/jlee4223/" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] transition hover-accent" target="_blank" rel="noopener noreferrer" data-interactive="true"><Linkedin size={16}/> LinkedIn</a>
              </div>
            </div>
          </div>
        </MotionSection>
      </main>

      <footer className="border-t border-[var(--hairline)] text-[var(--fgDim)]">
        <div className="mx-auto max-w-[1100px] px-4 py-6 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>© {new Date().getFullYear()} Evan Lee</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href = "https://ramblinwreck.com/thwg-the-next-generation/" target="_blank" rel="noopener noreferrer" data-interactive="true">THWG, STING 'EM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative py-1 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent2)] hover:after:w-full after:transition-[width]"
      data-interactive="true"
    >
      {label}
    </a>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl md:text-[32px] font-semibold tracking-[-0.02em] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">{title}</h2>
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,122,255,0.4)] to-transparent" />
    </div>
  );
}