/** Small line icons for project and skill cards. */
export function Glyph({ name }: { name: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "agents") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c1.2-3 3.4-4.5 7-4.5S17.8 16 19 19" />
        <path d="M18 8h3M19.5 6.5v3" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg {...common}>
        <path d="M5 16.5V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9z" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    );
  }
  if (name === "mcp") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M12 10v4" />
      </svg>
    );
  }
  if (name === "clinical") {
    return (
      <svg {...common}>
        <path d="M12 4v16M4 12h16" />
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    );
  }
  if (name === "nlp") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h10M4 17h13" />
      </svg>
    );
  }
  if (name === "ml") {
    return (
      <svg {...common}>
        <circle cx="6" cy="16" r="2" />
        <circle cx="12" cy="8" r="2" />
        <circle cx="18" cy="14" r="2" />
        <path d="M7.6 14.4 10.4 9.6M13.6 9.4 16.4 12.6" />
      </svg>
    );
  }
  if (name === "code") {
    return (
      <svg {...common}>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
      </svg>
    );
  }
  if (name === "target") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 15v-4M12 15V8M16 15v-6" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg {...common}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    );
  }
  if (name === "pen") {
    return (
      <svg {...common}>
        <path d="M4 20h4l10-10-4-4L4 16z" />
        <path d="m13 7 4 4" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...common}>
        <path d="m12 3 8 4-8 4-8-4z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 18V6h16v12" />
      <path d="M8 18v2h8v-2" />
    </svg>
  );
}

const bySlug: Record<string, string> = {
  calix: "agents",
  "jobmatch-ai": "code",
  "glow-salon": "chat",
  "whatsapp-mcp": "mcp",
  "ai-cdss": "clinical",
  "agentic-rag": "nlp",
  omnitrader: "agents",
  clinnote: "clinical",
  seq2seq: "nlp",
};

const byGroup: Record<string, string> = {
  "agents-llms": "agents",
  "voice-messaging": "chat",
  "ml-cv": "ml",
  stack: "code",
  delivery: "code",
};

export function ProjectGlyph({ slug }: { slug: string }) {
  return <Glyph name={bySlug[slug] ?? "code"} />;
}

export function SkillGlyph({ id }: { id: string }) {
  return <Glyph name={byGroup[id] ?? "code"} />;
}
