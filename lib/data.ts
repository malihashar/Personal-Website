export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  imageSrc: string;
  imageAlt: string;
  /** Short code-style lines shown on project image hover */
  previewSnippet: string;
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
    title: "Dubbify (Winner – Hack Canada)",
    description:
      "AI-powered content expansion platform with real-time text processing workflows connected to an LLM backend.",
    techStack: ["Next.js", "TypeScript", "FastAPI"],
    githubUrl: "https://github.com/malihashar/HackCan",
    imageSrc: "/images/projects/dubbify.svg",
    imageAlt: "Dubbify call processing interface during translation workflow",
    previewSnippet: `const stream = await openAI.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: expandedPrompt }],
  stream: true,
});`,
    demoUrl: "https://devpost.com/software/dubbify",
  },
  {
    title: "Rua – AI Development Platform",
    description:
      "AI-powered platform to streamline application development with generative workflows for code iteration and rapid prototyping.",
    techStack: ["Next.js", "TypeScript", "GenAI APIs"],
    githubUrl: "https://github.com/vsaios/GenAI-2026",
    imageSrc: "/images/projects/rua.svg",
    imageAlt: "Rua map dashboard for reporting and tracking city incidents",
    previewSnippet: `export async function refineComponent(prompt: string) {
  const draft = await generateLayout(prompt);
  return applyGenAIEdits(draft, { temperature: 0.4 });
}`,
    demoUrl: "https://devpost.com/software/rua",
  },
  {
    title: "Shafaf – Aid Coordination Platform",
    description:
      "Aid coordination platform with real-time geospatial dashboarding for donors, mosques, and administrative teams.",
    techStack: ["Next.js", "Supabase", "Mapbox"],
    githubUrl: "https://github.com/Awais-H/Shafaf-Aid",
    imageSrc: "/images/projects/shafaf.svg",
    imageAlt: "Shafaf global geospatial dashboard with 3D map visualization",
    previewSnippet: `const { data } = await supabase
  .from("aid_routes")
  .select("id, geojson, priority")
  .gte("updated_at", since);
map.getSource("routes").setData(data);`,
    demoUrl: "https://devpost.com/software/shafaf",
  },
  {
    title: "Synapse – Identity Network",
    description:
      "Networking platform with tradeable identity cards, profile customization, and a badge-driven engagement system.",
    techStack: ["JavaScript", "Express", "MongoDB"],
    githubUrl: "https://github.com/malihashar",
    imageSrc: "/images/projects/synapse.svg",
    imageAlt: "Synapse networking dashboard showing user profile and connections",
    previewSnippet: `router.post("/profiles/:id/badges", async (req, res) => {
  const badge = await Badge.issue(req.params.id, req.body);
  await broadcast("profile:update", badge);
  res.json(badge);
});`,
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
