import { caseStudies, getCaseStudyPath } from "@/data/case-studies";
import { about, personalInfo } from "@/data/portfolio";

const siteUrl = "https://tijani-porfolio.dev";
export const ogLocale = "en_US";

export const siteConfig = {
  siteUrl,
  homeUrl: `${siteUrl}/`,
  resumeUrl: `${siteUrl}${personalInfo.resumeUrl}`,
  updatedAt: "2026-11-04T00:00:00.000Z",
  siteName: "Tijani Shabazz Portfolio",
  title: `${personalInfo.name} — ${personalInfo.role}`,
  description: personalInfo.tagline,
  author: personalInfo.name,
  creator: personalInfo.name,
  linkedin: personalInfo.linkedin,
  email: personalInfo.email,
  github: personalInfo.github,
  locale: "en-US",
  ogLocale,
  ogImage: "/og-image.svg",
  keywords: [
    "Tijani Shabazz",
    "Senior Full-Stack Engineer",
    "AI Software Engineer",
    "Full-Stack Development",
    "Web Application Development",
    "SaaS Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "C#",
    ".NET",
    "ASP.NET Core",
    "FastAPI",
    "React Native",
    "Flutter",
    "iOS Development",
    "Android Development",
    "AI Integration",
    "LLM Integration",
    "Retrieval-Augmented Generation",
    "RAG",
    "AI Agents",
    "Model Context Protocol",
    "MCP Tools",
    "Entity Resolution",
    "REST APIs",
    "OAuth",
    "Webhooks",
    "Distributed Systems",
    "SQL Server",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Azure",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Performance Optimization",
    "Production Reliability",
  ],
  geo: {
    region: "US-FL",
    placename: "Fort Lauderdale, Florida, United States",
  },
  sameAs: [personalInfo.linkedin, personalInfo.github],
  aboutSummary: about.summary,
} as const;

export const caseStudyPages = caseStudies.map((study) => `${siteUrl}${getCaseStudyPath(study.slug)}`);

/** Home first, then the work index and each project deep dive. */
export const canonicalPages = [siteConfig.homeUrl, `${siteConfig.siteUrl}/work`, ...caseStudyPages];
