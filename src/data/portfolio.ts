import type { CaseStudySlug } from "@/data/case-studies";
import { additionalProjects } from "@/data/additional-projects";

export const personalInfo = {
  name: "Tijani Shabazz",
  role: "Senior Full-Stack & AI Software Engineer",
  location: "Fort Lauderdale, Florida",
  tagline:
    "I build production software across web, mobile, enterprise, and AI-combining end-to-end product engineering with backend architecture, integrations, data workflows, and reliable cloud delivery.",
  focus:
    "Full-stack web and SaaS engineering · React Native and Flutter apps · AI-enabled products · APIs and distributed integrations · cloud delivery and production reliability",
  linkedin: "https://www.linkedin.com/in/tijani-shabazz-7493a6439",
  github: "https://github.com/lightsunshine001",
  email: "munimaguro68@gmail.com",
  resumeUrl: "/resume.pdf",
};

/** Each figure is published in the supplied resume or project inventory. */
export const stats = [
  { value: 11, suffix: "+", label: "Years of Experience", href: "#experience" },
  { value: 93, suffix: "%", label: "Application Load-Time Reduction", href: "#about" },
  { value: 1000, suffix: "+", label: "Events Processed per Second", href: "#about" },
];

export interface Highlight {
  metric: string;
  label: string;
  detail: string;
}

export const about = {
  summary:
    "I’m a senior full-stack and AI software engineer with 11+ years of experience building and evolving production applications. I work across the full lifecycle-from understanding business requirements and shaping application architecture to implementing web and mobile experiences, integrating external systems, handling data-intensive workflows, and supporting cloud delivery. My project experience spans healthcare, logistics, financial integrations, marketplaces, real estate, and enterprise IT.",
  highlights: [
    {
      metric: "93%",
      label: "Application load-time reduction",
      detail:
        "A career result cited in the supplied resume. The resume does not attribute this figure to a named project, so it is presented as an overall engineering result rather than assigned to a specific client engagement.",
    },
    {
      metric: "1,000+",
      label: "Events processed per second",
      detail:
        "Contributions to real-time platforms processing more than 1,000 events per second, as stated in the supplied resume.",
    },
    {
      metric: "1.6M",
      label: "Historical records in data workflows",
      detail:
        "A .NET 8 and Azure OpenAI data-processing workflow handled about 2,400 records per day against a historical dataset of approximately 1.6 million records.",
    },
  ] satisfies Highlight[],
};

export const highlightSentences = about.highlights.map(
  (highlight) => `${highlight.metric} ${highlight.label}: ${highlight.detail}`
);

/**
 * A bullet is plain text, or text paired with the case study that documents it.
 * Keeping the link next to the claim prevents the two from drifting apart.
 */
export type ExperienceBullet = string | { text: string; study: CaseStudySlug };

export function bulletText(bullet: ExperienceBullet): string {
  return typeof bullet === "string" ? bullet : bullet.text;
}

export function bulletStudySlug(bullet: ExperienceBullet): CaseStudySlug | undefined {
  return typeof bullet === "string" ? undefined : bullet.study;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: ExperienceBullet[];
}

/** Ordered chronologically so the timeline reads from education into employment. */
export const experiences: Experience[] = [
  {
    company: "Florida International University",
    role: "Bachelor of Science, Computer Science",
    period: "2009 – 2013",
    type: "education",
    summary: "Undergraduate study in computer science.",
    bullets: [],
  },
  {
    company: "Florida Atlantic University",
    role: "Master of Science, Computer Science",
    period: "2013 – 2015",
    type: "education",
    summary: "Graduate study in computer science.",
    bullets: [],
  },
  {
    company: "ModMed Innovation Lab",
    role: "Research Assistant",
    period: "Jun 2015 – May 2017",
    type: "work",
    summary:
      "Research-oriented technical work establishing a foundation in software engineering, data systems, and applied computing.",
    bullets: [
      "Supported technical research activities involving applied computing, software-related problem solving, and data-oriented work.",
      "Used programming, structured analysis, and technical investigation to support research tasks and evaluate solutions.",
    ],
  },
  {
    company: "Kairos Technologies",
    role: "C/C++/C#/.NET Developer",
    period: "Jun 2017 – Dec 2019",
    type: "work",
    summary:
      "Core software development focused on C-family languages, .NET application components, and dependable software implementation.",
    bullets: [
      "Developed application functionality using C, C++, C#, and .NET, applying object-oriented design, programming fundamentals, and structured problem-solving.",
      "Implemented and maintained software components, investigating defects and improving code behavior through debugging and targeted changes.",
      "Worked across application logic and supporting components, building a foundation in backend development, integration, and maintainable code.",
    ],
  },
  {
    company: "PeakActivity",
    role: "Software Developer",
    period: "Jan 2020 – Sep 2022",
    type: "work",
    summary:
      "Product and application engineering across user-facing functionality, service integrations, and data-backed business workflows.",
    bullets: [
      "Delivered web application features from interface behavior through backend and data integration, translating product requirements into maintainable software.",
      "Implemented application services and connected workflows using APIs, data models, and external system integrations.",
      "Improved existing functionality through debugging, performance refinement, and iterative enhancements to application behavior and user experience.",
      "Contributed across implementation, testing, release preparation, and ongoing maintenance within the software development lifecycle.",
    ],
  },
  {
    company: "Chetu, Inc.",
    role: "Full Stack Developer | Python, C#/.NET, TypeScript | AI, DevOps",
    period: "Nov 2022 – Jul 2026",
    type: "work",
    summary:
      "Full-stack delivery for client and enterprise software, spanning web applications, backend services, integrations, AI-enabled capabilities, and deployment.",
    bullets: [
      { text: "Designed and implemented end-to-end application features across browser-based interfaces, server-side services, APIs, and relational or document data stores.", study: "charter-steel-web" },
      "Developed backend functionality and integration layers with Python and C#/.NET, connecting business workflows to internal services and external platforms through REST APIs and webhooks.",
      { text: "Built and extended TypeScript-based application experiences, aligning frontend behavior with API contracts, authentication flows, data requirements, and operational workflows.", study: "ourblackguide-react-native" },
      { text: "Applied AI capabilities to product workflows, including LLM-powered features, agent/tool integrations, retrieval-oriented experiences, and business-process automation.", study: "anchord-ai-entity-resolution" },
      { text: "Addressed production concerns across performance, reliability, security, and maintainability; supported cloud delivery and CI/CD practices across the software lifecycle.", study: "azure-openai-data-processing" },
    ],
  },
];

export interface Project {
  slug: string;
  caseStudy: CaseStudySlug;
  featured?: boolean;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  role: string;
  timeline?: string;
  complexity: string;
  tech: string[];
  images: string[];
  github?: string;
  live?: string;
  links?: { label: string; url: string }[];
}

/** Projects with a documented role in the supplied resume and project notes. */
export const projects: Project[] = [
  {
    slug: "ourblackguide-react-native",
    caseStudy: "ourblackguide-react-native",
    featured: true,
    title: "OurBlackGuide",
    category: "React Native Marketplace",
    summary:
      "A community discovery app connecting people with local businesses, professional services, entrepreneurs, events, career resources, and marketplace listings.",
    description:
      "Contributed to the React Native application architecture and reusable iOS and Android components. The mobile experience brings directory discovery, business profiles, category and location filtering, and listing workflows into one community-focused product.",
    impact:
      "Delivered reusable cross-platform foundations and connected the main discovery journey-from authenticated access and search through profiles, media uploads, and deep links.",
    role:
      "React Native engineering: reusable mobile components, authentication, API integration, discovery, profiles, and production releases.",
    complexity:
      "Cross-platform navigation and state, authenticated API workflows, searchable directories, location-aware filters, media handling, and deep-link behavior.",
    tech: ["React Native", "TypeScript", "React Navigation", "TanStack Query", "iOS", "Android", "REST APIs"],
    images: ["/images/portfolio/projects/live-sites/ourblackguide-react-native.png"],
    live: "https://apps.apple.com/us/app/ourblackguide/id6816153059",
  },
  {
    slug: "parente-ai-mobile-health",
    caseStudy: "parente-ai-mobile-health",
    featured: true,
    title: "Parente AI",
    category: "Cross-Platform Health App",
    summary:
      "A pediatric behavioral-health application combining parent-led therapy, child psychology, clinician communication, and AI-assisted coaching.",
    description:
      "Built Flutter mobile workflows for family onboarding, assessments, and patient messaging, then connected those experiences to application APIs. The work included stabilizing real user flows affected by token expiration, inconsistent responses, profile switching, and incomplete assessment forms.",
    impact:
      "Improved the reliability of family and patient-facing workflows and supported the requirements of both iOS and Android releases.",
    role:
      "Flutter mobile development: onboarding, assessments, patient messaging, API integration, state handling, and release support.",
    complexity:
      "Multi-profile state, expiring authentication, inconsistent API responses, validation of multi-step forms, and cross-platform release behavior.",
    tech: ["Flutter", "REST APIs", "Authentication", "iOS", "Android", "Mobile State Management"],
    images: ["/images/portfolio/projects/live-sites/parente-ai-mobile-health.png"],
    live: "https://www.parentehealth.com/",
    links: [
      { label: "Website", url: "https://www.parentehealth.com/" },
      { label: "App Store", url: "https://apps.apple.com/us/app/parente/id6749544630" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=pat.parente.ai" },
    ],
  },
  {
    slug: "anchord-ai-entity-resolution",
    caseStudy: "anchord-ai-entity-resolution",
    featured: true,
    title: "Anchord AI",
    category: "Entity Resolution & Agent Integration",
    summary:
      "An entity-resolution platform connecting AI agents to business data and helping determine when separate records represent the same real-world entity.",
    description:
      "Integrated agent workflows with 11 MCP tools, REST APIs, and webhooks. Implemented multi-signal, rules-based scoring, evidence-backed review for ambiguous matches, canonical entity identifiers, and resolve-before-write flows.",
    impact:
      "Connected agent actions to a more controlled entity-resolution workflow, with ambiguous cases surfaced for evidence review before downstream writes.",
    role:
      "AI integration and entity-resolution engineering: MCP tool integration, API/webhook connectivity, scoring, evidence review, and safe write sequencing.",
    complexity:
      "Coordinating multiple data signals, distinguishing confident matches from ambiguous records, and ensuring an entity is resolved before mutation.",
    tech: ["AI Agents", "MCP", "REST APIs", "Webhooks", "Entity Resolution", "Rules-Based Scoring"],
    images: ["/images/portfolio/projects/live-sites/anchord-ai-entity-resolution.png"],
    live: "https://www.anchord.ai/product",
  },
  {
    slug: "arvrobot-real-estate-underwriting",
    caseStudy: "arvrobot-real-estate-underwriting",
    featured: true,
    title: "ARVRobot",
    category: "Real Estate Underwriting",
    summary:
      "A real-estate underwriting platform that helps investors evaluate properties and analyze potential returns.",
    description:
      "Contributed to property-data ingestion, comparable-property analysis, financial calculations, configurable underwriting assumptions, reporting, and AI-assisted property analysis. The platform brings property facts and investment scenarios into a structured evaluation workflow.",
    impact:
      "Connected property research and financial assumptions to a clearer, more repeatable property-evaluation and reporting process.",
    role:
      "Full-stack product contribution across property data, comparable analysis, underwriting calculations, configurable inputs, reporting, and AI-assisted analysis.",
    complexity:
      "Combining property facts, comparable-property context, editable financial assumptions, and generated analysis in a coherent investor workflow.",
    tech: ["Property Data Ingestion", "Comparable Analysis", "Financial Modeling", "AI-Assisted Analysis", "Reporting"],
    images: ["/images/portfolio/projects/live-sites/arvrobot-real-estate-underwriting.png"],
    live: "https://arvrobot.com/",
  },
  {
    slug: "crushbank-enterprise-ai",
    caseStudy: "crushbank-enterprise-ai",
    title: "CrushBank Orchestrate IT",
    category: "Enterprise AI & IT Workflows",
    summary:
      "An enterprise AI platform using IBM watsonx to connect information sources, ground answers, classify service tickets, and automate operational workflows.",
    description:
      "Contributed to enterprise AI integrations spanning connected information sources, grounded search and answer experiences, service-ticket classification, and operational workflow automation. The project focused on making AI capabilities useful within established IT service processes.",
    impact:
      "Connected enterprise knowledge and AI-assisted classification to practical service-management and operational workflows.",
    role:
      "Enterprise AI integration contributor: information-source connectivity, grounded retrieval experiences, ticket classification, and workflow automation.",
    complexity:
      "Connecting enterprise knowledge sources to grounded responses and routing AI output into workflows where operational context matters.",
    tech: ["IBM watsonx", "Enterprise AI", "Grounded Search", "Ticket Classification", "Workflow Automation"],
    images: ["/images/portfolio/projects/live-sites/crushbank-enterprise-ai.png"],
    live: "https://www.crushbank.com/orchestrate-it/",
  },
  {
    slug: "correlate-health-platform-integration",
    caseStudy: "correlate-health-platform-integration",
    title: "Correlate Health",
    category: "Healthcare Platform Integration",
    summary:
      "A healthcare technology platform with clinical-data and application workflows that connect information, APIs, validation, and reviewable processes.",
    description:
      "Tijani participated in developing and deploying healthcare application workflows connected to the Correlate Health platform. His contribution included structured-data handling, validation, complex business logic, API integration, auditability, and reviewable clinical and operational processes. The LooPT CTM product is described separately.",
    impact:
      "Helped deliver connected healthcare application workflows with structured data validation, API integration, and reviewable operations.",
    role:
      "Healthcare platform engineering: application workflows, structured-data handling, validation, APIs, auditability, and review processes.",
    complexity:
      "Connecting clinical data and application services while maintaining validation, traceability, and reliable downstream workflows.",
    tech: ["Healthcare Workflows", "Clinical Data", "Data Validation", "API Integration", "Business Rules", "Auditability"],
    images: ["/images/portfolio/projects/live-sites/correlate-health-platform-integration.png"],
    live: "https://correlatehealth.com/",
  },
  {
    slug: "azure-openai-data-processing",
    caseStudy: "azure-openai-data-processing",
    title: ".NET 8 & Azure OpenAI Data Processing",
    category: "Enterprise Data Processing",
    summary:
      "A worker-service and data-processing workflow combining ASP.NET Core, Entity Framework Core, SQL Server, and Azure OpenAI.",
    description:
      "Developed worker-service and data-processing workflows using ASP.NET Core, EF Core, SQL Server, and Azure OpenAI. The pipeline processed approximately 2,400 records per day against a historical dataset of around 1.6 million records.",
    impact:
      "Applied AI-assisted processing to a substantial historical dataset while maintaining a recurring daily processing workflow.",
    role:
      ".NET backend and data-processing development: worker services, persistence with EF Core and SQL Server, and Azure OpenAI integration.",
    complexity:
      "Combining recurring background processing, relational persistence, and AI service integration across a large historical dataset.",
    tech: [".NET 8", "ASP.NET Core", "Entity Framework Core", "SQL Server", "Azure OpenAI", "Worker Services"],
    images: [],
  },
  {
    slug: "deed-driver-delivery",
    caseStudy: "deed-driver-delivery",
    title: "Deed - Driver Delivery Application",
    category: "Flutter Logistics App",
    summary:
      "A driver-focused mobile application for a UPS partner in Iceland, supporting package scanning and delivery workflows.",
    description:
      "Developed a Flutter application that supports driver package scanning and delivery tasks. The implementation used Firebase Authentication and a set of Flutter state-management and dependency-management tools to organize the application workflow.",
    impact:
      "Brought package-scanning and delivery tasks into a mobile workflow for drivers in the partner operation.",
    role:
      "Flutter application development: driver-facing screens and package-scanning/delivery workflow implementation.",
    complexity:
      "Building a dependable mobile task flow around authentication, scanning/file interaction, and coordinated application state.",
    tech: ["Flutter", "Dart", "Firebase Authentication", "Provider", "GetIt", "RxDart", "BLoC", "file_picker"],
    images: [],
  },
  {
    slug: "gemsharbor-marketplace",
    caseStudy: "gemsharbor-marketplace",
    title: "GemsHarbor",
    category: "Jewelry Marketplace & Auctions",
    summary:
      "A B2B/B2C gemstone marketplace combining product discovery, auctions, real-time bidding, offers, payments, and order workflows.",
    description:
      "Worked on e-commerce and marketplace workflows covering product listings, user dashboards, auctions and bidding, offers, payment integrations, notifications, and connected order flows. The project brings discovery and transaction steps together for a specialist jewelry marketplace.",
    impact:
      "Contributed to the key marketplace and transaction journeys, from listings and bidding through payment and order communication.",
    role:
      "Marketplace application development: product listings, dashboards, auction/bid flows, offers, payment integrations, and notifications.",
    complexity:
      "Coordinating listing state, time-sensitive bids, offers, payment events, notifications, and order progression across marketplace users.",
    tech: ["Marketplace Workflows", "E-commerce", "Auctions", "Bidding", "Payment Integrations", "Notifications"],
    images: ["/images/portfolio/projects/live-sites/gemsharbor-marketplace.png"],
    live: "https://gemsharbor.com/",
  },
  {
    slug: "shiphype-fulfillment",
    caseStudy: "shiphype-fulfillment",
    title: "ShipHype",
    category: "Logistics & Fulfillment SaaS",
    summary:
      "An operational platform for fulfillment and logistics, supporting connected shipping and warehouse workflows.",
    description:
      "Contributed to the integration and automation layers for fulfillment operations, including event processing, system synchronization, retry strategies, error handling, and operational workflows. The supporting project notes also identify work around the platform’s automation and AI layers.",
    impact:
      "Helped make fulfillment integrations more resilient to asynchronous events, synchronization issues, and recoverable failures.",
    role:
      "Full-stack and automation contribution: integration workflows, event handling, synchronization, retries, and error recovery.",
    complexity:
      "Maintaining consistency across operational systems when events arrive asynchronously or downstream services fail temporarily.",
    tech: ["Logistics", "Fulfillment", "Event Processing", "System Synchronization", "Retry Strategies", "Automation"],
    images: ["/images/portfolio/projects/live-sites/shiphype-fulfillment.png"],
    live: "https://shiphype.com/",
  },
  {
    slug: "dealercortex-ai",
    caseStudy: "dealercortex-ai",
    title: "DealerCortex AI",
    category: "Automotive Intelligence",
    summary:
      "An automotive intelligence platform connecting dealership marketing, customer activity, inventory, and business performance.",
    description:
      "Contributed AI-powered dealership workflows and integrations across Google Ads, analytics, inventory, CRM data, customer conversations, and call data. The product connects marketing activity with downstream dealership outcomes such as appointments and sales, then uses AI-driven recommendations to inform decisions.",
    impact:
      "Connected fragmented marketing and dealership data to a more complete view of customer activity and business outcomes.",
    role:
      "AI integration and analytics development: marketing/ad data, CRM and inventory connections, conversation data, and AI recommendations.",
    complexity:
      "Bringing marketing, inventory, customer, and call signals together so recommendations can be tied to operational outcomes.",
    tech: ["AI Workflows", "Google Ads", "Analytics", "CRM Integrations", "Inventory Data", "Call Data"],
    images: ["/images/portfolio/projects/live-sites/dealercortex-ai.png"],
    live: "https://dealercortexai.com/",
  },
  {
    slug: "arub-shipping-integrations",
    caseStudy: "arub-shipping-integrations",
    title: "Arub Shipping",
    category: "Shipping & Carrier Integrations",
    summary:
      "A shipping and logistics platform connecting order processing with carrier services.",
    description:
      "Worked on integration flows for carrier APIs, order synchronization, shipment processing, label generation, and transaction reconciliation. Reliability work included idempotency, retry behavior, and recovery handling across connected shipping operations.",
    impact:
      "Connected order and shipment workflows to carrier services with safeguards for duplicate events, retries, and reconciliation.",
    role:
      "Shipping integration development: carrier connectivity, order sync, shipment/label workflows, idempotency, retries, and reconciliation.",
    complexity:
      "Keeping order and shipment state aligned across external carrier services while recovering safely from transient failures and repeated requests.",
    tech: ["Carrier APIs", "Order Synchronization", "Shipment Processing", "Label Generation", "Idempotency", "Reconciliation"],
    images: ["/images/portfolio/projects/live-sites/arub-shipping-integrations.png"],
    live: "https://arub.com/shipping",
  },
  {
    slug: "suppliersift-ap-automation",
    caseStudy: "suppliersift-ap-automation",
    title: "SupplierSift",
    category: "Accounts Payable Automation",
    summary:
      "An accounts-payable automation platform connecting Microsoft 365 invoice intake, extraction, accounting classification, approvals, and QuickBooks Desktop.",
    description:
      "Contributed to the accounting integration and workflow layer, including QuickBooks Web Connector communication, transaction posting, accounting-list synchronization, and duplicate prevention. These integrations support the flow from incoming invoice documents through classification and approval to accounting-system updates.",
    impact:
      "Helped connect document-driven AP workflows to QuickBooks Desktop while guarding against duplicate transaction posting.",
    role:
      "Accounting integration contributor: Web Connector communication, posting workflows, list synchronization, and duplicate prevention.",
    complexity:
      "Keeping invoice-derived transactions and accounting reference data consistent across Microsoft 365 intake, approval stages, and QuickBooks Desktop.",
    tech: ["Microsoft 365", "QuickBooks Desktop", "Web Connector", "Invoice Extraction", "Accounting Classification", "Approvals"],
    images: ["/images/portfolio/projects/live-sites/suppliersift-ap-automation.png"],
    live: "https://suppliersift.com/",
  },
  {
    slug: "calcs-engineering-calculations",
    caseStudy: "calcs-engineering-calculations",
    title: "Calcs.com",
    category: "Engineering Calculation Software",
    summary:
      "A web calculation platform that turns spreadsheet-based engineering methods into transparent, testable design workflows.",
    description:
      "Contributed to production web workflows translating calculation methods for structural steel, concrete, timber, foundations, and connections. The documented focus includes dependency-aware updates and automated validation so the calculation experience remains coherent as inputs change.",
    impact:
      "Helped make engineering calculation workflows more transparent and testable than disconnected spreadsheet-based processes.",
    role:
      "Web application contribution: calculation workflows, dependency-aware input updates, and automated validation.",
    complexity:
      "Maintaining correct dependencies between engineering inputs and derived calculations while making results transparent and testable.",
    tech: ["Engineering Calculations", "Structural Steel", "Concrete", "Timber", "Foundations", "Automated Validation"],
    images: ["/images/portfolio/projects/live-sites/calcs-engineering-calculations.png"],
    live: "https://calcs.com/",
  },
  {
    slug: "charter-steel-web",
    caseStudy: "charter-steel-web",
    title: "Charter Steel",
    category: "Industrial Corporate Website",
    summary:
      "A corporate website for an industrial steel manufacturer, presenting the company and its business information to professional audiences.",
    description:
      "Contributed to website development, responsive page layouts, corporate presentation, and the organization of business-facing content. The work focused on making industrial information clear and accessible across desktop and mobile screen sizes.",
    impact:
      "Supported a responsive corporate web experience with clearer information organization for business audiences.",
    role:
      "Web development: responsive layouts, corporate presentation, and business-facing content organization.",
    complexity:
      "Presenting detailed industrial and corporate information through a clear, consistent responsive interface.",
    tech: ["Web Development", "Responsive Design", "Corporate Website", "Content Organization"],
    images: ["/images/portfolio/projects/live-sites/charter-steel-web.png"],
    live: "https://www.chartersteel.com/",
  },
  ...additionalProjects.map((project) => ({
    slug: project.slug,
    caseStudy: project.slug as CaseStudySlug,
    title: project.title,
    category: project.category,
    summary: project.summary,
    description: `${project.description} Tijani participated in the development and deployment of this product, contributing to the areas described below.`,
    impact: `Contributed to the development and deployment of ${project.title}, including ${project.areas.slice(0, 4).join(", ")}.`,
    role: project.contribution,
    complexity: project.problem,
    tech: project.areas,
    images: project.url ? [`/images/portfolio/projects/live-sites/${project.slug}.png`] : [],
    live: project.url ?? undefined,
    links: project.links ?? (project.url ? [{ label: "Official project site", url: project.url }] : []),
  })),
];

export const skillCategories = [
  {
    title: "Web & SaaS Engineering",
    description:
      "End-to-end browser applications and SaaS products, from typed interfaces and API contracts through backend services, relational data, and business workflows.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "C#/.NET", "ASP.NET Core", "Python", "FastAPI", "REST APIs", "Microservices", "SQL"],
  },
  {
    title: "Mobile Application Engineering",
    description:
      "Cross-platform iOS and Android applications with reusable components, reliable navigation and state, authenticated API access, media workflows, and release support.",
    skills: ["React Native", "Flutter", "Dart", "iOS", "Android", "React Navigation", "TanStack Query", "Authentication", "Deep Linking", "Media Uploads"],
  },
  {
    title: "AI & Intelligent Applications",
    description:
      "Practical AI integration across product workflows: model connectivity, retrieval, agent/tool orchestration, entity resolution, and grounded automation.",
    skills: ["LLM Integration", "OpenAI API", "RAG", "AI Agents", "MCP", "LangChain", "Vector Search", "Entity Resolution", "Grounded Retrieval", "Workflow Automation"],
  },
  {
    title: "Integration, Data & Distributed Systems",
    description:
      "Reliable connections between business applications and external platforms, including data movement, authorization, event handling, synchronization, and recovery.",
    skills: ["OAuth 2.0", "Webhooks", "API Integration", "ETL", "SQL Server", "PostgreSQL", "MongoDB", "Data Validation", "Idempotency", "Retries", "Reconciliation", "Token Lifecycle"],
  },
  {
    title: "Architecture, Cloud & Delivery",
    description:
      "Production-minded system design, modernization, performance and security work, cloud delivery, containerization, and repeatable CI/CD practices.",
    skills: ["System Design", "AWS", "Azure", "Docker", "CI/CD", "GitHub Actions", "Performance Optimization", "Production Troubleshooting", "Security Remediation", "Application Modernization"],
  },
];

export const chatSuggestions = [
  "How do you approach mobile app architecture?",
  "Walk me through the Anchord AI project.",
  "How did you make the QuickBooks integration reliable?",
  "What was your role in clinical trial matching?",
];
