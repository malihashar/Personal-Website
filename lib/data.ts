export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  /** Thumbnail under `public/` (e.g. `/images/projects/rua.svg`) */
  imageSrc: string;
  imageAlt: string;
  /** Pre-trimmed ~15s clip; loaded only on hover on fine-pointer devices */
  previewVideoSrc?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  highlights: string[];
}

export interface LeadershipItem {
  title: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const projects: Project[] = [
  {
    title: "Dubbify",
    description:
      "Conference calls with real-time translation so everyone hears their own language. Hack Canada winner.",
    techStack: ["Next.js", "TypeScript", "FastAPI"],
    githubUrl: "https://github.com/malihashar/HackCan",
    imageSrc: "/images/projects/dubbify.svg",
    imageAlt: "Dubbify — live translation for conference calls",
    previewVideoSrc: "/videos/projects/dubbify.webm",
    demoUrl: "https://devpost.com/software/dubbify",
  },
  {
    title: "Rua",
    description:
      "Detects and maps urban road hazards in real time with AI, maps, and citizen reports for smarter repairs.",
    techStack: ["Next.js", "TypeScript", "GenAI APIs"],
    githubUrl: "https://github.com/vsaios/GenAI-2026",
    imageSrc: "/images/projects/rua.svg",
    imageAlt: "Rua — urban road hazard mapping",
    previewVideoSrc: "/videos/projects/rua.webm",
    demoUrl: "https://devpost.com/software/rua",
  },
  {
    title: "Shafaf",
    description: "Transparent aid coordination with geospatial tooling for donors and field teams.",
    techStack: ["Next.js", "Supabase", "Mapbox"],
    githubUrl: "https://github.com/Awais-H/Shafaf-Aid",
    imageSrc: "/images/projects/shafaf.svg",
    imageAlt: "Shafaf — aid coordination platform",
    previewVideoSrc: "/videos/projects/shafaf.webm",
    demoUrl: "https://devpost.com/software/shafaf",
  },
  {
    title: "Synapse",
    description:
      "Networking with collectible-style cards and tokens to make identity and connections more engaging.",
    techStack: ["JavaScript", "Express", "MongoDB"],
    githubUrl: "https://github.com/malihashar",
    imageSrc: "/images/projects/synapse.svg",
    imageAlt: "Synapse — identity and networking cards",
    previewVideoSrc: "/videos/projects/synapse.webm",
    demoUrl: "https://devpost.com/software/synapse-y824pm",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Researcher",
    organization: "University of Toronto (Hybrid)",
    organizationUrl:
      "https://flight.utias.utoronto.ca/index.php/aerial-robotics-club/what-is-arc",
    period: "Apr 2026 - Present",
    highlights: [
      "Contributing to research initiatives in autonomous systems and emerging technologies.",
      "Supporting experimentation and collaborative technical development in academic settings.",
      "Collaborating with interdisciplinary teams on applied AI and systems-based research projects.",
    ],
  },
  {
    title: "Full Stack Developer",
    organization: "Hack The Skies",
    organizationUrl: "https://www.hacktheskies.com/",
    period: "Apr 2026 - Present",
    highlights: [
      "Building and refining platform features across frontend and backend systems.",
      "Improving participant experience through scalable and efficient technical solutions.",
      "Contributing to architecture decisions and deployment workflows for event-facing platforms.",
    ],
  },
  {
    title: "Lead Web Designer",
    organization: "Campfire",
    period: "Sep 2024 - Present",
    highlights: [
      "Lead design and development of the organization's website and digital presence.",
      "Designed responsive web interfaces and branding assets for outreach initiatives.",
      "Enhanced engagement and visibility through modern UX and optimized content strategy.",
    ],
  },
];

export const leadership: LeadershipItem[] = [
  {
    title: "DECA",
    detail: "Top 2 PMK Provincials and strong case performance.",
  },
  {
    title: "Robotics Executive",
    detail: "Helped drive operations, planning, and team execution.",
  },
  {
    title: "Science Olympiad",
    detail: "Competed in timed science and engineering events.",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "FastAPI"],
  },
  {
    category: "Tools",
    items: ["Git", "GCP", "VS Code"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB"],
  },
];
