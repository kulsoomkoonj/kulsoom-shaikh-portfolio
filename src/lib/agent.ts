import { getEducation, getExperience, getProfile, getSite, getSkills, getWork } from "@/lib/content";

export type AgentLink = { href: string; label: string; external?: boolean };
export type AgentReply = { text: string; links: AgentLink[]; suggestions: string[]; topic: string };
export type AgentTurn = { role: "user" | "assistant"; text: string };

const nextSteps = ["See projects", "Her skills", "Contact her"];

const cards: Record<string, { title: string; line: string; more: string }> = {
  calix: {
    title: "CALIX",
    line: "CALIX is a desktop helper made of small agents. A person can check each action before it runs.",
    more: "It stays on the computer. The code is private, so the site shows the plan, not the source.",
  },
  "jobmatch-ai": {
    title: "JobMatch AI",
    line: "JobMatch AI finds roles, reshapes a CV for that role, and keeps a person in charge of the application.",
    more: "It uses official job APIs, not scraping. Nothing is sent until a person approves it. There is no public demo on this site.",
  },
  "glow-salon": {
    title: "Glow salon bot",
    line: "Glow is a WhatsApp bot for a beauty salon. It answers questions, books a visit, and can hand the chat to a person.",
    more: "The staff also get a simple page for leads. This is a private client project.",
  },
  "whatsapp-mcp": {
    title: "WhatsApp agent",
    line: "This WhatsApp agent can use tools, like a database or files, instead of guessing the answer.",
    more: "It also reads voice notes. The keys and private data are not on this site.",
  },
  "ai-cdss": {
    title: "Clinic helper",
    line: "AI-CDSS is a test clinic app. Doctors, nurses, pharmacists, and admins each have a role, and actions are logged.",
    more: "It helps a clinician. It does not replace a doctor, and it is not a medical product.",
  },
  "agentic-rag": {
    title: "StudyPilot",
    line: "StudyPilot reads your documents first, then answers. It can also make a short quiz.",
    more: "If the papers do not contain the answer, it should say so.",
  },
  omnitrader: {
    title: "OmniTrader",
    line: "OmniTrader tests trading agents on paper. About 400 practice trades, a 32% win rate, and a 1.4 profit factor.",
    more: "These are practice results, not real profit.",
  },
  clinnote: {
    title: "ClinNote",
    line: "ClinNote turns a hard clinical note into plain words for a patient.",
    more: "It only helps explain the note. It does not make the medical decision.",
  },
  seq2seq: {
    title: "English to Urdu",
    line: "This school project translates English to Urdu and scores the result with BLEU.",
    more: "It is a study project, not a finished translator app.",
  },
};

function has(text: string, words: string[]) {
  return words.some((word) => new RegExp(`(^|[^a-z])${word}([^a-z]|$)`, "i").test(text));
}

function reply(text: string, links: AgentLink[], suggestions: string[], topic: string): AgentReply {
  return { text, links, suggestions, topic };
}

function matchProject(text: string) {
  const work = getWork();
  return (
    work.find((item) => {
      if (text.includes(item.slug)) return true;
      if (item.slug === "jobmatch-ai" && has(text, ["jobmatch", "job match"])) return true;
      if (item.slug === "whatsapp-mcp" && has(text, ["whatsapp", "database agent"])) return true;
      if (item.slug === "ai-cdss" && has(text, ["cdss", "clinic", "clinical"])) return true;
      if (item.slug === "agentic-rag" && has(text, ["rag", "studypilot", "study pilot"])) return true;
      if (item.slug === "omnitrader" && has(text, ["omni", "trader", "trading"])) return true;
      if (item.slug === "clinnote" && has(text, ["clinnote", "clinical note"])) return true;
      if (item.slug === "seq2seq" && has(text, ["seq2seq", "urdu", "translation"])) return true;
      if (item.slug === "calix" && text.includes("calix")) return true;
      return text.includes(item.name.toLowerCase());
    }) ?? null
  );
}

function projectReply(slug: string, deeper: boolean): AgentReply {
  const card = cards[slug];
  const item = getWork().find((work) => work.slug === slug);
  if (!card || !item) return fallback();
  return reply(deeper ? card.more : `${card.line}\n\nWant a little more, or the full story?`, [{ href: `/projects/${slug}`, label: "Full story" }], ["Tell me more", "See projects", "Contact her"], `project:${slug}`);
}

function projectList(): AgentReply {
  const lines = ["calix", "jobmatch-ai", "glow-salon", "whatsapp-mcp", "ai-cdss", "agentic-rag", "omnitrader"]
    .map((slug) => `• ${cards[slug].title}`)
    .join("\n");
  return reply(
    `Here are the main projects. Tell me which one you want.\n\n${lines}`,
    [{ href: "/projects", label: "All projects" }],
    ["Salon bot", "Clinic app", "OmniTrader"],
    "projects",
  );
}

function fallback(): AgentReply {
  return reply("I can help with four things: her projects, her skills, her jobs, or how to contact her. Which one do you want?", [], nextSteps, "fallback");
}

function normalize(raw: string) {
  const swaps: Record<string, string> = { u: "you", r: "are", ur: "your", pls: "please", plz: "please", thx: "thanks", ty: "thanks" };
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => swaps[word] ?? word)
    .join(" ");
}

function smallTalk(text: string): AgentReply | null {
  if (has(text, ["how are you", "how are u", "how r you", "how do you do", "whats up", "what is up", "sup"])) {
    return reply("I am good, thank you.\n\nI can chat a little, and I know Kulsoom's work. Ask me about her projects, or ask a simple question like “what is AI?”", [], ["What is AI?", "See projects", "Contact her"], "chat");
  }
  if (has(text, ["thank", "thanks"])) {
    return reply("You are welcome. I am here if you want another question.", [], nextSteps, "chat");
  }
  if (has(text, ["bye", "goodbye", "good night", "see you"])) {
    return reply("Bye. You can open the chat again any time, or send Kulsoom a note.", [{ href: "/contact", label: "Contact" }], ["See projects"], "chat");
  }
  if (has(text, ["good morning", "good afternoon", "good evening"])) {
    return reply("Hello. I hope your day is going well. What would you like to know?", [], nextSteps, "chat");
  }
  if (has(text, ["your name", "who are you", "what are you"])) {
    return reply("I am the assistant on Kulsoom Shaikh's website. I can answer everyday questions in simple words, and I know her projects, skills, and jobs.", [{ href: "/about", label: "About her" }], nextSteps, "chat");
  }
  if (has(text, ["help", "what can you do"])) {
    return reply("I can do two things.\n\nI can explain simple ideas, like AI, MCP, or RAG.\nI can also show Kulsoom's projects, skills, jobs, and contact details.", [], ["What is MCP?", "See projects", "Contact her"], "chat");
  }
  if (has(text, ["joke"])) {
    return reply("A small one: I do not drink coffee, but I can still help you find the right project.\n\nWant to see her work?", [], ["See projects", "What is AI?"], "chat");
  }
  if (has(text, ["weather"])) {
    return reply("I cannot see the weather from this page. I can still help you with Kulsoom's work, or with a simple tech question.", [], ["See projects", "What is AI?"], "chat");
  }
  if (has(text, ["your age", "how old", "her age"])) {
    return reply("I do not share private details like age. She is an engineer and works remotely from Pakistan.", [{ href: "/about", label: "About her" }], ["See projects", "Contact her"], "chat");
  }
  return null;
}

function findKnownSkill(text: string, groups: { items: { name: string; level: string }[] }[]) {
  let best: { name: string; level: string; score: number } | null = null;
  for (const item of groups.flatMap((group) => group.items)) {
    const name = item.name.toLowerCase();
    let score = 0;
    if (text.includes(name)) score = name.length + 5;
    else {
      const parts = name.split(/[^a-z0-9+#]+/).filter((part) => part.length >= 5 || ["c#", "rag", "mcp", "api", "sql"].includes(part));
      const hit = parts.find((part) => text.includes(part) || (part.endsWith("s") && text.includes(part.slice(0, -1))));
      if (hit) score = hit.length;
    }
    if (score > (best?.score ?? 0)) best = { name: item.name, level: item.level, score };
  }
  return best && best.score >= 3 ? best : null;
}

function generalFact(text: string): AgentReply | null {
  const facts: { keys: string[]; text: string; suggestions: string[] }[] = [
    {
      keys: ["artificial intelligence", "what is ai", "what's ai"],
      text: "AI is a computer system that can do work which usually needs a person, like reading text, choosing a next step, or answering a question.\n\nKulsoom builds AI that can use tools and follow clear rules.",
      suggestions: ["What is MCP?", "See projects"],
    },
    {
      keys: ["llm", "language model"],
      text: "An LLM is an AI that is trained on a lot of text, so it can write and answer in normal language.\n\nKulsoom uses LLMs inside agents, chat bots, and document search.",
      suggestions: ["What is RAG?", "See projects"],
    },
    {
      keys: ["mcp", "model context protocol"],
      text: "MCP is a way for an AI to use a tool safely, like a database or a file store, instead of guessing.\n\nKulsoom builds MCP servers, including ones for WhatsApp and storage.",
      suggestions: ["WhatsApp agent", "See projects"],
    },
    {
      keys: ["rag", "retrieval"],
      text: "RAG means the AI reads the right documents first, then answers from those documents. This keeps the answer closer to the source.\n\nHer StudyPilot project works this way.",
      suggestions: ["StudyPilot", "See projects"],
    },
    {
      keys: ["ai agent", "what is an agent", "what is agent"],
      text: "An agent is an AI that can take steps, not only reply once. It can call a tool, check the result, and then continue.\n\nThat is the kind of system Kulsoom builds.",
      suggestions: ["See projects", "What is MCP?"],
    },
    {
      keys: ["api"],
      text: "An API is a door between two programs. One program asks for data, and the other sends it back in a clear format.\n\nKulsoom builds APIs for web apps and for AI tools.",
      suggestions: ["Her skills", "See projects"],
    },
    {
      keys: ["portfolio"],
      text: "A portfolio is a site that shows a person's work. This one shows Kulsoom's projects, skills, jobs, and certificates.",
      suggestions: ["See projects", "Contact her"],
    },
  ];

  const found = facts.find((fact) => fact.keys.some((key) => text.includes(key)));
  if (!found) return null;
  return reply(`${found.text}\n\nWant me to connect this to her work?`, [], found.suggestions, "general");
}

export function answerPortfolio(raw: string, history: AgentTurn[] = [], topic = ""): AgentReply {
  const text = normalize(raw);
  const profile = getProfile();
  const site = getSite();
  const skills = getSkills();
  const { roles } = getExperience();
  const { degrees, certifications } = getEducation();
  const more = text.split(" ").filter(Boolean).length <= 5 && has(text, ["more", "yes", "yeah", "sure", "detail", "deeper", "go on", "continue", "tell me"]);
  const project = matchProject(text);
  const chat = smallTalk(text);
  if (chat && !more) return chat;

  const ability = has(text, ["ate", "aati", "aata", "ati", "banane", "bana", "jaanti", "janti", "seekhi", "sikhi", "know", "knows", "able"]);
  const known = findKnownSkill(text, skills.groups);
  if (known && (ability || !project)) {
    const levelLine =
      known.level === "core"
        ? "This is daily work for her."
        : known.level === "strong"
          ? "She has shipped real work with this."
          : "She has used this on a real project.";
    return reply(
      `Yes. Kulsoom can work with ${known.name}.\n\n${levelLine}`,
      [{ href: "/skills", label: "All skills" }, { href: "/projects", label: "See projects" }],
      ["See projects", "Full-stack languages"],
      "skills",
    );
  }
  const fact = /^(what|whats|explain|define|how does|how do)\b/.test(text) ? generalFact(text) : null;
  if (fact) return fact;

  if (more && topic.startsWith("project:") && !project) {
    return projectReply(topic.slice("project:".length), true);
  }

  if (more && topic === "projects") {
    return reply("Which project should I explain: the salon bot, the clinic app, or OmniTrader?", [{ href: "/projects", label: "All projects" }], ["Salon bot", "Clinic app", "OmniTrader"], "projects");
  }

  if (more && topic === "experience") return projectReply("omnitrader", false);

  if (more && topic === "skills") {
    return reply("The skills page lists every tool. Core means she uses it every day. Strong means she has shipped with it.", [{ href: "/skills", label: "All skills" }], ["See projects", "Contact her"], "skills");
  }

  if (project && !has(text, ["all project", "see project", "show project", "projects"])) {
    return projectReply(project.slug, more && topic === `project:${project.slug}`);
  }

  if ((text === "1" || has(text, ["first"])) && topic === "projects") return projectReply("calix", false);
  if ((text === "2" || has(text, ["second"])) && topic === "projects") return projectReply("jobmatch-ai", false);
  if ((text === "3" || has(text, ["third"])) && topic === "projects") return projectReply("whatsapp-mcp", false);

  if (has(text, ["service", "services", "order", "orders", "kaam", "client"])) {
    return reply(
      "Yes. AI & Full Stack Studio is led by Kulsoom. She takes orders for AI agents and MCP servers, WhatsApp bots, document assistants, full-stack websites, APIs, Android, Figma screens, Mendix tools, and LLM checks.\n\nOpen Services, pick one, and send the order form. Fast reply available 24/7, with the scope.",
      [
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Send an order" },
      ],
      ["WhatsApp bot", "See projects"],
      "services",
    );
  }

  if (has(text, ["contact", "email", "hire", "reach", "freelance", "available", "linkedin", "github"])) {
    return reply(
      `${profile.fullName.split(" ")[0]} is open to remote jobs and some freelance work.\n\nSend a note on the contact page. Fast reply available 24/7. GitHub and LinkedIn are here too.`,
      [
        { href: "/contact", label: "Contact" },
        { href: "/projects", label: "Projects" },
        { href: "/contact", label: "Contact" },
      ],
      ["See projects"],
      "contact",
    );
  }

  if (has(text, ["cv", "resume"])) {
    return reply("Her CV is a PDF. You can download it here.", [{ href: site.cvPath, label: "Download CV", external: true }], ["See projects", "Contact her"], "cv");
  }

  const asksSpoken = has(text, ["speak", "spoken", "boli", "mother tongue"]);
  const asksCode = has(text, ["full stack", "fullstack", "programming", "coding", "frontend", "backend", "framework", "language", "languages", "konse", "konsi", "python", "typescript", "javascript"]);
  const asksAi = has(text, ["ai", "ml", "llm", "agent", "agents", "machine learning", "deep learning", "nlp", "model"]);

  if (asksAi && (asksCode || has(text, ["skill", "skills", "tool", "tools"]))) {
    const aiNames = new Set(
      skills.groups.filter((group) => group.id === "agents-llms" || group.id === "ml-cv").flatMap((group) => group.items.map((item) => item.name)),
    );
    const tools = ["LangChain", "LangGraph", "LlamaIndex", "OpenAI API", "Hugging Face", "Ollama", "PyTorch", "TensorFlow", "Scikit-learn", "Transformers"].filter((name) => aiNames.has(name));
    return reply(
      `For AI work, Kulsoom writes in Python. She also uses TypeScript and JavaScript when the agent needs a website or an API.\n\nAI tools she uses:\n\n• ${tools.join("\n• ")}`,
      [{ href: "/skills", label: "All skills" }],
      ["See projects", "Full-stack languages"],
      "skills",
    );
  }

  if (asksSpoken && !has(text, ["full stack", "fullstack", "programming", "coding", "frontend", "backend"])) {
    return reply(`Kulsoom speaks ${skills.spokenLanguages.join(", ")}.`, [{ href: "/skills", label: "All skills" }], ["Full-stack languages", "See projects"], "skills");
  }

  if (asksCode) {
    const stack = skills.groups.find((group) => group.id === "stack");
    const delivery = skills.groups.find((group) => group.id === "delivery");
    const names = new Set([...(stack?.items ?? []), ...(delivery?.items ?? [])].map((item) => item.name));
    const languages = ["Python", "TypeScript", "JavaScript", "C# / ASP.NET Core", "Java / Spring Boot"].filter((name) => names.has(name));
    const screens = ["React", "Next.js", "Angular"].filter((name) => names.has(name));
    const servers = ["FastAPI", "Node.js"].filter((name) => names.has(name));
    const data = ["PostgreSQL", "SQL Server", "MySQL"].filter((name) => names.has(name));
    const join = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`);
    return reply(
      `For full-stack work, Kulsoom writes in:\n\n• ${languages.join("\n• ")}\n\nShe builds screens with ${join(screens)}. On the server she uses ${join(servers)}. For data she uses ${join(data)}.`,
      [{ href: "/skills", label: "All skills" }],
      ["Her skills", "See projects"],
      "skills",
    );
  }

  if (has(text, ["skill", "skills", "stack", "tool"])) {
    const daily = skills.groups
      .flatMap((group) => group.items)
      .filter((item) => item.level === "core")
      .slice(0, 6)
      .map((item) => item.name)
      .join(", ");
    return reply(
      `Every day she uses ${daily}.\n\nShe also builds WhatsApp bots and checks AI answers with real tests. She speaks ${skills.spokenLanguages.join(", ")}.\n\nWant the full skill list?`,
      [{ href: "/skills", label: "All skills" }],
      ["See projects", "Contact her"],
      "skills",
    );
  }

  if (has(text, ["experience", "job", "jobs", "role", "career", "company"])) {
    const lines = roles
      .map((role) => `• ${role.role.split("/")[0].trim()} at ${role.company.split("—")[0].trim()} (${role.startDate}–now)`)
      .join("\n");
    return reply(
      `She has three paths:\n\n${lines}\n\nThe OmniTrader numbers are practice trades, not real profit.\n\nThe jobs page is hidden for now. You can download her CV or send a note.`,
      [
        { href: site.cvPath, label: "Download CV", external: true },
        { href: "/contact", label: "Contact" },
      ],
      ["OmniTrader", "Her skills", "Contact her"],
      "experience",
    );
  }

  if (has(text, ["education", "degree", "university", "certificate", "school", "study"])) {
    const study = degrees.map((degree) => `• ${degree.credential}, ${degree.institution}`).join("\n");
    return reply(
      `${study}\n\nShe also has ${certifications.length} certificates, from Anthropic, micro1, Microsoft, and others.`,
      [{ href: "/about", label: "About her" }],
      ["Her skills", "See projects"],
      "education",
    );
  }

  if (has(text, ["project", "projects", "portfolio", "built", "build"])) {
    if (topic === "projects") {
      return reply("The list is just above. Which one should I explain: the salon bot, the clinic app, or OmniTrader?", [{ href: "/projects", label: "All projects" }], ["Salon bot", "Clinic app", "OmniTrader"], "projects");
    }
    return projectList();
  }

  if (has(text, ["who", "about", "hello", "hi", "hey"])) {
    const askedBefore = history.some((turn) => turn.role === "user" && has(turn.text.toLowerCase(), ["who", "about", "hello", "hi"]));
    return reply(
      askedBefore
        ? "I am still here. Do you want projects, skills, jobs, or her contact details?"
        : `Hi. I am Kulsoom's site assistant.\n\nShe builds AI agents, chat tools, and websites. She works remotely from ${profile.location}.\n\nWhat do you want to know?`,
      [{ href: "/about", label: "About her" }],
      nextSteps,
      "about",
    );
  }

  if (more) return reply("Tell me which part you want: a project, her skills, her jobs, or how to contact her.", [], nextSteps, topic || "fallback");

  const looseFact = generalFact(text);
  if (looseFact) return looseFact;

  if (ability) {
    return reply(
      "That one is not on her skill list.\n\nYes for the work she does: she builds agents, and she writes Python, TypeScript, and JavaScript.",
      [{ href: "/skills", label: "All skills" }],
      ["Full-stack languages", "See projects"],
      "skills",
    );
  }

  return reply(
    "I can explain simple ideas like AI, MCP, and RAG, and I know Kulsoom's projects, skills, jobs, and contact details. What should we look at?",
    [],
    ["What is AI?", "See projects", "Contact her"],
    "fallback",
  );
}
