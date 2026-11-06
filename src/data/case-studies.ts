export interface CaseStudyDecision {
  choice: string;
  why: string;
  rejected?: string[];
}

export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
  points?: string[];
}

export type CaseStudyTheme = "agents" | "retrieval" | "platform" | "products";

export const CASE_STUDY_THEMES: { id: CaseStudyTheme; label: string; blurb: string }[] = [
  {
    id: "agents",
    label: "AI & intelligent systems",
    blurb: "Agent integrations, enterprise AI, AI-assisted analysis, and data workflows that connect models to real business operations.",
  },
  {
    id: "retrieval",
    label: "Healthcare & data integration",
    blurb: "Clinical information, accounting systems, high-volume data processing, and workflows that depend on reliable synchronization.",
  },
  {
    id: "platform",
    label: "Web, logistics & business platforms",
    blurb: "Operational software for real estate, fulfillment, shipping, accounting, engineering, and industrial business users.",
  },
  {
    id: "products",
    label: "Mobile & customer products",
    blurb: "Cross-platform mobile experiences and marketplace workflows built around real user tasks and connected services.",
  },
];

export interface CaseStudy {
  slug: string;
  kind: "system" | "product";
  theme: CaseStudyTheme;
  featured?: boolean;
  title: string;
  employer?: string;
  period?: string;
  oneLiner: string;
  summary: string;
  problem: string;
  constraints: string[];
  diagram: "eval" | "mcp" | "kgrag" | "docs" | "gateway" | null;
  diagramCaption: string;
  decisions: CaseStudyDecision[];
  sections: CaseStudySection[];
  results: CaseStudyResult[];
  stack: string[];
  ownership: string;
  tags: string[];
  aliases: string[];
}

export type CaseStudySlug =
  | "anchord-ai-entity-resolution"
  | "correlate-health-clinical-trial-matching"
  | "freight-quickbooks-integration"
  | "azure-openai-data-processing"
  | "crushbank-enterprise-ai"
  | "ourblackguide-react-native"
  | "parente-ai-mobile-health"
  | "deed-driver-delivery"
  | "arvrobot-real-estate-underwriting"
  | "gemsharbor-marketplace"
  | "shiphype-fulfillment"
  | "dealercortex-ai"
  | "arub-shipping-integrations"
  | "suppliersift-ap-automation"
  | "calcs-engineering-calculations"
  | "charter-steel-web";

export const CASE_STUDY_SLUGS: CaseStudySlug[] = [
  "anchord-ai-entity-resolution",
  "correlate-health-clinical-trial-matching",
  "freight-quickbooks-integration",
  "azure-openai-data-processing",
  "crushbank-enterprise-ai",
  "ourblackguide-react-native",
  "parente-ai-mobile-health",
  "deed-driver-delivery",
  "arvrobot-real-estate-underwriting",
  "gemsharbor-marketplace",
  "shiphype-fulfillment",
  "dealercortex-ai",
  "arub-shipping-integrations",
  "suppliersift-ap-automation",
  "calcs-engineering-calculations",
  "charter-steel-web",
];

/**
 * Each entry separates product context from Tijani's documented contribution.
 * Quantified results are included only where the supplied resume or notes state them.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "anchord-ai-entity-resolution",
    kind: "system",
    theme: "agents",
    featured: true,
    title: "Anchord AI — Entity Resolution & Agent Integration",
    oneLiner:
      "Integrated AI-agent workflows with 11 MCP tools and implemented a reviewable entity-resolution path from candidate matching to safe downstream writes.",
    summary:
      "Anchord AI connects agents to business data and helps determine whether records from different sources describe the same company or contact. Tijani's documented work centered on the tool and integration layer and the resolution workflow: MCP tools, REST APIs, webhooks, multi-signal scoring, evidence-backed review, canonical IDs, and resolve-before-write behavior.",
    problem:
      "Business records are often duplicated, incomplete, or represented differently across systems. An agent needs more than a fuzzy name match: it needs a repeatable way to score candidate records, expose the evidence behind uncertain matches, and avoid writing against an entity before its identity is resolved.",
    constraints: [
      "The workflow uses multiple signals and rules rather than relying on a single matching field.",
      "Ambiguous candidates require evidence-backed review instead of being silently treated as confirmed matches.",
      "Downstream writes must follow entity resolution, not precede it.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani integrated AI-agent workflows with 11 MCP tools, REST APIs, and webhooks. He implemented the multi-signal, rules-based scoring path, the evidence-backed review of ambiguous matches, canonical entity identifiers, and resolve-before-write flows.",
        points: [
          "Connected the agent workflow to business capabilities through MCP tools and service APIs.",
          "Implemented scoring that combines more than one signal and applies explicit rules to candidate matches.",
          "Made uncertain matches reviewable with supporting evidence and stable canonical IDs.",
          "Kept entity resolution ahead of downstream writes so the workflow does not mutate a record on an unresolved assumption.",
        ],
      },
      {
        heading: "Resolution and write sequence",
        body:
          "The workflow separates candidate discovery from the decision to treat two records as the same entity. A candidate can be scored, reviewed with its supporting evidence, and mapped to a canonical identifier. Only after resolution does the connected workflow proceed to a write operation.",
        points: [
          "Multi-signal and rules-based candidate scoring.",
          "Evidence-backed review for ambiguous matches.",
          "Canonical entity IDs for consistent downstream references.",
          "Resolve-before-write sequencing for connected agent actions.",
        ],
      },
      {
        heading: "Integration surface",
        body:
          "The project work connected agent behavior to external business systems using MCP tools, REST APIs, and webhooks. The supplied materials do not identify a specific programming language or database for this engagement, so this case study keeps the technology description to the integration mechanisms that were documented.",
      },
    ],
    results: [
      { metric: "11", label: "MCP tools integrated into agent workflows" },
      { metric: "Multi-signal", label: "Rules-based candidate scoring" },
      { metric: "Resolve first", label: "Canonical identity before downstream writes" },
    ],
    stack: ["AI Agents", "MCP", "REST APIs", "Webhooks", "Entity Resolution", "Rules-Based Scoring"],
    ownership:
      "The supplied notes document Tijani's contribution to the 11-tool integration and entity-resolution workflow. They do not claim sole ownership of the broader Anchord AI product.",
    tags: ["AI Agents", "MCP", "Entity Resolution", "Integrations"],
    aliases: ["anchord", "anchord ai", "entity resolution", "canonical entity", "mcp tools", "match scoring", "ambiguous match", "webhooks"],
  },
  {
    slug: "correlate-health-clinical-trial-matching",
    kind: "system",
    theme: "retrieval",
    featured: true,
    title: "Correlate Health / LooPT — Clinical Trial Matching",
    oneLiner:
      "Worked on clinical-trial eligibility workflows comparing structured EHR data and clinical notes with study criteria, with validation and human review.",
    summary:
      "Correlate Health's LooPT platform evaluates whether patient information aligns with clinical-trial eligibility criteria. Tijani's documented contribution includes healthcare workflow development, data validation, complex eligibility rules, API integration, auditability, and human review across structured EHR fields and clinical notes.",
    problem:
      "Trial matching needs to compare patient information with detailed study criteria. Relevant details may be represented in structured EHR fields or narrative clinical notes, and the workflow must preserve enough context for validation and follow-up rather than presenting an unexplained match result.",
    constraints: [
      "The matching workflow considers both structured EHR data and clinical notes.",
      "Eligibility logic includes complex rules and requires data validation.",
      "The process needs an auditable path and a human-review step.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani worked on the application workflows that bring clinical information into eligibility evaluation. His documented scope includes validation of incoming data, implementation of complex eligibility rules, API integration, auditability, and the human-review process.",
        points: [
          "Worked across structured EHR data and clinical-note workflows.",
          "Implemented and supported rule-driven eligibility evaluation.",
          "Connected application workflows through APIs and data validation.",
          "Supported auditability and human review for matching decisions.",
        ],
      },
      {
        heading: "Clinical information and eligibility",
        body:
          "The product context combines structured patient data with narrative clinical information and compares that information with study-specific eligibility criteria. Keeping validation and review in the process is important because the output is used to coordinate follow-up, not merely to produce a search result.",
      },
      {
        heading: "Workflow quality",
        body:
          "The supplied material identifies data validation, complex rules, API integration, auditability, and human review as the areas of work. It does not provide a numerical matching-accuracy result or a specific technology stack beyond the platform context, so neither is inferred here.",
      },
    ],
    results: [
      { metric: "EHR + notes", label: "Structured and narrative clinical information" },
      { metric: "Rule-driven", label: "Eligibility evaluation" },
      { metric: "Auditable", label: "Human-review workflow" },
    ],
    stack: ["Healthcare Workflows", "EHR Data", "Clinical Notes", "Eligibility Rules", "API Integration", "Auditability"],
    ownership:
      "The resume describes Tijani as having worked on these workflows. This page reflects the listed engineering areas and does not imply sole ownership of the LooPT platform or clinical decision-making.",
    tags: ["HealthTech", "Clinical Trial Matching", "Data Validation", "APIs"],
    aliases: ["correlate health", "loopt", "clinical trial", "trial matching", "eligibility criteria", "ehr", "clinical notes", "patient matching"],
  },
  {
    slug: "freight-quickbooks-integration",
    kind: "system",
    theme: "retrieval",
    featured: true,
    title: "Freight SaaS — QuickBooks Online Integration",
    oneLiner:
      "Built OAuth, webhook, idempotent synchronization, and reconciliation workflows for freight operations supporting 65 brokerages and 90,000 documents per month.",
    summary:
      "This project connected freight operating workflows with QuickBooks Online. Tijani built the integration paths around OAuth authorization, token refresh, webhooks, idempotent synchronization, and reconciliation, supporting an operation handling approximately 65 brokerages, 52,000 loads, and 90,000 documents each month.",
    problem:
      "Freight operations create a large volume of business records that must stay aligned with accounting data. The integration has to work across authorization lifecycles and asynchronous events while avoiding duplicate updates and providing a way to reconcile records when systems drift or an event is retried.",
    constraints: [
      "OAuth credentials and access tokens need to be refreshed and managed over time.",
      "Webhook delivery can be repeated, so synchronization must be idempotent.",
      "High operational volume makes reconciliation and recovery important parts of the integration.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani built the integration workflows connecting the freight SaaS operation to QuickBooks Online. His documented responsibilities include OAuth handling, token refresh, webhook processing, idempotent synchronization, and reconciliation.",
        points: [
          "Implemented OAuth authorization and token refresh workflows.",
          "Connected webhook events to the synchronization process.",
          "Used idempotent handling to protect against repeated event delivery.",
          "Built reconciliation workflows to help keep connected operational and accounting records aligned.",
        ],
      },
      {
        heading: "Operational scale",
        body:
          "The connected operation supported approximately 65 brokerages, 52,000 loads, and 90,000 documents per month. Those figures describe the scale of the operation supported by the integration; they are not presented as a count of records personally processed by one developer.",
        points: [
          "Approximately 65 brokerages.",
          "Approximately 52,000 loads per month.",
          "Approximately 90,000 documents per month.",
        ],
      },
      {
        heading: "Reliability across systems",
        body:
          "The engineering work focused on the points where external integrations commonly become fragile: credentials expire, event notifications repeat, and records need to be reconciled after partial failures. Idempotency and explicit reconciliation were part of the documented workflow rather than optional cleanup tasks.",
      },
    ],
    results: [
      { metric: "65", label: "Brokerages supported" },
      { metric: "52,000", label: "Loads per month" },
      { metric: "90,000", label: "Documents per month" },
    ],
    stack: ["QuickBooks Online", "OAuth 2.0", "Webhooks", "Token Refresh", "Idempotency", "Reconciliation"],
    ownership:
      "Tijani's documented role was building the QuickBooks integration workflows. The scale figures describe the operation supported; the supplied resume does not state that he owned the entire freight SaaS product.",
    tags: ["QuickBooks", "Accounting Integration", "Freight", "Reliability"],
    aliases: ["freight saas", "quickbooks", "qbo", "oauth", "token refresh", "webhooks", "65 brokerages", "52000 loads", "90000 documents", "reconciliation"],
  },
  {
    slug: "azure-openai-data-processing",
    kind: "system",
    theme: "agents",
    title: ".NET 8 & Azure OpenAI Data Processing",
    oneLiner:
      "Developed ASP.NET Core worker and data-processing workflows using EF Core, SQL Server, and Azure OpenAI across a 1.6-million-record historical dataset.",
    summary:
      "This enterprise data-processing project combines ASP.NET Core worker services, Entity Framework Core, SQL Server, and Azure OpenAI. Tijani developed the processing workflows, which handled approximately 2,400 records per day against a historical dataset of about 1.6 million records.",
    problem:
      "The project needed a repeatable way to process records at a daily cadence while working against a large historical dataset and incorporating Azure OpenAI into the processing workflow. The supplied material identifies the worker-service, data-processing, persistence, and AI integration elements.",
    constraints: [
      "The workflow operates against a historical dataset of approximately 1.6 million records.",
      "The documented processing volume is approximately 2,400 records per day.",
      "Background processing, relational persistence, and the Azure OpenAI service must work together as one application workflow.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani developed worker-service and data-processing workflows using ASP.NET Core, EF Core, SQL Server, and Azure OpenAI. His work covered the application processing path and its connection to persistence and AI service capabilities.",
        points: [
          "Developed .NET 8 / ASP.NET Core worker-service workflows.",
          "Used Entity Framework Core and SQL Server for data access and persistence.",
          "Integrated Azure OpenAI into the record-processing flow.",
        ],
      },
      {
        heading: "Processing volume",
        body:
          "The workflow processed about 2,400 records per day against a historical dataset of roughly 1.6 million records. These are the approximate volumes stated in the resume, not a claim about throughput beyond the documented project scope.",
      },
      {
        heading: "Backend and data workflow",
        body:
          "The documented stack places the processing logic in .NET worker services, uses EF Core and SQL Server for the data layer, and integrates Azure OpenAI for AI-assisted processing. The supplied resume does not specify additional infrastructure or a measured accuracy result, so those details are intentionally not inferred.",
      },
    ],
    results: [
      { metric: "2,400", label: "Records processed per day" },
      { metric: "1.6M", label: "Historical records in the dataset" },
      { metric: ".NET 8", label: "Worker-service and processing stack" },
    ],
    stack: [".NET 8", "ASP.NET Core", "Entity Framework Core", "SQL Server", "Azure OpenAI", "Worker Services"],
    ownership:
      "The resume states that Tijani developed the worker-service and data-processing workflows. It does not claim sole ownership of the broader data platform.",
    tags: [".NET", "Azure OpenAI", "Data Processing", "Enterprise"],
    aliases: ["dotnet 8", ".net 8", "azure openai", "ef core", "entity framework", "sql server", "worker service", "2400 records", "1.6 million records"],
  },
  {
    slug: "crushbank-enterprise-ai",
    kind: "system",
    theme: "agents",
    title: "CrushBank Orchestrate IT — Enterprise AI",
    oneLiner:
      "Contributed to IBM watsonx integrations for connected enterprise knowledge, grounded answers, service-ticket classification, and operational automation.",
    summary:
      "CrushBank Orchestrate IT is an enterprise AI platform built around IBM watsonx. Tijani contributed to integrations connecting enterprise information sources, grounded search and answers, service-ticket classification, and operational workflow automation.",
    problem:
      "Enterprise IT workflows rely on information spread across business systems and service-management records. AI capabilities are more useful when they can retrieve relevant connected information, provide grounded answers, classify incoming tickets, and participate in operational processes.",
    constraints: [
      "Information sources need to be connected before the platform can ground answers in enterprise context.",
      "AI output is used in service-management and operational workflows, not only in a standalone chat experience.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to enterprise AI integrations involving IBM watsonx, connected information sources, grounded search and answer experiences, ticket classification, and operational automation.",
        points: [
          "Worked on connections to enterprise information sources.",
          "Contributed to grounded search and answer workflows.",
          "Supported service-ticket classification and operational automation paths.",
        ],
      },
      {
        heading: "From knowledge to workflow",
        body:
          "The product context links enterprise knowledge access with service-management actions. Retrieval makes relevant information available to the AI experience, while ticket classification and workflow automation connect that capability to the operational work IT teams already perform.",
      },
      {
        heading: "Ownership boundary",
        body:
          "The supplied resume describes this as a contribution to enterprise AI integrations. It does not specify an individually owned subsystem, deployment model, or quantitative outcome, so the project is presented as collaborative product engineering.",
      },
    ],
    results: [
      { metric: "IBM watsonx", label: "Enterprise AI ecosystem" },
      { metric: "Grounded", label: "Search and answer experiences" },
      { metric: "Operational", label: "Ticket and workflow automation" },
    ],
    stack: ["IBM watsonx", "Enterprise AI", "Grounded Search", "Ticket Classification", "Workflow Automation"],
    ownership:
      "Tijani contributed to the named enterprise AI integration areas. The wider CrushBank Orchestrate IT product is not presented as his sole work.",
    tags: ["Enterprise AI", "IBM watsonx", "Knowledge Search", "IT Automation"],
    aliases: ["crushbank", "orchestrate it", "watsonx", "ticket classification", "enterprise search", "grounded answers", "it automation"],
  },
  {
    slug: "ourblackguide-react-native",
    kind: "product",
    theme: "products",
    title: "OurBlackGuide — React Native Marketplace",
    oneLiner:
      "Contributed to cross-platform React Native architecture, directory discovery, secure sessions, business profiles, media uploads, and production releases.",
    summary:
      "OurBlackGuide is a community discovery application connecting users with local businesses, professional services, entrepreneurs, events, career resources, and marketplace listings. Tijani contributed to the React Native architecture and reusable iOS/Android components, then integrated the account, discovery, profile, and listing workflows.",
    problem:
      "A community directory needs more than a list of business names. Users need ways to find relevant services and events, narrow results by category and location, review business profiles, and interact with listings from a mobile device.",
    constraints: [
      "The mobile application supports both iOS and Android through a shared React Native codebase.",
      "Directory search and filtering must connect with live API data and account workflows.",
      "Business profiles and listings include image-upload and deep-link experiences.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to the React Native application architecture and reusable cross-platform components using TypeScript, React Navigation, and TanStack Query. He integrated authentication and APIs, built directory-search and filter experiences, and worked on business profiles, image uploads, deep links, and production releases.",
        points: [
          "Contributed to React Native architecture and reusable iOS/Android components.",
          "Integrated authentication and backend APIs.",
          "Implemented directory search, category filters, location filters, and pagination.",
          "Connected business profiles, image uploads, and listing workflows.",
          "Worked on performance, deep linking, and production releases.",
        ],
      },
      {
        heading: "Discovery experience",
        body:
          "The product brings local discovery and community resources into one mobile experience. The documented flows include searching the directory, narrowing results with category and location filters, paging through results, and opening detailed business profiles.",
      },
      {
        heading: "Mobile application foundations",
        body:
          "The documented stack—React Native, TypeScript, React Navigation, and TanStack Query—supports reusable screen components, navigation, and API-backed state. Authentication, media uploads, and deep links extend the experience beyond a simple directory browser.",
      },
    ],
    results: [
      { metric: "iOS + Android", label: "Shared React Native application" },
      { metric: "Search + filters", label: "Directory discovery workflows" },
      { metric: "Production", label: "Release support and deep linking" },
    ],
    stack: ["React Native", "TypeScript", "React Navigation", "TanStack Query", "Authentication", "REST APIs"],
    ownership:
      "The source describes Tijani as a contributor to the app architecture and listed mobile workflows. It does not claim sole authorship of the full OurBlackGuide product.",
    tags: ["React Native", "Mobile", "Marketplace", "Directory Search"],
    aliases: ["ourblackguide", "our black guide", "react native", "local directory", "community marketplace", "business profiles", "deep links", "tanstack query"],
  },
  {
    slug: "parente-ai-mobile-health",
    kind: "product",
    theme: "products",
    title: "Parente AI — Cross-Platform Health Application",
    oneLiner:
      "Built Flutter onboarding, assessment, and patient-messaging workflows, integrated APIs, and resolved mobile state and authentication issues across iOS and Android.",
    summary:
      "Parente AI is a pediatric behavioral-health application combining parent-led therapy, child psychology, clinician communication, and AI-assisted coaching. Tijani built Flutter mobile workflows for family onboarding, assessments, and patient messaging, integrated APIs, and addressed reliability issues that affected real user flows.",
    problem:
      "A family-facing health application must preserve the correct profile and assessment state while moving between onboarding, assessments, and patient messaging. API inconsistencies and expired sessions can interrupt that journey and leave forms incomplete or state stale.",
    constraints: [
      "Authentication tokens can expire during an application session.",
      "API responses may be inconsistent and need to be handled safely in the client.",
      "Switching profiles can leave stale state if dependent screens are not refreshed correctly.",
      "Assessment forms need to handle incomplete input and support release requirements on both mobile platforms.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani built Flutter workflows for family onboarding, assessments, and patient messaging. He integrated the application APIs and addressed token expiration, inconsistent responses, stale state after profile switching, incomplete forms, and iOS/Android release needs.",
        points: [
          "Built family onboarding flows in Flutter.",
          "Implemented reusable assessment screens and patient-facing messaging.",
          "Integrated backend APIs and handled inconsistent responses.",
          "Resolved state issues after profile switching and gaps in incomplete forms.",
          "Addressed authentication-token expiration and mobile release requirements.",
        ],
      },
      {
        heading: "Mobile workflow reliability",
        body:
          "The work focused on state transitions that affect family and patient experiences: authentication renewal, profile changes, partially completed forms, and responses from connected services. These concerns were addressed as part of the application workflows rather than treated as isolated visual defects.",
      },
      {
        heading: "Cross-platform delivery",
        body:
          "The application was developed for iOS and Android using Flutter. The supplied materials document the mobile workflows and release needs but do not provide a numerical adoption or clinical-outcome metric.",
      },
    ],
    results: [
      { metric: "Flutter", label: "Cross-platform mobile implementation" },
      { metric: "3", label: "Core workflows: onboarding, assessments, messaging" },
      { metric: "iOS + Android", label: "Release requirements addressed" },
    ],
    stack: ["Flutter", "REST APIs", "Authentication", "Mobile State", "iOS", "Android"],
    ownership:
      "Tijani built the listed mobile workflows and handled integration and client-state issues. The supplied notes do not describe him as the sole developer of the complete Parente AI product.",
    tags: ["Flutter", "HealthTech", "Mobile", "API Integration"],
    aliases: ["parente", "parente ai", "pediatric behavioral health", "family onboarding", "assessments", "patient messaging", "flutter"],
  },
  {
    slug: "deed-driver-delivery",
    kind: "product",
    theme: "products",
    title: "Deed — Driver Delivery Application",
    oneLiner:
      "Developed a Flutter driver application for a UPS partner in Iceland, supporting package-scanning and delivery workflows.",
    summary:
      "Deed is a driver delivery application built for a UPS partner in Iceland. Tijani developed the Flutter application supporting package scanning and delivery tasks, using Firebase Authentication and a documented set of state-management, dependency-injection, reactive, and file-selection tools.",
    problem:
      "Delivery drivers need mobile workflows that let them carry out package-related tasks while working in the field. The application brings package scanning and delivery actions into a driver-facing mobile experience.",
    constraints: [
      "The application is a Flutter mobile product using Firebase Authentication.",
      "The documented implementation uses several state and dependency-management libraries together.",
      "The workflow includes package scanning and delivery operations.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani developed the Flutter application for the partner's driver package-scanning and delivery workflows. The documented stack includes Dart, Firebase Authentication, Provider, GetIt, RxDart, BLoC, and file_picker.",
        points: [
          "Developed the Flutter mobile application.",
          "Supported driver package-scanning and delivery task flows.",
          "Worked with Firebase Authentication for application access.",
          "Used Provider, GetIt, RxDart, and BLoC within the application architecture.",
          "Used file_picker as part of the app's file interaction capabilities.",
        ],
      },
      {
        heading: "Mobile implementation",
        body:
          "The project is documented as a Flutter/Dart application with Firebase Authentication and a combination of state-management and dependency-management tools. The supplied notes do not provide a public product URL or quantitative delivery metric.",
      },
    ],
    results: [
      { metric: "Flutter", label: "Driver-facing mobile application" },
      { metric: "Package scan", label: "Core delivery workflow" },
      { metric: "Firebase Auth", label: "Application authentication" },
    ],
    stack: ["Flutter", "Dart", "Firebase Authentication", "Provider", "GetIt", "RxDart", "BLoC", "file_picker"],
    ownership:
      "The resume states that Tijani developed this Flutter application. The scope described here is the driver package-scanning and delivery workflow, not the wider carrier organization or logistics operation.",
    tags: ["Flutter", "Logistics", "Mobile", "Driver App"],
    aliases: ["deed", "driver delivery", "ups partner", "iceland", "package scanning", "firebase authentication", "flutter", "dart"],
  },
  {
    slug: "arvrobot-real-estate-underwriting",
    kind: "system",
    theme: "platform",
    title: "ARVRobot — Real Estate Underwriting",
    oneLiner:
      "Contributed property-data ingestion, comparable analysis, underwriting calculations, configurable assumptions, reporting, and AI-assisted property analysis.",
    summary:
      "ARVRobot helps real-estate investors evaluate properties and analyze potential returns. Tijani contributed to the data and analysis workflows that bring property facts, comparable properties, financial calculations, configurable assumptions, reporting, and AI-assisted analysis into an underwriting experience.",
    problem:
      "Property investment decisions depend on more than a listing price. Investors need to gather property information, compare relevant properties, test financial assumptions, and review the resulting analysis in a consistent workflow.",
    constraints: [
      "The workflow combines ingested property data with comparable-property information.",
      "Financial outputs depend on assumptions that users can configure.",
      "Reporting and AI-assisted analysis need to stay connected to the underlying property and financial context.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed property-data ingestion, comparable-property analysis, financial calculations, configurable assumptions, reporting, and AI-assisted property analysis.",
        points: [
          "Worked on property-data ingestion and the supporting data workflows.",
          "Contributed comparable-property analysis for underwriting context.",
          "Implemented or extended financial calculations and configurable assumptions.",
          "Contributed reporting and AI-assisted property-analysis workflows.",
        ],
      },
      {
        heading: "Underwriting workflow",
        body:
          "The platform organizes the property-evaluation process around property facts, comparable sales, financial assumptions, and reports. Configurable inputs let the analysis reflect different investment scenarios, while AI-assisted analysis adds another way to interpret the property information.",
      },
      {
        heading: "Ownership boundary",
        body:
          "The supplied materials describe Tijani as a contributor to the listed product workflows. They do not specify a sole-owner role or a quantified underwriting result, so this case study stays within the documented contribution.",
      },
    ],
    results: [
      { metric: "Property data", label: "Ingestion and comparable-property context" },
      { metric: "Configurable", label: "Financial assumptions and calculations" },
      { metric: "AI-assisted", label: "Property analysis and reporting" },
    ],
    stack: ["Property Data", "Comparable Analysis", "Financial Calculations", "Configurable Assumptions", "Reporting", "AI-Assisted Analysis"],
    ownership:
      "Tijani contributed to the documented property-data, underwriting, reporting, and AI-assisted analysis workflows. This is not a claim of sole product ownership.",
    tags: ["Real Estate", "Underwriting", "Financial Analysis", "AI"],
    aliases: ["arvrobot", "real estate underwriting", "property analysis", "comparable properties", "comps", "financial calculations", "assumptions", "ai property analysis"],
  },
  {
    slug: "gemsharbor-marketplace",
    kind: "product",
    theme: "products",
    title: "GemsHarbor — Marketplace & Auctions",
    oneLiner:
      "Worked on product listings, dashboards, auctions and bidding, offers, payment integrations, notifications, and connected order workflows.",
    summary:
      "GemsHarbor is a B2B/B2C gemstone and jewelry marketplace. Tijani worked on the commerce workflows spanning product listings, user dashboards, auctions, bidding, offers, payment integrations, notifications, and order progression.",
    problem:
      "A specialist marketplace needs to support both product discovery and transaction workflows. Listings, auction activity, offers, payment status, notifications, and orders need to connect so buyers and sellers can follow a transaction through its stages.",
    constraints: [
      "The marketplace supports product listings and user dashboards.",
      "Auctions and bidding add time-sensitive interaction to the commerce flow.",
      "Offers, payments, notifications, and order workflows must remain connected.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani worked on the marketplace and e-commerce workflows: listings, dashboards, auctions and bidding, offers, payment integrations, notifications, and connected order flows.",
        points: [
          "Contributed product listing and marketplace experiences.",
          "Worked on user dashboards and auction/bidding workflows.",
          "Connected offer and payment steps to the order journey.",
          "Supported notifications across marketplace activity.",
        ],
      },
      {
        heading: "Marketplace transaction flow",
        body:
          "The product combines B2B/B2C discovery with auction and e-commerce features. The documented scope spans the buyer/seller-facing surfaces and the connected transactions behind them, rather than a static catalog alone.",
      },
      {
        heading: "Project scope",
        body:
          "The supplied resume identifies the major marketplace workflows but does not provide a technology stack, exact implementation ownership by feature, or quantified business outcomes. This write-up therefore focuses on the product and workflow areas that are explicitly documented.",
      },
    ],
    results: [
      { metric: "B2B + B2C", label: "Marketplace audience" },
      { metric: "Auctions", label: "Bidding and offer workflows" },
      { metric: "Commerce", label: "Payments, notifications, and orders" },
    ],
    stack: ["Marketplace", "E-commerce", "Auctions", "Bidding", "Offers", "Payment Integrations", "Notifications"],
    ownership:
      "Tijani worked on the listed marketplace and transaction workflows. The supplied materials do not describe him as the sole author of GemsHarbor or provide a per-feature ownership breakdown.",
    tags: ["Marketplace", "E-commerce", "Auctions", "Payments"],
    aliases: ["gemsharbor", "gems harbor", "jewelry marketplace", "gemstone marketplace", "auctions", "bidding", "offers", "payments"],
  },
  {
    slug: "shiphype-fulfillment",
    kind: "system",
    theme: "platform",
    title: "ShipHype — Logistics & Fulfillment",
    oneLiner:
      "Contributed to fulfillment integrations and automation covering event processing, synchronization, retries, error handling, and operational workflows.",
    summary:
      "ShipHype is an operational platform for fulfillment and logistics workflows. Tijani contributed to the integration and automation layers, focusing on event processing, data synchronization, retry strategies, error handling, and the operational processes that connect fulfillment systems.",
    problem:
      "Fulfillment operations depend on multiple connected services and events. When updates arrive asynchronously or an external service is temporarily unavailable, the platform needs to preserve workflow state and provide safe retry and recovery behavior.",
    constraints: [
      "Operational workflows depend on events and synchronization between connected systems.",
      "Temporary integration failures need explicit retry and error-handling behavior.",
      "The work spans integration and automation layers rather than a single isolated screen.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to the platform's integration and automation layers, including event processing, synchronization, retry strategies, error handling, and operational workflows. The supporting project notes also identify work around integration and AI layers.",
        points: [
          "Worked on integration and automation workflows for fulfillment operations.",
          "Contributed event-processing and synchronization paths.",
          "Implemented or extended retry and error-handling behavior.",
          "Supported operational workflows across connected systems.",
        ],
      },
      {
        heading: "Operational reliability",
        body:
          "The documented focus is on making connected operational workflows resilient. Events need to be processed, state needs to synchronize, and failures need to be handled in a way that supports recovery instead of leaving the operation in an unclear state.",
      },
      {
        heading: "Scope and attribution",
        body:
          "The resume states that Tijani contributed to these platform layers. It does not provide a complete technology inventory, a quantitative outcome, or sole ownership of the fulfillment platform.",
      },
    ],
    results: [
      { metric: "Event-driven", label: "Fulfillment workflow processing" },
      { metric: "Retry-aware", label: "Integration recovery behavior" },
      { metric: "Automated", label: "Connected operational workflows" },
    ],
    stack: ["Fulfillment", "Logistics", "Event Processing", "Synchronization", "Retries", "Error Handling", "Automation"],
    ownership:
      "Tijani contributed to the integration and automation layers described in the resume. The broader ShipHype product is not presented as an individually owned build.",
    tags: ["Logistics", "Fulfillment", "Integrations", "Automation"],
    aliases: ["shiphype", "fulfillment", "logistics", "event processing", "synchronization", "retry", "error handling"],
  },
  {
    slug: "dealercortex-ai",
    kind: "system",
    theme: "agents",
    title: "DealerCortex AI — Automotive Intelligence",
    oneLiner:
      "Connected marketing, inventory, CRM, customer-conversation, and call data to AI-driven dealership recommendations and business outcomes.",
    summary:
      "DealerCortex AI connects dealership marketing activity, customer interactions, inventory, and business performance. Tijani's documented contribution includes AI-powered automotive workflows, Google Ads and analytics integrations, CRM and inventory connections, conversation and call-data integration, and AI recommendations tied to appointments, sales, and other business outcomes.",
    problem:
      "Dealership performance data is spread across marketing platforms, inventory systems, CRM records, customer conversations, and call activity. A useful intelligence layer needs to connect those signals so marketing activity can be interpreted in the context of real dealership outcomes.",
    constraints: [
      "The platform connects multiple sources, including Google Ads, analytics, inventory, and CRM data.",
      "Customer conversations and call data provide additional context beyond advertising metrics.",
      "Recommendations need to relate marketing activity to business outcomes such as appointments and sales.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to AI-powered automotive intelligence workflows and the integrations that feed them. The documented work includes Google Ads and analytics connections, inventory and CRM data, customer conversations and call data, and AI-driven dealership recommendations.",
        points: [
          "Integrated Google Ads and analytics data.",
          "Connected dealership inventory and CRM information.",
          "Worked with customer conversation and call data.",
          "Contributed AI recommendations that connect marketing activity to appointments, sales, and business outcomes.",
        ],
      },
      {
        heading: "From marketing signals to dealership outcomes",
        body:
          "The product context moves beyond campaign reporting by bringing inventory, customer activity, and call/conversation context into the same intelligence workflow. The goal is to connect marketing activity to the operational outcomes dealerships care about.",
      },
      {
        heading: "Integration scope",
        body:
          "The supplied notes identify the platforms and data domains involved but do not specify the exact programming languages, connector count, or performance metrics. This page describes the documented integration and AI workflow contribution without inventing those details.",
      },
    ],
    results: [
      { metric: "Google Ads", label: "Marketing data integration" },
      { metric: "CRM + inventory", label: "Dealership data context" },
      { metric: "AI-driven", label: "Recommendations tied to business outcomes" },
    ],
    stack: ["AI Workflows", "Google Ads", "Analytics", "CRM", "Inventory Data", "Call Data"],
    ownership:
      "Tijani's documented contribution covers the AI workflows and integrations listed here. The supplied notes do not claim sole ownership of DealerCortex AI.",
    tags: ["Automotive", "AI", "Marketing Analytics", "CRM Integrations"],
    aliases: ["dealercortex", "dealer cortex", "automotive intelligence", "dealership ai", "google ads", "crm", "call data", "inventory", "dealer recommendations"],
  },
  {
    slug: "arub-shipping-integrations",
    kind: "system",
    theme: "platform",
    title: "Arub Shipping — Carrier & Order Integrations",
    oneLiner:
      "Worked on carrier APIs, order synchronization, shipment processing, label generation, reconciliation, idempotency, retries, and recovery handling.",
    summary:
      "Arub Shipping connects order processing with carrier services. Tijani's documented integration experience includes carrier API connectivity, order synchronization, shipment processing, label generation, transaction reconciliation, idempotency, retries, and recovery handling.",
    problem:
      "Shipping workflows need to carry order data into carrier services and bring shipment status and labels back into the originating operation. This becomes fragile when API requests are retried, events are duplicated, or the carrier and order systems temporarily disagree.",
    constraints: [
      "Carrier services are external dependencies with their own request and response lifecycle.",
      "Order and shipment state must remain synchronized across systems.",
      "Retries and recovery need protection against duplicate processing and inconsistent records.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani worked on the shipping integration layer, covering carrier APIs, order synchronization, shipment processing, label generation, and transaction reconciliation. The documented reliability mechanisms include idempotency, retries, and recovery handling.",
        points: [
          "Connected shipping workflows to external carrier APIs.",
          "Synchronized order information with shipment processing.",
          "Supported label-generation workflows.",
          "Worked on reconciliation and safe retry/recovery behavior.",
        ],
      },
      {
        heading: "Carrier lifecycle and recovery",
        body:
          "The engineering scope follows a shipping operation from order synchronization through carrier processing and label generation. Idempotency and recovery behavior are important because a repeated request should not create duplicate shipment actions or leave the order and carrier states out of sync.",
      },
    ],
    results: [
      { metric: "Carrier APIs", label: "External shipping connectivity" },
      { metric: "Order → shipment", label: "Synchronized processing workflow" },
      { metric: "Idempotent", label: "Retry and recovery handling" },
    ],
    stack: ["Carrier APIs", "Order Sync", "Shipment Processing", "Label Generation", "Reconciliation", "Idempotency", "Retries"],
    ownership:
      "The supporting notes describe integration experience in these areas. This page does not claim sole ownership of the Arub platform or any carrier relationship.",
    tags: ["Shipping", "Carrier APIs", "Logistics", "Integrations"],
    aliases: ["arub", "arub shipping", "carrier integration", "shipping api", "labels", "shipment processing", "order sync", "reconciliation"],
  },
  {
    slug: "suppliersift-ap-automation",
    kind: "system",
    theme: "retrieval",
    title: "SupplierSift — Accounts Payable Automation",
    oneLiner:
      "Contributed QuickBooks Desktop integration workflows for invoice posting, accounting-list synchronization, and duplicate prevention.",
    summary:
      "SupplierSift automates accounts-payable work from Microsoft 365 email intake through invoice extraction, accounting classification, approvals, and QuickBooks Desktop. Tijani's documented integration contribution includes QuickBooks Web Connector communication, transaction posting, accounting-list synchronization, and duplicate prevention.",
    problem:
      "Accounts-payable workflows begin with documents and email, but the final accounting record must be accurate and consistent with QuickBooks Desktop. The system needs to move invoice information through extraction, classification, approval, and posting without creating duplicate transactions or stale reference data.",
    constraints: [
      "Invoice intake and extraction are connected to accounting classification and approval workflows.",
      "QuickBooks Desktop is integrated through its Web Connector communication path.",
      "Transaction posting and accounting-list synchronization need duplicate-prevention safeguards.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed integration and workflow work around QuickBooks Desktop, specifically Web Connector communication, transaction posting, accounting-list synchronization, and duplicate prevention.",
        points: [
          "Worked with QuickBooks Web Connector communication.",
          "Connected approved AP transactions to posting workflows.",
          "Supported synchronization of accounting reference lists.",
          "Implemented or extended duplicate-prevention behavior for transaction handling.",
        ],
      },
      {
        heading: "Document-to-accounting workflow",
        body:
          "The product context starts with Microsoft 365 email intake and invoice extraction, then moves through accounting classification and approvals before updating QuickBooks Desktop. Tijani's stated role is specifically the accounting-integration portion of that workflow.",
      },
      {
        heading: "Ownership boundary",
        body:
          "The source describes Tijani's scope as relevant integration and workflow experience. This write-up does not claim ownership of the complete accounts-payable product or the invoice extraction model.",
      },
    ],
    results: [
      { metric: "Microsoft 365", label: "Email-based invoice intake context" },
      { metric: "QuickBooks Desktop", label: "Accounting integration" },
      { metric: "Duplicate-aware", label: "Transaction posting workflow" },
    ],
    stack: ["Microsoft 365", "QuickBooks Desktop", "Web Connector", "Invoice Extraction", "Accounting Classification", "Approvals"],
    ownership:
      "Tijani's documented contribution is the QuickBooks integration and related workflow safeguards. The full SupplierSift product is not presented as his sole work.",
    tags: ["FinTech", "Accounts Payable", "QuickBooks", "Integrations"],
    aliases: ["suppliersift", "supplier sift", "accounts payable", "ap automation", "quickbooks desktop", "web connector", "invoice processing", "duplicate prevention"],
  },
  {
    slug: "calcs-engineering-calculations",
    kind: "system",
    theme: "platform",
    title: "Calcs.com — Engineering Calculation Platform",
    oneLiner:
      "Contributed to production web workflows that turn spreadsheet-based engineering methods into transparent, testable calculations.",
    summary:
      "Calcs.com converts spreadsheet-based design methods into web calculations for structural steel, concrete, timber, foundations, and connections. Tijani contributed to production web workflows with dependency-aware updates and automated validation.",
    problem:
      "Engineering calculations often live in spreadsheets where dependencies and validation can be difficult to inspect or test consistently. A web workflow can make inputs, dependent calculations, and results more transparent while preserving the relationship between the values users change and the outputs they rely on.",
    constraints: [
      "The product covers different structural-engineering calculation domains, including steel, concrete, timber, foundations, and connections.",
      "Derived values depend on other inputs and need to update when those inputs change.",
      "Calculation workflows require automated validation to make behavior testable.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to the implementation of production web workflows, with a documented focus on dependency-aware updates and automated validation. The work supported the translation of spreadsheet-based engineering methods into a clearer, testable application experience.",
        points: [
          "Contributed to production web calculation workflows.",
          "Worked with dependency-aware updates as calculation inputs change.",
          "Supported automated validation of calculation behavior.",
        ],
      },
      {
        heading: "Calculation workflow context",
        body:
          "The platform covers calculation methods for structural steel, concrete, timber, foundations, and connections. The important product distinction is that the underlying calculation method is represented as a transparent web workflow rather than hidden inside a disconnected spreadsheet.",
      },
      {
        heading: "Engineering quality",
        body:
          "Dependency-aware updates preserve the relationship between inputs and derived values, while automated validation makes the implemented calculations easier to verify. The supplied source does not specify particular formulas or code ownership, so this case study stays at the documented workflow level.",
      },
    ],
    results: [
      { metric: "5 domains", label: "Steel, concrete, timber, foundations, connections" },
      { metric: "Dependency-aware", label: "Recalculation when inputs change" },
      { metric: "Automated", label: "Validation of calculation behavior" },
    ],
    stack: ["Engineering Calculations", "Structural Steel", "Concrete", "Timber", "Foundations", "Automated Validation"],
    ownership:
      "The source describes Tijani as a participant in the platform's production web workflows. This page does not claim ownership of engineering methods or the complete Calcs.com platform.",
    tags: ["Engineering Software", "Web Applications", "Validation", "Calculations"],
    aliases: ["calcs", "calcs.com", "engineering calculations", "structural steel", "concrete", "timber", "foundations", "dependency updates", "automated validation"],
  },
  {
    slug: "charter-steel-web",
    kind: "product",
    theme: "platform",
    title: "Charter Steel — Corporate Web Experience",
    oneLiner:
      "Contributed to industrial website development, responsive layouts, corporate presentation, and business-facing content organization.",
    summary:
      "Charter Steel is an industrial steel manufacturer. Tijani's documented contribution includes website development, responsive page layouts, corporate presentation, and organization of business-facing information for professional audiences.",
    problem:
      "An industrial corporate website needs to communicate a company's capabilities and business information clearly to customers and professional audiences. The experience should remain usable across screen sizes while keeping important content organized and easy to navigate.",
    constraints: [
      "The site presents information for an industrial and business-to-business audience.",
      "Layouts need to remain responsive across desktop and mobile screen sizes.",
      "Corporate presentation and content organization need to work together rather than compete for attention.",
    ],
    diagram: null,
    diagramCaption: "",
    decisions: [],
    sections: [
      {
        heading: "Tijani's role",
        body:
          "Tijani contributed to website development, responsive layouts, corporate presentation, and business-facing content organization.",
        points: [
          "Worked on the corporate website experience.",
          "Implemented responsive page layouts.",
          "Organized business-facing information for a professional audience.",
          "Supported the presentation of an industrial manufacturing brand online.",
        ],
      },
      {
        heading: "Responsive corporate presentation",
        body:
          "The project required a consistent presentation of company and business information across desktop and mobile layouts. The supplied material identifies the website and content responsibilities but does not specify a technology stack or quantified conversion result.",
      },
    ],
    results: [
      { metric: "Responsive", label: "Layouts across desktop and mobile" },
      { metric: "Industrial B2B", label: "Corporate information architecture" },
      { metric: "Business-facing", label: "Content presentation" },
    ],
    stack: ["Web Development", "Responsive Design", "Corporate Website", "Content Organization"],
    ownership:
      "Tijani's documented contribution is website development and the listed presentation and layout work. The site and brand are not presented as his sole creation.",
    tags: ["Corporate Website", "Responsive Design", "Industrial", "B2B"],
    aliases: ["charter steel", "industrial website", "steel manufacturer", "corporate website", "responsive web design", "content organization"],
  },
];

// Keep system work before customer-facing products in the index, regardless of
// the order in which the source entries above are maintained.
caseStudies.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "system" ? -1 : 1));

export const caseStudyBySlug = new Map(caseStudies.map((study) => [study.slug, study]));
export const systemCaseStudies = caseStudies.filter((study) => study.kind === "system");
export const productCaseStudies = caseStudies.filter((study) => study.kind === "product");

export const caseStudiesByTheme = CASE_STUDY_THEMES.map((theme) => ({
  ...theme,
  studies: caseStudies.filter((study) => study.theme === theme.id),
})).filter((group) => group.studies.length > 0);

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);

export function getCaseStudyPath(slug: string) {
  return `/work/${slug}`;
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? caseStudies[index - 1] : null,
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : null,
  };
}
