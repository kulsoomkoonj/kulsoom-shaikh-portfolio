import { getEducation, getExperience, getProfile, getServices, getSite, getSkills, getWork } from "@/lib/content";
import type { AgentLink, AgentReply, AgentTurn } from "@/lib/agent";

const topics = new Set(["skills", "projects", "experience", "contact", "about", "chat", "general", "education", "services"]);

function portfolioFacts() {
  const profile = getProfile();
  const site = getSite();
  const skills = getSkills();
  const work = getWork();
  const { roles } = getExperience();
  const { degrees, certifications } = getEducation();

  const skillLines = skills.groups
    .map((group) => `${group.title}: ${group.items.map((item) => `${item.name} (${item.level})`).join(", ")}`)
    .join("\n");
  const projects = work
    .map((item) => `${item.name} | link /projects/${item.slug} | ${item.tagline} | tools: ${item.tools.join(", ")} | outcome: ${item.outcome} | limit: ${item.limits}`)
    .join("\n");
  const jobs = roles.map((role) => `${role.role} at ${role.company} (${role.startDate}–now). ${role.highlights[0]}`).join("\n");
  const study = degrees.map((degree) => `${degree.credential}, ${degree.institution} (${degree.field})`).join("\n");
  const certs = certifications.map((item) => `${item.title} (${item.issuer})`).join(", ");
  const serviceLines = getServices()
    .items.map((item) => `${item.title} | order /contact?service=${item.id} | ${item.summary}`)
    .join("\n");

  return [
    `Name: ${profile.fullName}`,
    `Headline: ${profile.headline}`,
    `Studio: ${site.studioLabel}`,
    `Studio lead: ${site.studioLead}`,
    `Location: ${profile.location}`,
    `Availability: ${site.availabilityLabel}`,
    `Reply time: ${site.replyLabel}`,
    `Summary: ${profile.summary}`,
    `Spoken languages: ${skills.spokenLanguages.join(", ")}`,
    `Email: Contact details not yet provided`,
    `GitHub: /projects`,
    `LinkedIn: /contact`,
    `CV: ${site.cvPath}`,
    "No public phone number.",
    "This is a personal studio led by Kulsoom, not a large agency with a separate team.",
    "",
    "She builds both AI websites and full-stack websites.",
    "AI work is mainly Python. TypeScript and JavaScript are used when the agent needs a website or an API.",
    "Full-stack screens: React, Next.js, Angular. Servers: FastAPI, Node.js. Also C# / ASP.NET Core and Java / Spring Boot. Data: PostgreSQL, SQL Server, MySQL.",
    "",
    "Skills (core = every day, strong = shipped, working = used on a real project):",
    skillLines,
    "",
    "Jobs:",
    jobs,
    "",
    "Study:",
    study,
    `Certificates: ${certs}`,
    "",
    "Freelance services she takes orders for. She does not sell live trading or medical products.",
    serviceLines,
    "Services page: /services",
    "",
    "Projects:",
    projects,
  ].join("\n");
}

function allowedHrefs() {
  const site = getSite();
  const profile = getProfile();
  const hrefs = new Set<string>(["/about", "/skills", "/projects", "/services", "/contact", site.cvPath]);
  for (const item of getServices().items) hrefs.add(`/contact?service=${item.id}`);
  for (const item of getWork()) hrefs.add(`/projects/${item.slug}`);
  for (const link of profile.links) hrefs.add(link.href);
  return hrefs;
}

function cleanText(value: string) {
  return value
    .replace(/\+?\d[\d\s()-]{8,}\d/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 900);
}

export function replyFromModel(raw: string): AgentReply | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let parsed: { text?: unknown; links?: unknown; suggestions?: unknown; topic?: unknown };
  try {
    parsed = JSON.parse(raw.slice(start, end + 1)) as typeof parsed;
  } catch {
    return null;
  }
  const text = cleanText(String(parsed.text ?? ""));
  if (text.length < 2) return null;
  const allowed = allowedHrefs();
  const links = (Array.isArray(parsed.links) ? parsed.links : [])
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const href = String((item as { href?: unknown }).href ?? "");
      const label = String((item as { label?: unknown }).label ?? "").trim().slice(0, 40);
      if (!label || !allowed.has(href)) return [];
      const external = href.startsWith("http") || href.startsWith("mailto") || href.endsWith(".pdf");
      const link: AgentLink = external ? { href, label, external: true } : { href, label };
      return [link];
    })
    .slice(0, 3);
  const suggestions = (Array.isArray(parsed.suggestions) ? parsed.suggestions : [])
    .map((item) => String(item).trim().slice(0, 40))
    .filter((item) => item.length > 1)
    .slice(0, 3);
  const topic = topics.has(String(parsed.topic)) ? String(parsed.topic) : "general";
  return { text, links, suggestions, topic };
}

const instructions = `You are the assistant on Kulsoom Shaikh's portfolio. Visitors write in English or Roman Urdu. Reply in easy English.

Answer the question they actually asked. A yes/no question starts with Yes or No. Do not paste a skill list unless they asked which skills, tools, or languages.

When they ask which full-stack languages she knows, the answer must include all four groups below. Do not stop after the language names.
Languages: Python, TypeScript, JavaScript, C#, Java.
Screens: React, Next.js, Angular.
Servers: FastAPI, Node.js, ASP.NET Core, Spring Boot.
Data: PostgreSQL, SQL Server, MySQL.
Use a short heading and bullets for each group. Do not use markdown or asterisks.

If the facts say she can do it, say yes. If it is not in the facts, say it is not on her list. Never invent a skill, job, number, age, or phone number.

OmniTrader results are practice trades only. Never call them live profit.

Use only these facts:
${portfolioFacts()}

Return JSON only:
{"text":"short answer","links":[{"href":"/projects","label":"See projects"}],"suggestions":["Her skills","Contact her"],"topic":"projects"}
topic is one of: skills, projects, services, experience, contact, about, chat, general, education.
If they ask what she can build for a client, or how to order, list the freelance services and link /services. Do not offer live trading or medical products.
links href must be copied from the facts. At most 2 links and 3 suggestions.`;

export async function askModel(message: string, history: AgentTurn[]): Promise<AgentReply | null> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const messages = [
    { role: "system", content: instructions },
    ...history.slice(-6).map((turn) => ({
      role: turn.role === "assistant" ? "assistant" : "user",
      content: turn.text.slice(0, 500),
    })),
    { role: "user", content: message.slice(0, 500) },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 600,
        response_format: { type: "json_object" },
        messages,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    return replyFromModel(data.choices?.[0]?.message?.content ?? "");
  } catch {
    return null;
  }
}
