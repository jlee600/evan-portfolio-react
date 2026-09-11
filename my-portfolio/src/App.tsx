import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, BadgeCheck, ChevronDown, Github, Linkedin, Mail, MapPin, Moon, Sun } from "lucide-react";
import { coursework, experiences, featuredProjectIds, overviewExperienceIds, profile, projects, skills, type Project } from "./portfolioData";

const SkillRadar = lazy(() => import("./SkillRadar"));
const lastUpdated = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${__LAST_UPDATED__}T12:00:00Z`));

type SectionId = "overview" | "experience" | "projects" | "skills" | "resume";
type Theme = "light" | "dark";

const navigation: { id: SectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
];

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    return navigation.some((item) => item.id === hash) ? hash : "overview";
  });
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeSection}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <nav className="topnav" aria-label="Portfolio sections">
          {navigation.map((item) => (
            <button key={item.id} className={activeSection === item.id ? "nav-link active" : "nav-link"} onClick={() => setActiveSection(item.id)} aria-current={activeSection === item.id ? "page" : undefined}>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="icon-button theme-button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <div className="page-grid">
        <ProfilePanel />
        <main id="main-content" className="main-content" tabIndex={-1}>
          {activeSection === "overview" && <Overview onNavigate={setActiveSection} />}
          {activeSection === "experience" && <Experience />}
          {activeSection === "projects" && <Projects />}
          {activeSection === "skills" && <Skills />}
          {activeSection === "resume" && <Resume />}
        </main>
      </div>

      <nav className="mobile-nav" aria-label="Mobile portfolio sections">
        {navigation.map((item) => (
          <button key={item.id} className={activeSection === item.id ? "active" : ""} onClick={() => setActiveSection(item.id)} aria-current={activeSection === item.id ? "page" : undefined}>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function ProfilePanel() {
  return (
    <aside className="profile-panel" aria-label="Profile and contact information">
      <div className="profile-intro">
        <img className="profile-photo" src="/img/profile.jpg" alt="Evan Lee" />
        <div className="profile-heading"><p className="eyebrow">{profile.role}</p><h1>{profile.name}</h1><p className="profile-school">{profile.school}</p></div>
      </div>
      <div className="profile-links">
        <a href={`mailto:${profile.email}`}><Mail size={17} aria-hidden="true" /><span>{profile.email}</span></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /><span>{profile.linkedinDisplay}</span></a>
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /><span>{profile.githubDisplay}</span></a>
        <div className="profile-authorization"><BadgeCheck size={17} aria-hidden="true" /><span>{profile.authorization}</span></div>
        <div className="profile-location"><MapPin size={17} aria-hidden="true" /><span>{profile.location}</span></div>
      </div>
    </aside>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return <header className="page-header"><h2>{title}</h2><p>{description}</p></header>;
}

function EducationLogo() {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  return (
    <div className="education-logo">
      {showPlaceholder ? <span title="Georgia Tech logo placeholder">GT</span> : <img src={profile.educationLogo} alt="Georgia Tech" onError={() => setShowPlaceholder(true)} />}
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const [showCoursework, setShowCoursework] = useState(false);
  const featured = projects.filter((project) => featuredProjectIds.includes(project.id));
  const recentExperience = overviewExperienceIds.map((id) => experiences.find((item) => item.id === id)).filter((item) => item !== undefined);
  return (
    <div className="section-view overview-view">
      <section className="hero">
        <p className="eyebrow">Overview</p>
        <h2>Backend, AI infra, and ML.</h2>
        <p className="hero-copy">{profile.about}</p>
      </section>
      <section className="overview-section education-section" aria-labelledby="education-heading">
        <div className="education-section-heading">
          <p className="eyebrow">Education</p>
          <button className="text-button section-utility-link coursework-toggle" type="button" aria-expanded={showCoursework} aria-controls="coursework" onClick={() => setShowCoursework((current) => !current)}>
            {showCoursework ? "Hide coursework" : "View coursework"}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
        </div>
        <div className="education-overview">
          <div className="school-identity">
            <EducationLogo />
            <div><h3 id="education-heading">Georgia Institute of Technology</h3><p>Atlanta, Georgia</p></div>
          </div>
          <div className="degree-grid">
            {profile.education.map((item) => (
              <article className="degree-item" key={item.degree}>
                <div className="degree-heading"><h4>{item.degree}</h4><span>{item.expected}</span></div>
                <dl className="degree-details">
                  <div><dt>Concentration</dt><dd>{item.concentration}</dd></div>
                  {item.gpa && <div><dt>GPA</dt><dd>{item.gpa}</dd></div>}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      {showCoursework && <CourseworkSection />}
      <section className="overview-section">
        <div className="overview-section-heading">
          <div className="section-label-row"><p className="eyebrow">Recent experience</p><button className="text-button section-utility-link" onClick={() => onNavigate("experience")}>All experience <ArrowUpRight size={14} /></button></div>
          <h3>Working across research and industry.</h3>
        </div>
        <div className="overview-experience">
          {recentExperience.map((item) => <article key={item.id}><img src={item.logo} alt="" /><div><h4>{item.company}</h4><p>{item.role}</p></div><time>{item.dates}</time></article>)}
        </div>
      </section>
      <section className="overview-section">
        <div className="overview-section-heading">
          <div className="section-label-row"><p className="eyebrow">Selected work</p><button className="text-button section-utility-link" onClick={() => onNavigate("projects")}>All projects <ArrowUpRight size={14} /></button></div>
          <h3>Projects with measurable outcomes.</h3>
        </div>
        <div className="featured-projects">{featured.map((project) => <FeaturedProject key={project.id} project={project} />)}</div>
      </section>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <a className="featured-project" href={project.href ?? project.demo} target="_blank" rel="noreferrer">
      <div className="featured-image"><img src={project.image} alt={`${project.name} interface`} /></div>
      <div className="featured-copy"><div><span>{project.year}</span><ArrowUpRight size={17} /></div><h4>{project.name}</h4><p>{project.headline}</p><small>{project.tech.slice(0, 4).join(" · ")}</small></div>
    </a>
  );
}

function Experience() {
  const professional = experiences.filter((item) => item.category === "Professional");
  const academic = experiences.filter((item) => item.category === "Academic");
  return (
    <div className="section-view">
      <PageHeader title="Experience" description="Production backend engineering, AI systems, infrastructure, research, and teaching." />
      <ExperienceGroup title="Professional experience" items={professional} />
      <ExperienceGroup title="Academic experience" items={academic} />
    </div>
  );
}

function ExperienceGroup({ title, items }: { title: string; items: typeof experiences }) {
  return (
    <section className="experience-group">
      <h3 className="group-heading">{title}</h3>
      <div className="timeline">
        {items.map((item, index) => (
          <article className="experience-item" key={item.id}>
            <div className="timeline-marker" aria-hidden="true"><span>{index + 1}</span></div>
            <div className="experience-meta"><time>{item.dates}</time><span>{item.location}</span></div>
            <div className="experience-body"><div className="experience-title"><div className="logo-box"><img src={item.logo} alt="" /></div><div><h3>{item.role}</h3><p>{item.company}</p></div></div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return <div className="section-view"><PageHeader title="Projects" description="The problems, technical decisions, and outcomes behind selected builds." /><div className="project-list">{projects.map((project) => <ProjectCaseStudy key={project.id} project={project} />)}</div></div>;
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="project-case">
      <a className="project-image" href={project.href ?? project.demo} target="_blank" rel="noreferrer"><img src={project.image} alt={`${project.name} project interface`} loading="lazy" /></a>
      <div className="project-body">
        <div className="project-title-row"><div><p className="eyebrow">{project.year}</p><h3>{project.name}</h3></div></div><p className="project-headline">{project.headline}</p>
        <dl className="case-details"><div><dt>Context</dt><dd>{project.context}</dd></div><div><dt>Approach</dt><dd>{project.approach}</dd></div><div><dt>Result</dt><dd>{project.result}</dd></div></dl>
        <div className="project-footer"><div className="tag-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div><div className="project-links">{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Demo <ArrowUpRight size={14} /></a>}{project.href && <a href={project.href} target="_blank" rel="noreferrer">Source <Github size={14} /></a>}</div></div>
      </div>
    </article>
  );
}

function Skills() {
  const radarData = useMemo(() => {
    const names = ["Backend", "ML / Data", "Cloud / DevOps", "Frontend"];
    return skills.filter((group) => names.includes(group.category)).map((group) => ({ name: group.category === "Cloud / DevOps" ? "DevOps" : group.category, score: Math.round(group.items.reduce((sum, item) => sum + item.level, 0) / group.items.length * 20) }));
  }, []);
  return (
    <div className="section-view">
      <PageHeader title="Skills" description="Backend and data, with experience across infrastructure, ML, and product interfaces." />
      <section className="skills-summary">
        <div className="radar-wrap" aria-label="Relative technical focus radar chart"><Suspense fallback={<div className="radar-placeholder" aria-hidden="true" />}><SkillRadar data={radarData} /></Suspense></div>
        <div className="skills-thesis"><p className="eyebrow">Engineering profile</p><h3>Backend foundations, applied ML, and the infrastructure to ship both.</h3><p>Comfort levels reflect the tools I use most often, not a claim that learning ever stops.</p></div>
      </section>
      <div className="skill-groups">{skills.map((group) => <section className="skill-group" key={group.category}><h3>{group.category}</h3><div>{group.items.map((item) => <SkillRow key={item.name} name={item.name} level={item.level} />)}</div></section>)}</div>
    </div>
  );
}

function SkillRow({ name, level }: { name: string; level: number }) {
  const labels = ["", "Familiar", "Working knowledge", "Proficient", "Strong", "Primary"];
  return <div className="skill-row"><span>{name}</span><div className="skill-level" aria-label={`${name}: ${labels[level]}`}>{Array.from({ length: 5 }, (_, index) => <i key={index} className={index < level ? "filled" : ""} />)}</div></div>;
}

function CourseworkSection() {
  const categories = ["Computer Science", "Mathematics"] as const;
  return (
    <section id="coursework" className="coursework-section" aria-labelledby="coursework-heading">
      <div className="coursework-heading"><h3 id="coursework-heading">Coursework</h3><p>Undergraduate computer science and mathematics curriculum.</p></div>
      <div className="course-index">
        {categories.map((category) => (
          <div className="course-band" key={category}>
            <h3>{category}</h3>
            <dl className="course-list">
              {coursework.filter((course) => course.category === category).map((course) => <div key={course.code}><dt>{course.code}</dt><dd>{course.title}</dd></div>)}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <div className="section-view">
      <header className="page-header resume-page-header">
        <h2>Resume</h2>
        <div className="resume-subtitle-row">
          <p>Last updated: {lastUpdated}</p>
          <div className="resume-actions"><a href={profile.resume} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={13} /></a><a href={profile.resume} download="Evan-Lee-Resume.pdf">Download PDF <ArrowDownToLine size={13} /></a></div>
        </div>
      </header>
      <div className="resume-frame"><iframe src={`${profile.resume}#toolbar=0&navpanes=0`} title="Evan Lee resume" /></div>
    </div>
  );
}
