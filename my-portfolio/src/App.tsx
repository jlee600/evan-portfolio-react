import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

/**
 * Global CSS variables and base styles injected via <style> tag.
 */
const globalCSS = `
:root{
  --bg:#FBFBFD; /* Apple light */
  --fg:#111111;
  --fgSoft:#6E6E73;
  --fgDim:#8E8E93;
  --hairline:#E5E5EA;
  --accent:#007AFF; /* Apple blue */
  --accent2:#5AC8FA; /* light blue */
  --glass: rgba(255,255,255,0.72);
  --card:#FFFFFF;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0B0B0F; /* deep near-black */
    --fg:#EDEDED;
    --fgSoft:#C7C7CC;
    --fgDim:#8E8E93;
    --hairline:#2A2A2E;
    --glass: rgba(13,13,18,0.6);
    --card:#0F0F14;
  }
}
html,body,#root{height:100%}
body{margin:0; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Segoe UI, Roboto, Helvetica, Arial, sans-serif;}
*{outline-color: var(--accent)}
`;

// --- Data ----------------------------------------------------
const PROJECTS = [
  {
    id: 1,
    title: "Collab-Plan AI",
    blurb: "AI-powered meeting and conversation assistant",
    stack: ["Python", "FastAPI", "React"],
    year: "2025",
    tag: "ML",
    img: "/img/collabplan.png"
  },
  {
    id: 2,
    title: "Spotify-Wrapped Clone",
    blurb: "A personalized music stats dashboard",
    stack: ["Java", "Kotlin", "Android Studio"],
    year: "2024",
    tag: "ML",
    img: "/img/spotify.png"
  },
  {
    id: 3,
    title: "Master Exoskeleton Dashboard",
    blurb: "Real-time control for robotic exoskeleton",
    stack: ["Python", "SSH", "Linux"],
    year: "2025",
    tag: "Systems",
    img: "/img/rhex.png"
  },
  {
    id: 4,
    title: "Fully functional five-stage pipelined CPU",
    blurb: "CircuitSim implementation of CPU with hazard detection and forwarding",
    stack: ["CircuitSim", "MS Excel"],
    year: "2025",
    tag: "Backend",
    img: "/img/lc3.png"
  },
  {
    id: 5,
    title: "EDA on HAN-River",
    blurb: "Exploratory data analysis on South Korea's Han River",
    stack: ["Python", "Pandas", "Matplotlib"],
    year: "2023",
    tag: "Data",
    img: "/img/eda.png"
  },
];

const EXPERIENCE = [
  {
    company: "K.L. Scott & Associates",
    role: "AI Agent Software Dev Intern",
    dates: "Fall 2025",
    bullets: [
      "Conceptualized, designed, and implemented Agentic AI software solutions",
      "Developed autonomous agents utilizing modern AI technologies such as LLMs, NLP, and ML frameworks",
      "Supported integration of Agentic AI solutions with existing government IT systems and workflows"
    ],
    tech: "Python, LLM, ML, Reinforcement Learning, NLP"
  },
  {
    company: "Georgia Tech Research Institute",
    role: "Software Engineer",
    dates: "Spring 2025 - Present",
    bullets: [
      "Developed intelligent controllers for robotic exoskeletons, integrating machine learning models to predict user intent",
      "Optimized torque assistance across varying gait conditions, user profiles, and biomechanical constraints.",
      "Built and deployed a real-time sensor visualization pipeline using Python and Dash"
    ],
    tech: "Python, TCN, Dash, Plotly, Jetson"
  },
  {
    company: "SendSafely",
    role: "Software Eng Intern",
    dates: "Summer 2025",
    bullets: [
      "Automated CI/CD pipelines and production deployments for Python, Java, and JavaScript SDKs",
      "Migrated internal encryption infrastructure to AWS Key Management Service",
      "Maintained and improved backend services for secure file transfer platform"
    ],
    tech: "Java, Spring, AWS, Javascript, Github Actions"
  },
  {
    company: "Georgia State Honors Program",
    role: "OOP Head Tutor",
    dates: "Fall 2024",
    bullets: [
      "Led a team of 6 honors tutors, coordinating weekly sessions for over 30 students in CS1301/CS1302",
      "Covered OOP, Data Structures, and data manipulation, reinforcing foundational understanding",
      "Developed supplementary materials and practice problems to enhance learning outcomes"
    ],
    tech: "Python, Pandas, "
  }
];

const filters = ["All", "Backend", "Data", "ML", "Systems"] as const;
type Filter = typeof filters[number];

function classNames(...n: Array<string | false | null | undefined>) {
  return n.filter(Boolean).join(" ");
}

/**
 * Pure helper for filtering projects by tag — exported for tests.
 */
export function filterProjects(
  projects: typeof PROJECTS,
  active: Filter
) {
  if (active === "All") return projects;
  return projects.filter((p) => p.tag === active);
}

export default function ApplePortfolio() {
  const [active, setActive] = useState<Filter>("All");
  const visible = useMemo(() => filterProjects(PROJECTS, active), [active]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased selection:bg-[var(--accent)/15] selection:text-[var(--accent)]">
      <style>{globalCSS}</style>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur bg-[var(--glass)] border-b border-[var(--hairline)]">
        <nav className="mx-auto max-w-[1100px] h-16 flex items-center px-4">
          <div className="text-base font-semibold tracking-[-0.01em]">Evan Lee</div>
          <div className="ml-auto hidden sm:flex items-center gap-6 text-sm">
            <NavLink href="#home" label="Home" />
            <NavLink href="#about" label="About" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#projects" label="Projects" />
            {/* <NavLink href="#contact" label="Contact" /> */}
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section id="home" className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(0,122,255,0.05)] via-transparent to-transparent" />
          <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-16">
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
              CS at Georgia Tech, focused on backend and data systems.
            </motion.p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 inline-flex items-center gap-1 px-4 rounded-[12px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white hover:opacity-95 transition shadow-[0_0_24px_rgba(0,122,255,0.35)]"
              >
                View Resume <ArrowUpRight size={16} />
              </a>
              <a
                href="#projects"
                className="h-9 inline-flex items-center px-4 rounded-[12px] border border-[var(--hairline)] hover:border-[var(--accent)] transition"
              >
                View projects
              </a>
              <a
                href="mailto:evanj3034@gmail.com"
                className="h-9 inline-flex items-center px-4 rounded-[12px] border border-[var(--hairline)] hover:border-[var(--accent)] transition"
              >
                Contact
              </a>
            </div>

            {/* Quick cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Current", text: "AI Agent Software Developer Intern" },
                { title: "Last internship", text: "SendSafely SWE Intern" },
                { title: "Focus", text: "Backend, Data" },
              ].map((c) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-[var(--hairline)] p-5 hover:shadow-[0_0_15px_rgba(0,122,255,0.35)] transition bg-[var(--card)]"
                >
                  <div className="text-sm text-[var(--fgDim)]">{c.title}</div>
                  <div className="mt-1 text-base font-medium">{c.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-[rgba(0,122,255,0.4)] to-transparent" />

        {/* About */}
        <section id="about">
          <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
            <SectionTitle title="About" />
            <p className="mt-4 max-w-[70ch] text-[17px] leading-7 text-[var(--fgSoft)]">
              I am a CS major at Georgia Tech. I like clean systems, clear APIs, and small tools that help people get work done.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { k: "School", v: "Georgia Institute of Techology" },
                { k: "Study Focus", v: "Information Internetworks & Intelligence" },
                { k: "Skills", v: "Python, Java, SQL, Javascript" },
                { k: "Interests", v: "Software Engineering" },
              ].map((t) => (
                <div key={t.k} className="rounded-xl border border-[var(--hairline)] p-4 bg-[var(--card)] hover:border-[var(--accent)] transition">
                  <div className="text-xs text-[var(--fgDim)]">{t.k}</div>
                  <div className="text-sm mt-1 font-medium">{t.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-12">
            <SectionTitle title="Experience" />
            <div className="mt-4 divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-2xl overflow-hidden">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="p-5 md:p-6 bg-[var(--card)] hover:border-l-4 hover:border-[var(--accent)] transition">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <div className="text-base font-semibold tracking-[-0.01em]">{e.company}</div>
                    <div className="text-sm text-[var(--fgDim)]">{e.role} · {e.dates}</div>
                  </div>
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-[var(--fgSoft)]">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="mt-3 text-xs text-[var(--fgDim)]">{e.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-t border-[var(--hairline)]">
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
                      ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white border-transparent shadow-sm"
                      : "border-[var(--hairline)] hover:border-[var(--accent)]"
                  )}
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
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--card)] hover:shadow-[0_0_20px_rgba(0,122,255,0.25)] transition"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.img}
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
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline" href="#">
                        Case study <ArrowUpRight size={16} />
                      </a>
                      <a className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline" href="#">
                        Code <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.01em] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">Let's talk</h2>
                <p className="mt-1 text-sm text-[var(--fgSoft)]">Open to 2026 roles and collabs.</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="mailto:jinseo@example.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--accent)] transition"><Mail size={16}/> Email</a>
                <a href="https://github.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--accent)] transition"><Github size={16}/> GitHub</a>
                <a href="https://linkedin.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--accent)] transition"><Linkedin size={16}/> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--hairline)] text-[var(--fgDim)]">
        <div className="mx-auto max-w-[1100px] px-4 py-6 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>© {new Date().getFullYear()} Evan Lee</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-[var(--accent)] transition" href="mailto:jinseo@example.com">Email</a>
            <a className="hover:text-[var(--accent)] transition" href="https://github.com">GitHub</a>
            <a className="hover:text-[var(--accent)] transition" href="https://linkedin.com">LinkedIn</a>
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

/**
 * In-file tests (Vitest). These run only in test mode and are ignored in dev/prod builds.
 * To run:  npx vitest run
 */
if (import.meta as any && (import.meta as any).vitest) {
  // @ts-ignore - vitest globals injected at test time
  const { describe, it, expect } = (import.meta as any).vitest as typeof import("vitest");

  describe("helpers", () => {
    it("classNames merges only truthy entries", () => {
      const out = classNames("a", false && "b", "c", null, undefined, "d");
      expect(out).toBe("a c d");
    });

    it("filterProjects returns all when active is All", () => {
      const out = filterProjects(PROJECTS, "All");
      expect(out.length).toBe(PROJECTS.length);
    });

    it("filterProjects filters by tag", () => {
      const out = filterProjects(PROJECTS, "ML");
      expect(out.every((p) => p.tag === "ML")).toBe(true);
    });
  });

  describe("SectionTitle", () => {
    it("returns a React element", () => {
      const el = SectionTitle({ title: "Test" } as any);
      expect(el).toBeTruthy();
      // Basic shape test
      // @ts-ignore
      expect(el.type).toBe("div");
    });
  });
}