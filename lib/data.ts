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
  /** Falls back to organization initials when omitted */
  logo?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const projects: Project[] = [
  {
    id: "rouge",
    title: "Rouge (2nd Place, JAMHacks 2026)",
    description:
      "AI Minecraft mod that teaches redstone. Ask for a piston door and follow a translucent hologram, one verified block at a time.",
    techStack: ["Java", "Fabric API", "OpenRouter", "LLMs"],
    githubUrl: "https://github.com/Dhanika-Botejue/rouge",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/768/699/datas/gallery.jpg",
    imageAlt: "Rouge Minecraft mod guiding a player through a redstone build",
    demoUrl: "https://devpost.com/software/rouge",
  },
  {
    id: "dubbify",
    title: "Dubbify (Winner, Hack Canada)",
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
    id: "wildfire-convlstm",
    title: "Wildfire Prediction Model",
    description:
      "ConvLSTM fire spread model fed by YOLO fire and smoke detection. 97.7% IoU in simulation, then retrained on 607 real US wildfires.",
    techStack: ["Python", "PyTorch", "YOLO", "ConvLSTM"],
    githubUrl: "https://github.com/malihashar/wildfire-drone",
    image: "/images/projects/wildfire-convlstm.jpg",
    imageAlt:
      "Bird's-eye UAV infrared view detecting wildfire hotspots across mountain terrain",
  },
  {
    id: "rua",
    title: "Rua, AI Development Platform",
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
    id: "wildfire-nsga",
    title: "Wildfire Containment Pathfinding",
    description:
      "NSGA-II plans drone suppression missions for 12 fires in under 0.1 seconds, and D* Lite routes each drone around live fire cells.",
    techStack: ["Python", "NSGA-II", "D* Lite", "Optimization"],
    githubUrl: "https://github.com/malihashar/wildfire-drone",
    image: "/images/projects/wildfire-nsga.jpg",
    imageAlt:
      "Aerial view of a wildfire fuel break containment path separating burned hillside from a community",
  },
  {
    id: "shafaf",
    title: "Shafaf, Aid Coordination Platform",
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
];

export const experience: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    organization: "Magic Hour (YC W24)",
    organizationUrl: "https://www.magichour.ai/",
    period: "Jun 2026 to Present",
    logo: "/logos/magichour.png",
    highlights: [
      "Built a URL-to-ad generator that scrapes product names, prices, images, and reviews from JSON-LD and OpenGraph tags, turning one product page into 9 distinct ad creatives.",
      "Expanded the Magic Hour API to 3 external platforms with an n8n community node, an Apify Actor, and a Grok integration for face swap, image, and video generation.",
      "Shipped a masked crop-and-stitch head swap that runs in 4 diffusion steps after benchmarking 9 open-source face swap model families.",
    ],
  },
  {
    title: "Software Developer",
    organization: "JAMHacks",
    organizationUrl: "https://jamhacks.ca/",
    period: "Aug 2026 to Present",
    highlights: [
      "Owned 52% of completed hacker portal tasks by shipping 12 features, including the grading queue, weighted scoring, applicant ranking, and final acceptance workflow.",
      "Built a QR system for 200+ hackers over 36 hours covering meal scanning with duplicate detection, hardware checkout, returns, and loan tracking.",
    ],
  },
  {
    title: "Research Intern",
    organization: "University of Toronto",
    organizationUrl:
      "https://flight.utias.utoronto.ca/index.php/aerial-robotics-club/what-is-arc",
    period: "Apr 2026 to Sep 2026",
    logo: "/logos/utoronto.png",
    highlights: [
      "Reached 97.7% IoU in simulated fire spread prediction while designing autonomous UAV flight, perception, and mission planning with master's students.",
      "Turned published UAV task planning research into reproducible experiments that plan suppression missions for 12 targets in under 0.1 seconds.",
    ],
  },
  {
    title: "President",
    organization: "Ignition Hacks",
    organizationUrl: "https://ignitionhacks.org/",
    period: "Jul 2026 to Present",
    logo: "/logos/ignitionhacks.png",
    highlights: [
      "Leading a 30+ person team across development, design, sponsorship, logistics, and marketing to run a free 48-hour hackathon.",
      "Secured $4,500 in cash sponsorship from CSE, Shopify, Queen's University, and others, plus 18 in-kind partners including ElevenLabs, n8n, and Render.",
    ],
  },
  {
    title: "Full Stack Developer",
    organization: "Hack The Skies",
    organizationUrl: "https://www.hacktheskies.com/",
    period: "Apr 2026 to Present",
    logo: "/logos/hacktheskies.png",
    highlights: [
      "Building and refining platform features across frontend and backend systems.",
      "Improving participant experience through scalable and efficient technical solutions.",
      "Contributing to architecture decisions and deployment workflows for event-facing platforms.",
    ],
  },
  {
    title: "Lead Web Designer",
    organization: "Campfire",
    period: "Sep 2024 to Present",
    logo: "/logos/campfire.png",
    highlights: [
      "Lead design and development of the organization's website and digital presence.",
      "Designed responsive web interfaces and branding assets for outreach initiatives.",
      "Enhanced engagement and visibility through modern UX and optimized content strategy.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "FastAPI", "PyTorch", "Hugging Face"],
  },
  {
    category: "Tools & Databases",
    items: ["Git", "PostgreSQL", "Supabase", "MongoDB", "Firebase", "Drizzle ORM", "GCP", "n8n"],
  },
  {
    category: "AI/ML",
    items: ["Diffusion Models", "LoRA", "YOLO", "ConvLSTM", "ComfyUI", "NSGA-II"],
  },
];
