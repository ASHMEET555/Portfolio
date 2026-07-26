import {
  certifications as localCerts,
  education as localEducation,
  experience as localExperience,
  projects as localProjects,
  site as localSite,
  skillGroups as localSkillGroups,
} from "@/data/site";

export type SiteContent = typeof localSite;
export type EducationItem = (typeof localEducation)[number];
export type ExperienceItem = (typeof localExperience)[number];
export type Project = (typeof localProjects)[number];
export type ProjectItem = Project;
export type SkillGroup = { title: string; items: string[] };
export type Certification = (typeof localCerts)[number];
export type CertificationItem = Certification;

export type PortfolioData = {
  site: SiteContent;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: Project[];
  /** Prefer skillGroups in JSON; skills is accepted as an alias when loading. */
  skillGroups: SkillGroup[];
  certifications: Certification[];
  chatbot?: { name?: string; systemPreamble?: string };
};

/** Local fallback used when Supabase is offline or during first paint. */
export function localPortfolio(): PortfolioData {
  return {
    site: {
      ...localSite,
      socials: { ...localSite.socials },
      roles: [...localSite.roles],
      services: [...localSite.services],
    },
    education: localEducation.map((e) => ({ ...e })),
    experience: JSON.parse(JSON.stringify(localExperience)) as ExperienceItem[],
    projects: JSON.parse(JSON.stringify(localProjects)) as Project[],
    skillGroups: localSkillGroups.map((g) => ({
      title: g.title,
      items: [...g.items],
    })),
    certifications: JSON.parse(
      JSON.stringify(localCerts),
    ) as Certification[],
    chatbot: {
      name: "Ash",
      systemPreamble: `You are Ash — ${localSite.name}'s personal AI portfolio assistant. Answer ONLY about Ashmeet using the knowledge provided. Be concise, friendly, and accurate. If unknown, say you don't know and suggest emailing ${localSite.email}.`,
    },
  };
}
