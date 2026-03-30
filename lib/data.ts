export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
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
    title: "Dubbify (Hack Canada Winner)",
    description:
      "AI-powered content expansion platform with real-time text processing workflows connected to an LLM backend.",
    techStack: ["Next.js", "TypeScript", "FastAPI"],
    githubUrl: "https://github.com/malihashar",
  },
  {
    title: "Synapse - Identity Network",
    description:
      "Networking platform with tradeable identity cards, profile customization, and a badge-driven engagement system.",
    techStack: ["JavaScript", "Express", "MongoDB"],
    githubUrl: "https://github.com/malihashar",
  },
  {
    title: "Shafaf - Humanitarian Aid",
    description:
      "Aid coordination platform with real-time geospatial dashboarding for donors, mosques, and administrative teams.",
    techStack: ["Next.js", "Supabase", "Mapbox"],
    githubUrl: "https://github.com/malihashar",
  },
  {
    title: "Crictrack",
    description:
      "Cricket tracking application focused on robust routing, player statistics, and maintainable backend workflows.",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/malihashar",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Lead Web Designer",
    organization: "Campfire",
    period: "Sep 2024 - Present",
    highlights: [
      "Built and designed the organization's website and digital presence.",
      "Improved engagement through responsive UI and better information flow.",
      "Collaborated closely with organizers to amplify event visibility.",
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
    items: ["Git", "Docker", "GCP", "VS Code"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB"],
  },
];
