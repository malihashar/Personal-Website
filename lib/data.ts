export interface Project {
  id: string;
  title: string;
  /** Thumbnail (Devpost gallery or file under `public/`) */
  image: string;
  /** Optional self-hosted preview clip (WebM/MP4), loaded only on hover */
  video?: string;
  imageAlt: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  /** Seconds to seek after metadata loads (highlight in a longer file) */
  previewVideoStartSec?: number;
  /** Loop window end (seconds); omit for full-file loop from start offset */
  previewVideoEndSec?: number;
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
    id: "dubbify",
    title: "Dubbify (Winner – Hack Canada)",
    description:
      "AI-powered content expansion platform with real-time text processing workflows connected to an LLM backend.",
    techStack: ["Next.js", "TypeScript", "FastAPI"],
    githubUrl: "https://github.com/malihashar/HackCan",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/425/026/datas/gallery.jpg",
    imageAlt: "Dubbify in-call dashboard with live translation and session controls",
    video: "/projects/dubbify.mp4",
    demoUrl: "https://devpost.com/software/dubbify",
  },
  {
    id: "rua",
    title: "Rua – AI Development Platform",
    description:
      "AI-powered platform to streamline application development with generative workflows for code iteration and rapid prototyping.",
    techStack: ["Next.js", "TypeScript", "GenAI APIs"],
    githubUrl: "https://github.com/vsaios/GenAI-2026",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/444/222/datas/gallery.jpg",
    imageAlt: "Rua map dashboard for reporting and tracking city incidents",
    video: "/projects/rua.mp4",
    demoUrl: "https://devpost.com/software/rua",
  },
  {
    id: "shafaf",
    title: "Shafaf – Aid Coordination Platform",
    description:
      "Aid coordination platform with real-time geospatial dashboarding for donors, mosques, and administrative teams.",
    techStack: ["Next.js", "Supabase", "Mapbox"],
    githubUrl: "https://github.com/Awais-H/Shafaf-Aid",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/209/340/datas/gallery.jpg",
    imageAlt: "Shafaf global geospatial dashboard with 3D map visualization",
    video: "/projects/shafaf.mp4",
    demoUrl: "https://devpost.com/software/shafaf",
  },
  {
    id: "synapse",
    title: "Synapse – Identity Network",
    description:
      "Networking platform with tradeable identity cards, profile customization, and a badge-driven engagement system.",
    techStack: ["JavaScript", "Express", "MongoDB"],
    githubUrl: "https://github.com/malihashar",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/172/337/datas/gallery.jpg",
    imageAlt: "Synapse networking dashboard showing user profile and connections",
    video: "/projects/synapse.mp4",
    demoUrl: "https://devpost.com/software/synapse-y824pm",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Research Intern",
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
