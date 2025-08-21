import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

// --- Data ----------------------------------------------------
const PROJECTS = [
  {
    id: 1,
    title: "Realtime Notes Agent",
    blurb: "Local-first notes agent with RAG and evals.",
    stack: ["TypeScript", "Next.js", "Python"],
    year: "2025",
    tag: "ML",
    img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "RHEx Viz",
    blurb: "Multi-graph live telemetry for hip exo.",
    stack: ["Python", "Plotly", "Dash"],
    year: "2025",
    tag: "Systems",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "CourseHub",
    blurb: "Small backend for course data and search.",
    stack: ["Go", "Postgres", "Docker"],
    year: "2024",
    tag: "Backend",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Viz Lab",
    blurb: "WebGL charts for high rate signals.",
    stack: ["TypeScript", "Vite", "Three.js"],
    year: "2024",
    tag: "Data",
    img: "https://images.unsplash.com/photo-1551281044-8d8d2aa9b265?q=80&w=1200&auto=format&fit=crop"
  },
];

const EXPERIENCE = [
  {
    company: "Warner Bros. Discovery",
    role: "Sports Data Strategy Eng Intern",
    dates: "Summer 2025",
    bullets: [
      "Aligned event data across brands with SQL checks",
      "Shipped ETL fixes that reduced late loads",
      "Wrote docs and dashboards for ops"
    ],
    tech: "Python, SQL, dbt, Airflow"
  },
  {
    company: "SendSafely",
    role: "Software Eng Intern",
    dates: "Summer 2024",
    bullets: [
      "Built REST features and tests",
      "Improved latency on key API paths",
      "Hardened auth flows"
    ],
    tech: "Java, Spring, AWS"
  }
];

// --- Helpers -------------------------------------------------
const filters = ["All", "Backend", "Data", "ML", "Systems"] as const;

type Filter = typeof filters[number];

function classNames(...n: Array<string | false | null | undefined>) {
  return n.filter(Boolean).join(" ");
}

// --- Component ----------------------------------------------
export default function ApplePortfolio() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.tag === active);
  }, [active]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased selection:bg-[var(--accent)/15] selection:text-[var(--accent)]">
      {/* Global styles */}
      <style>{globalCSS}</style>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--glass)] bg-[color:var(--glass-fallback)] border-b border-[var(--hairline)]">
        <nav className="mx-auto max-w-[1100px] h-16 flex items-center px-4">
          <div className="text-base font-semibold tracking-[-0.01em]">Jinseo Lee</div>
          <div className="ml-auto hidden sm:flex items-center gap-6 text-sm">
            <NavLink href="#home" label="Home" />
            <NavLink href="#about" label="About" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#experience" label="Experience" />
            <a
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[10px] border border-[var(--hairline)] hover:border-[var(--fgSoft)] transition"
              href="#contact"
            >
              Resume <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section id="home" className="relative">
          <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,#000_40%,transparent_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(0,122,255,0.12),transparent)]" />
          </div>
          <div className="mx-auto max-w-[1100px] px-4 py-24 md:py-28">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-5xl md:text-6xl font-bold tracking-[-0.02em]"
            >
              Jinseo Lee
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-4 text-lg text-[var(--fgSoft)] max-w-[60ch]"
            >
              CS at Georgia Tech, focused on backend and data systems.
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="h-9 inline-flex items-center px-4 rounded-[12px] bg-[var(--fg)] text-[var(--bg)] hover:opacity-95 transition">View projects</a>
              <a href="mailto:jinseo@example.com" className="h-9 inline-flex items-center px-4 rounded-[12px] border border-[var(--hairline)] hover:border-[var(--fgSoft)] transition">Contact</a>
              <span className="ml-2 text-sm text-[var(--fgSoft)]">Atlanta, GA</span>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Current", text: "Realtime notes agent" },
                { title: "Last internship", text: "WBD Sports Data" },
                { title: "Focus", text: "APIs, ETL, systems" },
              ].map((c) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-[var(--hairline)] p-5 hover:shadow-sm hover:border-[var(--fgSoft)]/50 transition bg-[var(--card)]"
                >
                  <div className="text-sm text-[var(--fgDim)]">{c.title}</div>
                  <div className="mt-1 text-base font-medium">{c.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-16 md:py-20">
            <SectionTitle title="About" />
            <p className="mt-4 max-w-[70ch] text-[17px] leading-7 text-[var(--fgSoft)]">
              I am a CS major at Georgia Tech. I like clean systems, clear APIs, and small tools that help people get work done. I care about fast feedback and readable code.
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { k: "School", v: "Georgia Tech" },
                { k: "Focus", v: "Backend, Data" },
                { k: "Tools", v: "TypeScript, Python" },
                { k: "Interests", v: "ML evals, infra" },
              ].map((t) => (
                <div key={t.k} className="rounded-xl border border-[var(--hairline)] p-4 bg-[var(--card)]">
                  <div className="text-xs text-[var(--fgDim)]">{t.k}</div>
                  <div className="text-sm mt-1 font-medium">{t.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 pl-4 border-l border-[var(--hairline)]">
              <div className="text-sm text-[var(--fgDim)]">Timeline</div>
              <ul className="mt-3 space-y-4">
                <li className="text-sm">2025, WBD Sports data intern</li>
                <li className="text-sm">2024, SendSafely SWE intern</li>
                <li className="text-sm">2023, Started at GT</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-16 md:py-20">
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
                      ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                      : "border-[var(--hairline)] hover:border-[var(--fgSoft)]"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {visible.map((p) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--card)] hover:shadow-md hover:border-[var(--fgSoft)]/50 transition"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--hairline)]">{s}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a className="inline-flex items-center gap-1 hover:underline" href="#">
                        Case study <ArrowUpRight size={16} />
                      </a>
                      <a className="inline-flex items-center gap-1 hover:underline" href="#">
                        Code <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-16 md:py-20">
            <SectionTitle title="Experience" />

            <div className="mt-6 divide-y divide-[var(--hairline)] border border-[var(--hairline)] rounded-2xl overflow-hidden">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="p-5 md:p-6 bg-[var(--card)]">
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

        {/* Contact */}
        <section id="contact" className="border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1100px] px-4 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.01em]">Let’s talk</h2>
                <p className="mt-1 text-sm text-[var(--fgSoft)]">Open to 2026 roles and collabs.</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="mailto:jinseo@example.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--fgSoft)] transition"><Mail size={16}/> Email</a>
                <a href="https://github.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--fgSoft)] transition"><Github size={16}/> GitHub</a>
                <a href="https://linkedin.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--hairline)] hover:border-[var(--fgSoft)] transition"><Linkedin size={16}/> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--hairline)] text-[var(--fgDim)]">
        <div className="mx-auto max-w-[1100px] px-4 py-6 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>© {new Date().getFullYear()} Jinseo Lee</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="mailto:jinseo@example.com">Email</a>
            <a className="hover:underline" href="https://github.com">GitHub</a>
            <a className="hover:underline" href="https://linkedin.com">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="relative py-1 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--fg)] hover:after:w-full after:transition-[width]">
      {label}
    </a>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-3xl md:text-[32px] font-semibold tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

const globalCSS = `
:root{
  --bg:#FBFBFD; /* Apple light */
  --fg:#111111;
  --fgSoft:#6E6E73;
  --fgDim:#8E8E93;
  --hairline: #E5E5EA;
  --accent:#007AFF;
  --glass: rgba(255,255,255,0.6);
  --glass-fallback: rgba(255,255,255,0.85);
  --card: #FFFFFF;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0B0B0F; /* deep near-black */
    --fg:#EDEDED;
    --fgSoft:#C7C7CC;
    --fgDim:#8E8E93;
    --hairline:#2A2A2E;
    --glass: rgba(13,13,18,0.6);
    --glass-fallback: rgba(13,13,18,0.8);
    --card:#0F0F14;
  }
}
html,body,#root{height:100%}
body{margin:0; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Segoe UI, Roboto, Helvetica, Arial, sans-serif;}
*{outline-color: var(--accent)}
`;
