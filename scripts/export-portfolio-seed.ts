import { writeFileSync } from "fs";
import {
  site,
  education,
  experience,
  projects,
  skillGroups,
  certifications,
} from "../src/data/site";

const data = {
  site: { ...site, socials: { ...site.socials }, roles: [...site.roles], services: [...site.services] },
  education: education.map((e) => ({ ...e })),
  experience: JSON.parse(JSON.stringify(experience)),
  projects: JSON.parse(JSON.stringify(projects)),
  skills: skillGroups.map((g) => ({ title: g.title, items: [...g.items] })),
  certifications: JSON.parse(JSON.stringify(certifications)),
  chatbot: {
    name: "Ash",
    systemPreamble:
      "You are Ash — Ashmeet Singh Sandhu's personal AI portfolio assistant. Answer ONLY about Ashmeet using the knowledge provided. Be concise, friendly, and accurate. If unknown, say you don't know and suggest emailing sandhuashmeet40@gmail.com.",
  },
};

writeFileSync(
  new URL("../supabase/seed-portfolio.json", import.meta.url),
  JSON.stringify(data, null, 2),
  "utf8",
);

console.log(
  "OK",
  "exp",
  data.experience.length,
  "proj",
  data.projects.length,
  "certs",
  data.certifications.length,
);
