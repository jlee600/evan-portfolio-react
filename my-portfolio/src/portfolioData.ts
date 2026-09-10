export type Project = {
  id: number;
  name: string;
  year: string;
  tech: string[];
  href?: string;
  demo?: string;
  image: string;
  headline: string;
  context: string;
  approach: string;
  result: string;
};

export type Experience = {
  id: string;
  category: "Professional" | "Academic";
  company: string;
  role: string;
  dates: string;
  location: string;
  logo: string;
  bullets: string[];
};

export type SkillGroup = {
  category: "Backend" | "Frontend" | "ML / Data" | "Cloud / DevOps" | "Tooling" | "Team";
  items: { name: string; level: 1 | 2 | 3 | 4 | 5 }[];
};

export const profile = {
  name: "Evan Lee",
  role: "Software Engineer",
  school: "Computer Science @ Georgia Tech",
  educationLogo: "/img/logo/georgia-tech.png",
  education: [
    { degree: "B.S. Computer Science", expected: "Expected Dec 2026", concentration: "AI & Information", gpa: "3.95/4.00" },
    { degree: "M.S. Computer Science", expected: "Expected Dec 2027", concentration: "Artificial Intelligence" },
  ],
  location: "Atlanta, Georgia",
  phone: "770-331-4776",
  email: "evanj3034@gmail.com",
  github: "https://github.com/jlee600",
  githubDisplay: "github.com/jlee600",
  linkedin: "https://www.linkedin.com/in/jlee4223/",
  linkedinDisplay: "linkedin.com/in/jlee4223",
  website: "https://evanlee.site",
  resume: "/img/resume.pdf",
  about:
    "I’m most interested in the systems behind the product: how data moves, how components talk to each other, and what happens when things need to work at real scale. Most of my work has ended up somewhere between backend engineering, infrastructure, and ML.",
  availability: "Open to backend and data-focused software engineering roles.",
  authorization: "U.S. permanent resident",
};

export const overviewExperienceIds = ["ibm", "gt-teaching", "gt-database-research"];
export const featuredProjectIds = [2, 4, 7];

export const experiences: Experience[] = [
  {
    id: "ibm",
    category: "Professional",
    company: "IBM",
    role: "Software Engineer Intern",
    dates: "May 2026 - Aug 2026",
    location: "San Jose, CA",
    logo: "/img/logo/ibm.png",
    bullets: [
      "Built a release intelligence platform with Django, IBM Db2, and watsonx.ai that parsed, clustered, and deduplicated 65,000+ issues across 16 repositories to generate consolidated changelogs for 12 engineering teams.",
      "Engineered Helm-based validation pipelines for four Kubernetes environments, concurrently checking 300+ AWS secrets and 500+ container images and reducing end-to-end validation time from 10 minutes to 1 minute.",
    ],
  },
  {
    id: "klsa",
    category: "Professional",
    company: "K.L. Scott & Associates",
    role: "Software Engineer Intern",
    dates: "Oct 2025 - Dec 2025",
    location: "Atlanta, GA",
    logo: "/img/logo/klsa.jpg",
    bullets: [
      "Developed a containerized multi-agent verification pipeline with Python, FastAPI, LangChain, Docker, and OpenAI APIs, reaching a 93% completion rate on five-stage workflows spanning 2,100+ insurance policy clauses.",
      "Architected a normalized 24-table PostgreSQL backend on Azure that persisted 5,000+ execution states and traceable audit logs across four coordinated AI agents.",
    ],
  },
  {
    id: "sendsafely",
    category: "Professional",
    company: "SendSafely",
    role: "Software Engineer Intern",
    dates: "May 2025 - Aug 2025",
    location: "Newark, DE",
    logo: "/img/logo/ss.png",
    bullets: [
      "Implemented a secure document download service with Java and Spring Boot, integrating AWS Secrets Manager for credential validation and serving 50,000+ monthly encrypted file requests at sub-200ms TTFB.",
      "Automated CI/CD pipelines with GitHub Actions and AWS S3 for Python, Java, and JavaScript SDKs, streamlining versioning and artifact distribution across 10+ active repositories.",
    ],
  },
  {
    id: "gt-teaching",
    category: "Academic",
    company: "Georgia Tech College of Computing",
    role: "Teaching Assistant · CS 3300 Software Engineering",
    dates: "Aug 2026 - Present",
    location: "Atlanta, GA",
    logo: "/img/logo/coc.jpg",
    bullets: [
      "Support a 140-student software engineering course through weekly project syncs with a 28-student cohort and office hours covering Java, Spring Boot, REST APIs, testing, architecture patterns, and Google Cloud.",
    ],
  },
  {
    id: "gt-database-research",
    category: "Academic",
    company: "Georgia Tech College of Computing",
    role: "Research Assistant · Advanced Database Systems Lab",
    dates: "Jan 2026 - Present",
    location: "Atlanta, GA",
    logo: "/img/logo/coc.jpg",
    bullets: [
      "Benchmarked dense, sparse, and hybrid retrieval with FAISS and BM25 for a textbook RAG system, improving Recall@5 from 64% to 88% while delivering sub-300ms source-cited answers for 100+ students.",
    ],
  },
  {
    id: "epic-research",
    category: "Academic",
    company: "Georgia Tech Research Institute",
    role: "Research Assistant · Exoskeleton & Prosthetic Intelligent Controls Lab",
    dates: "Jan 2025 - May 2026",
    location: "Atlanta, GA",
    logo: "/img/logo/epic.jpeg",
    bullets: [
      "Trained TCN intent-prediction models in PyTorch on 30,000+ stroke-patient gait samples, reaching 0.882 macro F1 after Optuna tuning.",
      "Built NVIDIA Jetson inference and deployment pipelines that reduced experiment setup time from 5 minutes to under 1 minute.",
    ],
  }
];

export const projects: Project[] = [
  {
    id: 2,
    name: "TokenSmith",
    year: "2026",
    tech: ["Python", "RAG", "FAISS", "BM25", "llama.cpp"],
    href: "https://github.com/georgia-tech-db/TokenSmith",
    image: "/img/tokensmith.png",
    headline: "A source-cited textbook retrieval system for fast, local question answering.",
    context: "Keyword search alone makes long textbook PDFs difficult to query, while unconstrained generation can produce answers without reliable evidence.",
    approach: "Benchmarked dense, sparse, and hybrid retrieval with FAISS and BM25, using local llama.cpp inference and source-linked results.",
    result: "Improved Recall@5 from 64% to 88% and delivered sub-300ms source-cited answers for 100+ students.",
  },
  {
    id: 4,
    name: "Adversarial AI Game Agent",
    year: "2025",
    tech: ["Python", "Scikit-learn", "Alpha-Beta Pruning", "A*", "State Caching"],
    href: "https://github.com/jlee600/Chicken-Game",
    image: "/img/chicken.png",
    headline: "A turn-based game agent combining adversarial search, pathfinding, and learned heuristics.",
    context: "The game required decisions under partial information, balancing immediate movement, opponent modeling, and long-term board position.",
    approach: "Combined Alpha-Beta Pruning, A* pathfinding, probabilistic belief modeling, state caching, and regression-tuned heuristics trained on 18,000+ games.",
    result: "Achieved an 84% win rate against heuristic baselines.",
  },
  {
    id: 7,
    name: "5-Stage Pipelined Processor",
    year: "2025",
    tech: ["Verilog", "CircuitSim", "Assembly", "Computer Architecture"],
    href: "https://github.com/jlee600/lc3200b-pipelined-processor",
    demo: "/img/lc3_report.pdf",
    image: "/img/lc3.png",
    headline: "A functionally complete 32-bit processor with forwarding and flush logic.",
    context: "A pipelined CPU must preserve instruction correctness while resolving data dependencies and control-flow changes across concurrent stages.",
    approach: "Implemented a five-stage design in CircuitSim with 17 subcircuits, 16 registers, priority-encoded forwarding, and zero-vector flush logic.",
    result: "Eliminated data and control hazards in the completed processor design.",
  },
  {
    id: 1,
    name: "Hate-Speech Detector",
    year: "2026",
    tech: ["Python", "Scikit-learn", "TF-IDF", "SVM"],
    href: "https://github.com/jlee600/automated-hate-speech-detection",
    image: "/img/hate.png",
    headline: "A comparison of linear and probabilistic models for hate-speech classification.",
    context: "Indirect language and shared vocabulary make simple keyword moderation unreliable.",
    approach: "Compared cost-sensitive Logistic Regression, Linear SVM, and Naive Bayes with TF-IDF and feature engineering.",
    result: "Naive Bayes reached 80.1% recall, while Logistic Regression achieved the strongest overall PR-AUC at 84.1%.",
  },
  {
    id: 3,
    name: "Master Exoskeleton Dashboard",
    year: "2026",
    tech: ["Python", "JavaScript", "SSH", "Linux", "NVIDIA Jetson"],
    href: "https://github.com/jlee600/Exo-Launcher",
    demo: "https://youtu.be/DgRfzM1G72I",
    image: "/img/rhex2.png",
    headline: "One launch surface for a research lab cluster of NVIDIA Jetsons.",
    context: "Experiments required repeated SSH sessions, credentials, and synchronization steps, creating delays and opportunities for error.",
    approach: "Built a Python launcher and web dashboard that handled Wi-Fi, SSH, and controller scripts as repeatable tasks.",
    result: "Reduced experiment setup time from 5 minutes to under 1 minute and removed 4-6 manual steps per run.",
  },
  {
    id: 5,
    name: "CollabPlan AI",
    year: "2025",
    tech: ["Python", "FastAPI", "React", "SQLite", "Hugging Face"],
    href: "https://github.com/jlee600/CollabPlan-AI",
    demo: "https://youtu.be/iZvC5hSalXE",
    image: "/img/collabplan.png",
    headline: "A local-first meeting assistant for transcripts, decisions, and action items.",
    context: "Recordings, chat logs, and scattered notes made it difficult for teams to recall decisions and ownership.",
    approach: "Combined FastAPI, React, SQLite, and local Hugging Face models for diarization and summarization while keeping data under user control.",
    result: "Cut meeting review time by about 28%, improved transcript clarity by 11%, and handled 90-minute calls across three input modes.",
  },
  {
    id: 6,
    name: "Hip Exoskeleton Controls",
    year: "2025",
    tech: ["Python", "PyTorch", "Optuna", "NVIDIA Jetson", "Mechatronics"],
    href: "https://www.epic.gatech.edu/projects/",
    image: "/img/hipexo.jpg",
    headline: "Intent-prediction and experiment tooling for a robotic hip exoskeleton.",
    context: "Researchers needed consistent pipelines for training gait models and moving experiments from development to Jetson-based hardware.",
    approach: "Trained TCN models in PyTorch with Optuna tuning and built data, inference, and deployment tooling for lab experiments.",
    result: "Reached 0.882 macro F1 on 30,000+ stroke-patient gait samples and reduced hardware setup from 5 minutes to under 1 minute.",
  },
  {
    id: 8,
    name: "Airline Management System",
    year: "2025",
    tech: ["MySQL", "Relational Design", "Stored Procedures"],
    href: "https://github.com/jlee600/GaTech/tree/main/Spring%202025/Database-System/Final%20Project",
    image: "/img/airline.png",
    headline: "A relational model designed around airline booking and routing rules.",
    context: "Airline operations require a schema that handles interconnected booking, route, personnel, and scheduling constraints.",
    approach: "Translated an ER model into normalized MySQL tables, foreign keys, procedures, and operational queries.",
    result: "Designed 20+ normalized tables and 14 stored procedures while keeping complex joins under 120ms on 2,000-row datasets.",
  },
  {
    id: 9,
    name: "Spotify Wrapped Clone",
    year: "2024",
    tech: ["Java", "Kotlin", "Android", "SQLite", "Spotify API"],
    href: "https://github.com/jlee600/Spotify-Project",
    demo: "https://youtu.be/cEpOLU2JK2M",
    image: "/img/spotify.png",
    headline: "An Android year-in-review experience for personal listening habits.",
    context: "The product needed to turn Spotify listening data into a fast, familiar mobile experience.",
    approach: "Used the Spotify API, a local SQLite cache, and native Android patterns to keep statistics responsive and resilient to spotty networks.",
    result: "Improved local query time by 29%, cut API latency by 15%, and shipped version one with a six-person team.",
  },
  {
    id: 10,
    name: "Han River EDA",
    year: "2023",
    tech: ["Python", "Pandas", "Matplotlib"],
    href: "https://github.com/jlee600/HanRiverEDA/blob/main/Downloads/1302_project_1.ipynb",
    demo: "/img/eda_report.pdf",
    image: "/img/eda.png",
    headline: "A visual analysis of public Han River flow and water-quality data.",
    context: "Raw tables made changes in river flow and water quality difficult to understand over time.",
    approach: "Cleaned and reshaped the data with Pandas, then designed Matplotlib views around the most meaningful trends.",
    result: "Produced a walkthrough-style notebook that helped classmates understand the findings quickly.",
  },
];

export const skills: SkillGroup[] = [
  { category: "Backend", items: [{ name: "Python", level: 5 }, { name: "Java / Kotlin", level: 5 }, { name: "PostgreSQL / MySQL", level: 5 }, { name: "FastAPI / REST", level: 4 }, { name: "Linux", level: 4 }] },
  { category: "ML / Data", items: [{ name: "Pandas / NumPy", level: 5 }, { name: "FAISS / Vector Search", level: 5 }, { name: "PyTorch", level: 4 }, { name: "RAG Systems", level: 4 }, { name: "Scikit-learn", level: 4 }] },
  { category: "Cloud / DevOps", items: [{ name: "GitHub Actions", level: 5 }, { name: "CI/CD Pipelines", level: 4 }, { name: "Shell Scripting", level: 4 }, { name: "AWS", level: 3 }, { name: "Docker", level: 3 }] },
  { category: "Frontend", items: [{ name: "Android", level: 4 }, { name: "JavaScript / TypeScript", level: 4 }, { name: "React", level: 3 }, { name: "HTML / CSS", level: 3 }, { name: "Tailwind", level: 3 }] },
  { category: "Tooling", items: [{ name: "Git", level: 5 }, { name: "VS Code / IntelliJ", level: 5 }, { name: "DataGrip / MySQL Workbench", level: 4 }, { name: "CircuitSim / Assembly", level: 4 }, { name: "LaTeX", level: 2 }] },
  { category: "Team", items: [{ name: "Mentoring / Teaching", level: 5 }, { name: "Cross-Team Collaboration", level: 5 }, { name: "Code Reviews", level: 4 }, { name: "Technical Documentation", level: 4 }, { name: "Software Testing", level: 4 }] },
];

export const coursework = [
  { code: "CS 1331", title: "Object-Oriented Programming", category: "Computer Science" },
  { code: "CS 1332", title: "Data Structures & Algorithms", category: "Computer Science" },
  { code: "CS 2050", title: "Discrete Math for CS", category: "Computer Science" },
  { code: "CS 2340", title: "Objects & Design", category: "Computer Science" },
  { code: "CS 2110", title: "Computer Organization & Programming", category: "Computer Science" },
  { code: "CS 2200", title: "Systems & Networks", category: "Computer Science" },
  { code: "CS 3001", title: "Computing & Society", category: "Computer Science" },
  { code: "CS 3251", title: "Computer Networking I", category: "Computer Science" },
  { code: "CS 3510", title: "Design & Analysis of Algorithms", category: "Computer Science" },
  { code: "CS 3600", title: "Artificial Intelligence", category: "Computer Science" },
  { code: "CS 3630", title: "Perception & Robotics", category: "Computer Science" },
  { code: "CS 4400", title: "Database Systems", category: "Computer Science" },
  { code: "CS 4476", title: "Computer Vision", category: "Computer Science" },
  { code: "CS 4641", title: "Machine Learning", category: "Computer Science" },
  { code: "MATH 1551", title: "Differential Calculus", category: "Mathematics" },
  { code: "MATH 1552", title: "Integral Calculus", category: "Mathematics" },
  { code: "MATH 1554", title: "Linear Algebra", category: "Mathematics" },
  { code: "MATH 2550", title: "Multivariable Calculus", category: "Mathematics" },
  { code: "MATH 3670", title: "Statistics and Applications", category: "Mathematics" },
  { code: "MATH 3012", title: "Applied Combinatorics", category: "Mathematics" },
] as const;
