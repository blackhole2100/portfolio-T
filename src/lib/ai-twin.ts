import { caseStudies, getCaseStudyPath } from "@/data/case-studies";
import { about, bulletText, experiences, personalInfo, projects, skillCategories, stats } from "@/data/portfolio";

export const CHAT_MEMORY_WINDOW = 10;
export const CHAT_STORAGE_KEY = "tijani-ai-twin-chat";
export const PROJECT_ANCHOR_PREFIX = "project-";
export const WELCOME_MESSAGE = "Hi - I’m Tijani’s AI portfolio assistant. I can summarize his full-stack, mobile, and AI experience, walk through a project, or explain his role in a specific delivery. You can [browse the projects](#work), [review his experience](#experience), or [download the resume](/resume.pdf).";

type ConversationWindowMessage = {
  content: string;
  id?: string;
  role?: "user" | "assistant";
  sender?: "user" | "ai";
};

function getConversationWindowRole(message: ConversationWindowMessage) {
  if (message.id === "welcome") return null;
  if (message.role === "user" || message.role === "assistant") return message.role;
  if (message.sender === "user" || message.sender === "ai") return message.sender;
  return null;
}

export function trimConversationHistory<T extends ConversationWindowMessage>(
  messages: T[],
  maxMessages = CHAT_MEMORY_WINDOW
) {
  if (maxMessages <= 0) return [];

  const turns: T[][] = [];
  let currentTurn: T[] = [];

  messages.forEach((message) => {
    const role = getConversationWindowRole(message);

    if (!role) return;

    if (role === "user") {
      if (currentTurn.length > 0) {
        turns.push(currentTurn);
      }

      currentTurn = [message];
      return;
    }

    if (currentTurn.length === 0) return;
    currentTurn.push(message);
  });

  if (currentTurn.length > 0) {
    turns.push(currentTurn);
  }

  const trimmed: T[] = [];

  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];

    if (trimmed.length + turn.length > maxMessages) {
      break;
    }

    trimmed.unshift(...turn);
  }

  return trimmed;
}

export function getProjectAnchor(slug: string) {
  return `#${PROJECT_ANCHOR_PREFIX}${slug}`;
}

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    // Preserve common programming-language spellings before stripping punctuation.
    .replace(/c\s*#/gi, " csharp ")
    .replace(/c\s*\+\+/gi, " cplusplus ")
    .replace(/\.net/gi, " dotnet ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const projectMatchers = projects.map((project) => ({
  project,
  phrases: Array.from(
    new Set(
      [
        normalizeText(project.title),
        normalizeText(project.title.replace(/\bv\d+\b/gi, "")),
        normalizeText(project.slug.replace(/-/g, " ")),
        ...project.title.split(/[-:|\u2013\u2014]/).map((part) => normalizeText(part)),
      ].filter((phrase) => phrase.length > 0)
    )
  ),
}));

const projectAnchorMap = new Map(projects.map((project) => [getProjectAnchor(project.slug), project]));

const caseStudyMatchers = caseStudies.map((study) => ({
  study,
  phrases: Array.from(
    new Set(
      [
        normalizeText(study.title),
        normalizeText(study.slug.replace(/-/g, " ")),
        ...study.tags.map((tag) => normalizeText(tag)),
        ...study.aliases.map((alias) => normalizeText(alias)),
      ].filter((phrase) => phrase.length > 0)
    )
  ),
}));

export function findMatchingCaseStudies(text: string) {
  const corpus = normalizeText(text);

  return caseStudyMatchers
    .filter(({ phrases }) => phrases.some((phrase) => corpus.includes(phrase)))
    .map(({ study }) => study)
    .slice(0, 2);
}

const profileStats = stats.map((stat) => `${stat.value}${stat.suffix} ${stat.label}`).join("; ");

const experienceContext = experiences
  .map((experience) => {
    const bullets = experience.bullets.slice(0, 2).map((bullet) => bulletText(bullet));
    return [
      `- ${experience.company} | ${experience.role} | ${experience.period}`,
      experience.summary,
      ...bullets.map((bullet) => `  - ${bullet}`),
    ].join("\n");
  })
  .join("\n");

/** Compact 51-project index. Full implementation and contribution detail is fetched on demand. */
const caseStudyContext = caseStudies
  .map((study) => `- ${study.title} | ${study.kind} | slug: ${study.slug} | focus: ${study.tags.slice(0, 3).join(", ")}`)
  .join("\n");

const skillContext = skillCategories
  .map((category) => `- ${category.title}: ${category.skills.join(", ")}`)
  .join("\n");

export const PORTFOLIO_CONTEXT = `
Personal info:
- Name: ${personalInfo.name}
- Role: ${personalInfo.role}
- Location: ${personalInfo.location}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}
- Email: ${personalInfo.email}
- Resume: ${personalInfo.resumeUrl}

Professional summary:
${about.summary}

Career results (keep each figure in its stated context):
${profileStats}
- 93% application load-time reduction and contributions to real-time platforms processing 1,000+ events/second are career-level results; the resume does not assign them to named projects.

Experience:
${experienceContext}

Project index:
Tijani confirms participation in developing and deploying every project in this index. Individual pages contain the full product context, contribution scope, implementation details, and ownership boundaries; retrieve them with get_case_study when a question asks for specifics.
${caseStudyContext}

Skills:
${skillContext}

Navigation:
- Contact: #contact
- Work: #work
- Experience: #experience
- Skills: #skills
- Resume: ${personalInfo.resumeUrl}
`;

/** Topic-level context for the suggestion generator; it intentionally excludes project detail. */
export const PORTFOLIO_CONTEXT_BRIEF = `
${personalInfo.name} - ${personalInfo.role}
Location: ${personalInfo.location}
${about.summary}

Experience:
${experiences.map((experience) => `- ${experience.company}: ${experience.role} (${experience.period})`).join("\n")}

Project topics:
${caseStudies.map((study) => `- ${study.title} (${study.tags.slice(0, 2).join(", ")})`).join("\n")}

Skills:
${skillContext}
`;

export const PORTFOLIO_LINK_GUIDE = `
When links would help the visitor, use these markdown links directly:
- [Jump to Contact](#contact)
- [View LinkedIn](${personalInfo.linkedin})
- [View GitHub](${personalInfo.github})
- [Email Tijani](mailto:${personalInfo.email})
- [Browse all 51 projects](/work)
- [Review Experience](#experience)
- [View Skills](#skills)
- [Download Resume](${personalInfo.resumeUrl})
For an individual project, use the case-study URL returned by search_work. Its page contains the official public project links when available. Do not recreate or guess project URLs.
`;

export function findMatchingProjects(text: string) {
  const corpus = normalizeText(text);

  return projectMatchers
    .filter(({ phrases }) => phrases.some((phrase) => phrase.length > 0 && corpus.includes(phrase)))
    .map(({ project }) => project)
    .slice(0, 2);
}

function getAnchorLabel(href: string) {
  if (href === "#contact") return "Contact section";
  if (href === "#projects") return "Projects section";

  const project = projectAnchorMap.get(href);
  if (project) return project.title;

  return href.replace(/^#/, "");
}

function normalizeGeneratedLinks(response: string) {
  let next = response;

  next = next.replace(/\[(#(?:project-[a-z0-9-]+|projects|contact))\]/gi, (_, href: string) => {
    return `[${getAnchorLabel(href)}](${href})`;
  });

  next = next.replace(/(View details:\s*)(#(?:project-[a-z0-9-]+|projects|contact))/gi, (_, prefix: string, href: string) => {
    return `${prefix}[${getAnchorLabel(href)}](${href})`;
  });

  return next;
}

type InlineLink = {
  href: string;
  label: string;
  kind: "linkedin" | "resume" | "contact" | "projects" | "project" | "case-study";
};

function buildInlineLinkSentence(links: InlineLink[]) {
  if (links.length === 0) return "";

  const clauses = links.map((link) => {
    switch (link.kind) {
      case "linkedin":
        return `view Tijani's [LinkedIn](${link.href})`;
      case "resume":
        return `download the [resume](${link.href})`;
      case "contact":
        return `jump to the [Contact section](${link.href})`;
      case "projects":
        return `open the [Work section](${link.href})`;
      case "case-study":
        return `read the [${link.label} case study](${link.href})`;
      case "project":
        return `view [${link.label}](${link.href})`;
      default:
        return `open [${link.label}](${link.href})`;
    }
  });

  if (clauses.length === 1) {
    return `You can ${clauses[0]} here.`;
  }

  if (clauses.length === 2) {
    return `You can ${clauses[0]} and ${clauses[1]} here.`;
  }

  const lastClause = clauses[clauses.length - 1];
  return `You can ${clauses.slice(0, -1).join(", ")}, and ${lastClause} here.`;
}

export function appendContextualLinks(userMessage: string, aiResponse: string) {
  const response = normalizeGeneratedLinks(aiResponse.trim());
  const normalizedUserMessage = normalizeText(userMessage);
  const links: InlineLink[] = [];
  const asksForLinkedIn = /(linkedin|linked in)/i.test(normalizedUserMessage);
  const asksForResume = /\b(resume|cv)\b/i.test(normalizedUserMessage);
  // `open` needs a following noun. Bare `open` matched "open to relocating",
  // "open source", and "OpenTelemetry", injecting project links into answers
  // that never asked for one.
  const asksForProjectLink = /(project link|live link|demo link|link to|open (?:the )?(?:project|demo|repo|site|page|app)|show me|navigate|take me|where can i see|where can i find)/i.test(normalizedUserMessage);
  const asksForContactSection = /(contact section|open contact|navigate to contact|take me to contact)/i.test(normalizedUserMessage);
  const asksForProjectsSection = /(projects section|work section|open projects|open work|navigate to projects|take me to projects)/i.test(normalizedUserMessage);
  const asksForDetail = /(case study|deep dive|architecture|how does it work|how did you build|more detail|write up|writeup|read more)/i.test(
    normalizedUserMessage
  );

  const addLink = (link: InlineLink) => {
    const { href } = link;
    if (response.includes(href) || links.some((link) => link.href === href)) return;
    links.push(link);
  };

  if (asksForLinkedIn) {
    addLink({ label: "LinkedIn", href: personalInfo.linkedin, kind: "linkedin" });
  }

  if (asksForResume) {
    addLink({ label: "resume", href: personalInfo.resumeUrl, kind: "resume" });
  }

  if (asksForContactSection) {
    addLink({ label: "Contact section", href: "#contact", kind: "contact" });
  }

  if (asksForProjectsSection) {
    addLink({ label: "Work section", href: "#work", kind: "projects" });
  }

  // Case studies are the deepest proof on the site, so surface them whenever the
  // visitor asks about one by name or asks for architecture-level detail.
  findMatchingCaseStudies(userMessage).forEach((study) => {
    addLink({ label: study.title, href: getCaseStudyPath(study.slug), kind: "case-study" });
  });

  if (asksForDetail && links.every((link) => link.kind !== "case-study")) {
    const [firstMatch] = findMatchingCaseStudies(userMessage);
    if (firstMatch) {
      addLink({ label: firstMatch.title, href: getCaseStudyPath(firstMatch.slug), kind: "case-study" });
    }
  }

  const matchedProjects = findMatchingProjects(userMessage);

  matchedProjects.forEach((project) => {
    if (asksForProjectLink) {
      addLink({ label: project.title, href: getProjectAnchor(project.slug), kind: "project" });
    }

  });

  if (links.length === 0) return response;

  const inlineLinkSentence = buildInlineLinkSentence(links);
  return inlineLinkSentence ? `${response}\n\n${inlineLinkSentence}` : response;
}
