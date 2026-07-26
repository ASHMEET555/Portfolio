export const site = {
  name: "Ashmeet Singh Sandhu",
  shortName: "Ashmeet",
  brand: "Ashmeet",
  brandSuffix: ".dev",
  logoLetter: "A",
  watermark: "ASHMEET",
  title: "AI/ML Engineer",
  taglineLead: "Building the",
  taglineHighlight: "intelligent web",
  taglineTrail: "one model at a time.",
  roles: [
    "AI/ML Engineer",
    "Full Stack Engineer",
    "Research Intern",
    "Computer Vision Engineer",
  ],
  bioLine:
    "shipping production AI systems and end-to-end web products from idea to scale.",
  availability: "Available for AI/ML & Full-Stack opportunities",
  aboutHeadline: "A builder at the edge of AI and the web.",
  aboutBody:
    "I design and ship intelligent products — from RAG pipelines and ML systems to polished full-stack front-ends. My favorite zone is where elegant UI meets deep AI infrastructure.",
  location: "Una, Himachal Pradesh",
  locationDetail: "Una, Himachal Pradesh, India (IIIT Una)",
  timezone: "GMT+5:30",
  email: "sandhuashmeet40@gmail.com",
  phone: "+91 7357124419",
  resumePath: "/Ashmeet_Singh_Sandhu_Resume.pdf",
  profileImage: "/me-office.jpg",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.2!2d76.271!3d31.468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ad5c35cef032b%3A0x7c0b0f0f0f0f0f0f!2sIIIT%20Una!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=IIIT+Una+Himachal+Pradesh",
  socials: {
    github: "https://github.com/ASHMEET555",
    linkedin: "https://www.linkedin.com/in/ashmeet-sandhu-79a209324/",
    email: "mailto:sandhuashmeet40@gmail.com",
    x: "https://x.com/AshmeetSandhu_",
    codeforces: "https://codeforces.com/profile/sandhuashmeet40",
    codechef: "https://www.codechef.com/users/ashmeet555/",
    leetcode: "https://leetcode.com/u/Ashmeet555/",
    codolio: "https://codolio.com/profile/ashmeet555",
  },
  githubHandle: "ASHMEET555",
  codolioHandle: "ashmeet555",
  ghChart: "https://ghchart.rshah.org/3784c5/ASHMEET555",
  footerBlurb:
    "Architecting production-ready Artificial Intelligence, real-time ML systems, and modern full-stack web applications.",
  services: [
    "Generative AI & LLM Systems",
    "RAG Pipelines & Custom Agents",
    "Real-time Computer Vision",
    "Full-Stack Web & API Dev",
    "Predictive Analytics & ML",
  ],
  version: "v2026.1 · built for Ashmeet",
};

export const education = [
  {
    years: "2024–2028",
    title: "B.Tech in Computer Science and Engineering",
    detail: "IIIT Una. CGPA 8.87. Focusing on AI systems, LLMs, and production ML pipelines.",
  },
  {
    years: "2023–2024",
    title: "Senior Secondary",
    detail: "Sri Gururam Rai Public School, Sri Ganganagar.",
  },
];

export const experience = [
  {
    id: "queuebuster",
    period: "May 2026 — Present",
    title: "AI Agent Development Intern",
    org: "QueueBuster India",
    logo: "/experience/queuebuster-logo.png",
    bullets: [
      "Built the fraud & anomaly detection layer on ~12M live invoices in QueueBuster Helix across merchant, customer, and global risk surfaces.",
      "Delivered production-ready rule engines and Go APIs over multi-tenant PoS, payment, and settlement traffic with RBAC-protected scoring paths.",
      "Trained ML shadow scoring to ~0.95 AUC and pushed realtime inference to ~200–210 ms with L1 + Redis caching (p95 under 500 ms).",
      "Turned detections into analyst-ready investigations and share-gating decisions so fraud signals could drive real product actions.",
    ],
    detail: {
      headline: "Building fraud intelligence inside QueueBuster Helix",
      summary:
        "QueueBuster is a multi-merchant retail / POS platform. Helix is its multi-tenant intelligence layer — ingesting invoices, payments, settlements, and store operations into ClickHouse, then exposing analytics, alerts, and partner-facing risk signals. My internship focused on making Helix a trustworthy fraud & anomaly stack: detect risky patterns, persist explainable anomalies, help analysts investigate, and gate partner-share when risk is still open.",
      helix:
        "Helix sits beside billing as the system of analytical and risk intelligence. It already sees refunds, cashiers, settlements, and cross-merchant consumer keys — the right place to flag refund abuse, cashier collusion, settlement structuring, and cross-merchant bursts, then feed investigation and lending/partner-share decisions.",
      work: [
        "Mapped a fraud taxonomy (archetypes, data feasibility, case-readiness) against real ClickHouse columns before writing detectors.",
        "Implemented deterministic SQL metrics in a fraud registry: refund velocity spikes, settlement amount structuring, cashier collusion / pair-lock patterns, and cross-merchant refund bursts.",
        "Wired scheduler marts so detectors run as first-class Helix jobs and write case-ready rows into fact_anomaly (reason code, severity, evidence JSON).",
        "Built a Python ML shadow pipeline (Isolation Forest / Autoencoder) with 90-day merchant features and rule-derived weak labels — ranking anomalies without claiming calibrated fraud probability.",
        "Exposed Go scoring APIs with RBAC, plus a realtime invoice-driven path using L1/Redis feature cache for low-latency lookups.",
        "Shipped investigation workflow: auto-open critical anomalies, status lifecycle, resolve-with-note, and an append-only audit event ledger in the Next.js ops UI.",
        "Added three-grain partner-share fraud views (merchant · merchant-customer · global consumer) with a terminal gate so packages stay blocked while cases are still open.",
      ],
      impact: [
        "Risk visibility — abnormal refund/settlement/cashier patterns surface as anomalies instead of silent data.",
        "Partner trust — share packages respect open critical fraud flags until resolved / false-positive.",
        "Analyst loop — critical signals become investigation cases with durable audit history.",
        "Safe ML adoption — shadow scores never rewrite ingestion; SQL rules remain the explainable gate.",
        "Multi-tenant correctness — store/PRIMARY joins, authz on detect/score, and stable detected_at so re-detect does not wipe analyst state.",
      ],
      challenges: [
        {
          title: "ClickHouse grain correctness",
          body: "Mapping results by merchant_id alone collapsed store/day rows and dropped real anomalies. Fixed by returning full-grain keys (merchant + store + date + mode), joining PRIMARY customer observations, and verifying live column names (e.g. payment_pos_date).",
        },
        {
          title: "Lifecycle vs re-detect",
          body: "ReplacingMergeTree re-detects were resetting analyst acknowledge/investigate state. Stabilized detected_at from the anomaly identity so ops progress survives subsequent scans.",
        },
        {
          title: "Authz & expensive scans",
          body: "Detect endpoints and ML score surfaces needed GLOBAL-scoped RBAC. Gated heavy ClickHouse scans behind entitlements and serialized overlapping fraud jobs to protect the cluster.",
        },
        {
          title: "Partner-share fail-closed semantics",
          body: "Blocking only status=new let acknowledged/investigating cases become shareable. Moved to a terminal gate: block while new | acknowledged | investigating; allow only after resolved / false_positive.",
        },
        {
          title: "Honest ML framing under review",
          body: "Resisted overclaiming “fraud probability.” Framed models as shadow anomaly rankers with weak labels, chronological holdout, and production safety (shadow-only writes).",
        },
      ],
      learnings: [
        "Rules before models — explainable SQL gates earn trust; ML stays additive shadow.",
        "Grain is everything — wrong joins are silent correctness bugs, worse than loud crashes.",
        "Contracts beat clever code — Go ↔ TypeScript ↔ Python DTO alignment prevents UI/API drift.",
        "Shadow / fail-open carefully — auto-open cases can be best-effort; partner-share flags must fail closed on critical risk.",
        "One concern per delivery — signals, ML UI, and investigations stay separable for review and rebase survival.",
        "Deepened Go (Gin services/repos), ClickHouse (FINAL, ReplacingMergeTree, event ledgers), SQL fraud baselines, Python unsupervised pipelines, Next.js ops UX, and RBAC feature keys.",
      ],
      tech: [
        "Go (Gin)",
        "ClickHouse",
        "PostgreSQL",
        "Python",
        "Isolation Forest",
        "Autoencoder",
        "Redis",
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "RBAC / AuthZ",
        "Scheduler / ETL",
        "Kafka (context)",
      ],
      images: [
        "/experience/fraud-overview.png?v=2",
        "/experience/helix-platform.png?v=2",
        "/experience/fraud-pipeline.png?v=2",
        "/experience/signal-pipeline.png?v=2",
      ],
      imageCaptions: [
        "Fraud overview — Helix data through detection into the lender-share gate",
        "Helix platform — commerce into analytics, fraud, ops, and partner share",
        "Fraud track end-to-end — signals, ranking, investigations, share gate",
        "Signal path — schedule to anomaly, then investigation or share block",
      ],
    },
  },
  {
    id: "iit-mandi",
    period: "Dec 2025 — May 2026",
    title: "Research Intern",
    org: "IIT Mandi",
    logo: "/experience/iit-mandi-logo.png?v=2",
    bullets: [
      "Built a deployable multimodal ECG–language pipeline for generalized clinical ECG understanding under tight compute budgets.",
      "Replaced a heavy LLM with a compact SLM, ECG-ViT encoder, and modality connector while keeping multi-task reasoning.",
      "Shipped full training, inference, and evaluation across report generation, waveform localization, and ECG question answering.",
      "Validated compression trade-offs: 68.26 macro-AUC on PTB-XL SUB, ~5.99% ROUGE-L retention loss, plus IoU and QA metrics.",
    ],
    detail: {
      headline: "Efficient multimodal ECG–language understanding under real compute constraints",
      summary:
        "At IIT Mandi I worked on ECG modeling and multimodal biomedical time-series understanding. The goal was a generalized ECG pipeline — report generation, localization, and question answering — that stays practical to train and deploy, instead of depending on a heavy language-model backbone that is slow and expensive in clinical settings.",
      contextLabel: "Research framing",
      context:
        "Clinical ECG AI is often locked to narrow tasks and fixed inputs (e.g. single 12-lead, 10s recordings). Modern multimodal ECG–language systems show how an ECG encoder, modality connector, and language model can support flexible multi-task understanding. Small-scale multimodal designs show that compact language models can keep strong behavior when compression is done carefully. My work combined those ideas: keep ECG perception and multimodal reasoning, swap the heavy LLM for an SLM, and measure whether clinical understanding quality survives. Alignment thinking from contrastive vision–language work also shaped how ECG and text embeddings meet in a shared space.",
      work: [
        "Designed a compressed multimodal ECG–language architecture: ECG Vision Transformer (ECG-ViT) for multi-lead waveforms → modality alignment connector → compact SLM for clinically conditioned text generation.",
        "Kept multi-task ECG understanding across heterogeneous inputs (reports, localization, QA) while cutting language-model compute overhead.",
        "Built end-to-end dataset loaders and custom collators for heterogeneous task formats — variable ECG lengths, dynamic lead counts, and mixed annotation schemas.",
        "Implemented dynamic path resolution, variable-length padding, and batching-safe collation so training stayed stable across report generation, waveform localization, and multi-ECG QA.",
        "Added research-grade training infrastructure: seed control for reproducibility, gradient checkpointing for memory-efficient transformers, and auto-resume checkpointing for long runs on limited GPUs.",
        "Extended evaluation beyond classification: PTB-XL SUB classification (macro-AUC 68.26), generative report quality (ROUGE-L with ~5.99% retention loss under compression), temporal localization (IoU), and open-ended ECG QA (exact-match / macro / micro accuracy).",
        "Turned research concepts into a structured software pipeline — preprocessing, experiment design, model implementation, and multi-task evaluation — oriented toward real-world clinical deployability.",
      ],
      challenges: [
        {
          title: "Heterogeneous ECG task formats",
          body: "Report generation, localization, and multi-ECG QA arrive with different input structures, lengths, lead counts, and labels. Required dynamic path resolution, padding logic, and collation strategies that stay batch-safe without collapsing task semantics.",
        },
        {
          title: "Compression without clinical collapse",
          body: "Replacing a heavy LLM with an SLM risks wiping report quality and reasoning. Had to keep ECG-ViT perception + connector alignment intact and measure retention explicitly (AUC, ROUGE-L, IoU, QA accuracy) instead of trusting classification alone.",
        },
        {
          title: "Limited-compute long training",
          body: "Transformer multimodal training on constrained GPUs forced gradient checkpointing, careful batching, and auto-resume checkpoints so multi-day experiments could survive faults without restarting from scratch.",
        },
        {
          title: "Fair multi-task evaluation",
          body: "A single accuracy number is not enough for ECG understanding. Built evaluation coverage for classification, generative reports, temporal localization, and open-ended QA so compression claims stayed honest across clinical behaviors.",
        },
      ],
      learnings: [
        "Perception + connector + language is the reusable multimodal spine — compress the language tower carefully, do not gut ECG encoding first.",
        "Small-scale language-model recipes make deployment realistic; architecture choice and training recipe matter as much as parameter count.",
        "Contrastive / alignment intuition helps modality projection design, but ECG work still needs task-specific loaders, collators, and clinical metrics.",
        "Reproducibility is part of the research product: seeds, checkpoint resume, and memory-aware training decide whether experiments finish.",
        "Translate research ideas into pipelines — loaders, training loops, and multi-metric eval — otherwise architecture concepts never become deployable systems.",
        "Deepened PyTorch multimodal training, ECG time-series representation, SLM fine-tuning patterns, and research engineering under mentorship.",
      ],
      tech: [
        "Python",
        "PyTorch",
        "ECG-ViT",
        "Small Language Models (SLM)",
        "Modality alignment / MLP connector",
        "LoRA-style adaptation (context)",
        "Hugging Face Transformers",
        "Custom dataset loaders & collators",
        "Gradient checkpointing",
        "PTB-XL / MIMIC-ECG (eval context)",
        "ROUGE-L · IoU · Exact-Match QA",
        "Experiment tracking / checkpointing",
      ],
      images: [
        "/experience/research/01-anyecg-architecture.png",
        "/experience/research/02-tinyllava-framework.png",
        "/experience/research/03-clip-alignment.png",
        "/experience/research/04-tinyllava-training.png",
      ],
      imageCaptions: [
        "ECG–language architecture — ECG encoder, modality connector, and language backbone for multi-task understanding",
        "Small-scale multimodal framework — vision/ECG encoder + connector + compact language model",
        "Contrastive alignment — projecting signal and language into a shared embedding space",
        "Efficient multimodal training recipes — design choices that guided compression and fine-tuning",
      ],
      recommendation: {
        label: "View letter of recommendation",
        href: "/experience/Ashmeet_Singh_Sandhu_LetterofRecommendation.pdf",
      },
    },
  },
  {
    id: "builder",
    period: "2024 — Present",
    title: "AI & Full-Stack Builder",
    org: "Open Source & Independent",
    logo: undefined as string | undefined,
    bullets: [
      "Shipped MediNodus, FlashPoint, ChainAuditAI, and triage research platforms end-to-end across product and research surfaces.",
      "Built Live RAG systems, local medical VLM pipelines, and Ethereum-backed audit trails for trustworthy AI workflows.",
      "Designed FastAPI backends and React product UIs that turn ML prototypes into usable tools for real users.",
      "Mentored juniors across ML concepts, backend patterns, and shipping habits so projects moved from notebooks to demos.",
    ],
    detail: undefined as undefined,
  },
] as const;

export type ExperienceItem = (typeof experience)[number];

export const skillGroups = [
  {
    title: "Languages",
    items: [
      "Python",
      "C++",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Go",
      "HTML / CSS",
      "Bash",
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "PyTorch",
      "Deep Learning",
      "LLMs & RAG",
      "LangChain",
      "LangGraph",
      "Computer Vision",
      "ECG-ViT",
      "SLM Compression",
      "Model Fine-tuning",
      "Hugging Face",
      "Embeddings",
      "SHAP / LIME",
      "XGBoost",
      "LightGBM",
      "Isolation Forest",
      "Autoencoder",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "FastAPI",
      "Flask",
      "Next.js",
      "React",
      "TanStack Query",
      "Streamlit",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "spaCy",
    ],
  },
  {
    title: "Data & Backend",
    items: [
      "PostgreSQL",
      "ClickHouse",
      "MongoDB",
      "Redis",
      "Qdrant",
      "Kafka",
      "REST APIs",
      "Gin (Go)",
      "RBAC / AuthZ",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Docker",
      "AWS",
      "Git",
      "CI / CD",
      "GitHub Actions",
      "Linux",
      "Experiment Tracking",
      "System Design",
    ],
  },
] as const;

/** Flat list kept for chat / search helpers */
export const skills = skillGroups.flatMap((group) =>
  group.items.map((name) => ({ category: group.title, name })),
);

export const projects = [
  {
    id: "medinodus",
    title: "MediNodus",
    category: "Medical AI",
    description:
      "Privacy-first medical AI assistant that translates reports, flags abnormalities, and checks drug interactions with local model inference.",
    longDescription:
      "MediNodus is a healthcare-focused AI assistant designed to make medical data understandable and actionable for patients. It converts complex pathology reports into plain language, highlights abnormal values, and supports context-aware drug safety checks. A key design principle is privacy-first inference: sensitive health data is processed inside your own environment, avoiding dependence on third-party LLM APIs for core medical reasoning workflows.",
    problem:
      "Patients struggle with medical literacy and often cannot interpret report values confidently. Polypharmacy risks rise when users lack clear drug-interaction awareness, while cloud-first AI raises trust concerns for sensitive health records.",
    solution:
      "Built an end-to-end assistant with report translation, abnormality detection, and medication-safety screening using a local model pipeline, profile-aware warnings, and simple language outputs for practical patient communication.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=700&fit=crop",
    ],
    tech: ["FastAPI", "MongoDB", "MedGemma", "LangChain", "Docker", "React Native"],
    github: "https://github.com/ASHMEET555/medinodus",
    live: undefined as string | undefined,
    youtube: undefined as string | undefined,
    year: "Dec 2025 – Jan 2026",
    highlights: ["Local inference pipeline", "Privacy-first medical AI", "Patient-friendly report translation"],
  },
  {
    id: "flashpoint",
    title: "FlashPoint",
    category: "Live RAG · SaaS",
    description:
      "Real-time geopolitical intelligence platform ingesting 50+ sources with streaming RAG chat, bias analysis, and map-based monitoring.",
    longDescription:
      "FlashPoint is a production-grade live intelligence stack built to solve the crisis-time knowledge cutoff problem. It ingests continuous streams from Telegram, Reddit, RSS, and news APIs, applies semantic indexing, and serves grounded query responses through a live RAG interface. The platform combines event streaming, geospatial visualization, narrative divergence tracking, and automated report generation into a single operational dashboard.",
    problem:
      "During rapidly evolving events, mainstream reporting often lags, analysts are overwhelmed by high-velocity noisy channels, and standard LLM systems lack robust real-time context retrieval.",
    solution:
      "Developed a live RAG architecture with multi-source ingestion, streaming embedding/indexing, SSE broadcast, geolocation extraction, narrative-balance tracking, and one-click SITREP creation.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1200&h=700&fit=crop",
    ],
    tech: ["Pathway", "FastAPI", "Qdrant", "LangChain", "PostgreSQL", "Redis", "spaCy"],
    github: "https://github.com/Reaper-ai/FlashPoint",
    live: undefined as string | undefined,
    youtube: "https://youtu.be/lqzr3LzJZWU",
    year: "2026",
    highlights: ["50+ live sources", "Streaming RAG", "SITREP report generation"],
  },
  {
    id: "chainaudit",
    title: "ChainAuditAI",
    category: "Fraud · Blockchain",
    description:
      "Hybrid fraud intelligence system combining ML risk scoring with immutable Ethereum-backed proof logging for auditable trust.",
    longDescription:
      "ChainAuditAI combines domain-specific fraud models with blockchain verification to deliver tamper-resistant decision traceability. Fraud scoring is computed off-chain for speed and privacy, while cryptographic proof artifacts are written on-chain for immutable auditability.",
    problem:
      "Conventional fraud systems are often centralized black boxes where decisions can be disputed or insufficiently traceable during audits.",
    solution:
      "Split architecture: ML inference runs off-chain per fraud domain, then fraud metadata is hashed and anchored on Ethereum through smart contracts for independent integrity verification.",
    image: "/projects/chainaudit-dashboard.png",
    images: [
      "/projects/chainaudit-dashboard.png",
      "/projects/chainaudit-scanner.png",
    ],
    tech: ["Python", "FastAPI", "Solidity", "Web3", "Scikit-learn"],
    github: "https://github.com/ASHMEET555",
    live: "https://chainauditai.onrender.com/",
    youtube: undefined as string | undefined,
    year: "2026",
    highlights: ["Multi-domain fraud models", "Immutable auditability", "On-chain integrity"],
  },
  {
    id: "triage",
    title: "Emergency Triage Risk Stratification",
    category: "Research · Clinical AI",
    description:
      "Multimodal ensemble over 58k+ NHAMCS records with ordinal-aware learning and SHAP/LIME clinical explainability.",
    longDescription:
      "Research project building a 3-class emergency triage risk model from real ED records and clinically grounded text signals. Combines tabular vitals/history features, emergency keyword flags, and fine-tuned ClinicalBERT outputs in a stacked meta-learner with leakage-aware validation and SHAP/LIME interpretability.",
    problem:
      "Emergency triage labels are noisy and high stakes; undertriage can delay critical interventions while overtriage burdens limited resources.",
    solution:
      "Multimodal ensemble with ordinal-aware regressors, multiclass classifiers, NLP probabilities, robust OOF validation, and explainability for clinically reviewable decisions.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=700&fit=crop",
      "/projects/triage-assistant.png",
    ],
    tech: ["XGBoost", "LightGBM", "ClinicalBERT", "SHAP", "Streamlit"],
    github: "https://github.com/ASHMEET555",
    live: "https://traigegeist.streamlit.app/",
    youtube: undefined as string | undefined,
    year: "2026",
    highlights: ["QWK 0.5122 · F1 0.5829", "58,124 ED records", "Urgent recall 0.6542"],
  },
  {
    id: "dimreduction",
    title: "Dimensionality Reduction Visualization",
    category: "Data Science",
    description:
      "From 64 dimensions to 2 — visualizing hidden structure with PCA, LDA, ICA, MDS, t-SNE, Isomap, LLE, and UMAP.",
    longDescription:
      "An interactive exploration of classical and modern dimensionality reduction techniques — comparing how PCA, LDA, ICA, MDS, t-SNE, Isomap, LLE, and UMAP unfold high-dimensional structure into interpretable 2D views.",
    problem:
      "High-dimensional datasets hide structure that humans cannot inspect directly, making algorithm choice and parameter intuition hard.",
    solution:
      "Side-by-side visualizations and notebooks that make geometry, clusters, and trade-offs between methods easy to compare.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=700&fit=crop",
    ],
    tech: ["Python", "Scikit-learn", "Matplotlib", "Jupyter"],
    github:
      "https://github.com/ASHMEET555/Dimensionality-Reduction-Visualization-",
    live: undefined as string | undefined,
    youtube: undefined as string | undefined,
    year: "2025",
    highlights: ["8 DR techniques", "Visual comparison", "Educational notebooks"],
  },
  {
    id: "jarvis",
    title: "Jarvis Voice Assistant",
    category: "GenAI · NLP",
    description:
      "Desktop voice assistant capable of speech commands, system automation, and conversational task handling.",
    longDescription:
      "A desktop voice assistant that listens for spoken commands, handles conversational task routing, and automates common system actions through speech recognition and lightweight NLP.",
    problem:
      "Hands-busy workflows still rely on typed commands; a local voice layer can speed up everyday computer tasks.",
    solution:
      "Built a speech-driven assistant with recognition, intent handling, and system automation hooks for practical desktop use.",
    image: "/projects/jarvis-banner.png",
    images: [
      "/projects/jarvis-banner.png",
    ],
    tech: ["Python", "Speech Recognition", "NLP"],
    github: "https://github.com/ASHMEET555/Jarvis-voice-assitant",
    live: undefined as string | undefined,
    youtube: undefined as string | undefined,
    year: "2024",
    highlights: ["Speech commands", "System automation", "Conversational routing"],
  },
] as const;

export type Project = (typeof projects)[number];

export const certifications = [
  {
    id: "codechef-codeforces",
    issuer: "Achievements",
    title: "CodeChef 4-Star · Codeforces Specialist (1530)",
    issued: "Ongoing",
    description:
      "1000+ problems solved across major platforms with consistent competitive programming performance.",
    tone: "emerald",
  },
  {
    id: "icpc",
    issuer: "ICPC",
    title: "AIR 720 · ICPC",
    issued: "2025",
    description:
      "National-level competitive programming placement demonstrating algorithmic problem-solving under pressure.",
    tone: "teal",
  },
  {
    id: "techolympics",
    issuer: "TechOlympics",
    title: "Global Rank 11 (India Rank 1)",
    issued: "2025",
    description:
      "Top national finish in TechOlympics 2025 with strong systems and AI problem-solving outcomes.",
    tone: "blue",
  },
  {
    id: "hackathons",
    issuer: "Community",
    title: "4+ Hackathons",
    issued: "2024–2026",
    description:
      "Built and shipped AI prototypes under time pressure across product, research, and systems tracks.",
    tone: "amber",
  },
  {
    id: "algo-university",
    issuer: "AlgoUniversity",
    title: "Graph Theory Programming Camp",
    issued: "Certificate",
    description:
      "Participated under mentorship of a Codeforces Master and completed 17 advanced graph problems.",
    tone: "indigo",
    view: {
      kind: "image" as const,
      src: "/credentials/images/algo.png",
      label: "View certificate",
    },
  },
  {
    id: "bits-mesra",
    issuer: "BIT Mesra",
    title: "IEEE Mega Project 8.0 — Participation",
    issued: "Hackathon",
    description:
      "Certificate of participation for IEEE Mega Project 8.0 organized by BIT Mesra, Ranchi.",
    tone: "sky",
    view: {
      kind: "image" as const,
      src: "/credentials/images/bits-mesra-hackathon.jpg",
      label: "View certificate",
    },
  },
  {
    id: "iit-kgp",
    issuer: "IIT Kharagpur",
    title: "IIT Kharagpur Hackathon",
    issued: "Hackathon",
    description:
      "Hackathon participation certificate from IIT Kharagpur.",
    tone: "emerald",
    view: {
      kind: "image" as const,
      src: "/credentials/images/iit-kgp-hackathon.jpg",
      label: "View certificate",
    },
  },
  {
    id: "meta-hacker-cup",
    issuer: "Meta",
    title: "Meta Hacker Cup",
    issued: "Contest",
    description:
      "Participation certificate from Meta Hacker Cup competitive programming contest.",
    tone: "blue",
    view: {
      kind: "image" as const,
      src: "/credentials/images/meta-hacker-cup.jpg",
      label: "View certificate",
    },
  },
  {
    id: "infosys-springboard",
    issuer: "Infosys Springboard",
    title: "Infosys Springboard Certificates",
    issued: "15 courses",
    description:
      "Completed Infosys Springboard modules across AI, GenAI, deep learning, NLP, computer vision, data science, and more.",
    tone: "indigo",
    view: {
      kind: "pdf-gallery" as const,
      label: "View all certificates",
      files: [
        { title: "Agile Scrum", src: "/credentials/infosys/agile-scrum.pdf" },
        { title: "AI Primer", src: "/credentials/infosys/ai-primer.pdf" },
        {
          title: "Artificial Intelligence",
          src: "/credentials/infosys/artificial-intelligence.pdf",
        },
        {
          title: "Computer Vision",
          src: "/credentials/infosys/computer-vision.pdf",
        },
        {
          title: "Deep Learning",
          src: "/credentials/infosys/deep-learning.pdf",
        },
        {
          title: "Deep Learning for Developers",
          src: "/credentials/infosys/deep-learning-for-developers.pdf",
        },
        {
          title: "GenAI Learning",
          src: "/credentials/infosys/genai-leasing.pdf",
        },
        {
          title: "Generative AI Model for Developers",
          src: "/credentials/infosys/generative-ai-model-for-developers.pdf",
        },
        {
          title: "Introduction to Data Science",
          src: "/credentials/infosys/introduction-to-data-science.pdf",
        },
        { title: "NLP", src: "/credentials/infosys/nlp.pdf" },
        { title: "OpenAI", src: "/credentials/infosys/openai.pdf" },
        {
          title: "OpenAI Generative Transformer GPT-3",
          src: "/credentials/infosys/openai-generative-transformer-gpt3.pdf",
        },
        {
          title: "Principle of GenAI Collection",
          src: "/credentials/infosys/principle-of-genai-collection.pdf",
        },
        {
          title: "Prompt Engineering",
          src: "/credentials/infosys/prompt-engineering.pdf",
        },
        { title: "Robotics", src: "/credentials/infosys/robotics.pdf" },
      ],
    },
  },
] as const;

export type Certification = (typeof certifications)[number];
