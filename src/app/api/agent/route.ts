import { answerPortfolio, type AgentTurn } from "@/lib/agent";
import { askModel } from "@/lib/agent-model";

const hits = new Map<string, number[]>();

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 24) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function POST(request: Request) {
  let payload: { message?: unknown; topic?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Send a short question." }, { status: 400 });
  }

  const message = String(payload.message ?? "").trim().slice(0, 500);
  if (message.length < 2 && !["1", "2", "3"].includes(message)) {
    return Response.json({ error: "Ask a short question about the portfolio." }, { status: 400 });
  }

  const history = Array.isArray(payload.history)
    ? payload.history
        .slice(-8)
        .map((turn) => {
          const item = turn as Partial<AgentTurn>;
          return {
            role: item.role === "assistant" ? "assistant" : "user",
            text: String(item.text ?? "").slice(0, 500),
          } satisfies AgentTurn;
        })
        .filter((turn) => turn.text)
    : [];

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) {
    return Response.json({
      text: "I need a short pause. Ask me again in a minute.",
      links: [],
      suggestions: ["See projects", "Contact her"],
      topic: "chat",
    });
  }

  const modeled = await askModel(message, history);
  return Response.json(modeled ?? answerPortfolio(message, history, String(payload.topic ?? "")));
}
