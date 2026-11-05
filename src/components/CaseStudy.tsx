import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { Glyph, ProjectGlyph } from "@/components/Glyph";
import type { WorkItem } from "@/lib/content";

const stories = [
  { key: "problem", title: "Problem", icon: "target", tone: "amber" },
  { key: "evidence", title: "Evidence", icon: "chart", tone: "green" },
  { key: "limits", title: "Limits", icon: "shield", tone: "rose" },
] as const;

function storyText(item: WorkItem, key: (typeof stories)[number]["key"]) {
  if (key === "problem") return item.problem;
  if (key === "evidence") return item.outcome;
  return item.limits;
}

function stepIcon(line: string) {
  const text = line.toLowerCase();
  if (text.includes("bleu") || text.includes("eval") || text.includes("metric")) return "chart";
  if (text.includes("transform") || text.includes("model") || text.includes("attention")) return "ml";
  if (text.includes("retriev") || text.includes("vector") || text.includes("sql") || text.includes("tool")) return "mcp";
  if (text.includes("role") || text.includes("clinic") || text.includes("patient")) return "clinical";
  if (text.includes("chat") || text.includes("whatsapp") || text.includes("voice")) return "chat";
  if (text.includes("agent")) return "agents";
  return "layers";
}

function toolIcon(name: string) {
  const text = name.toLowerCase();
  if (text.includes("bleu") || text.includes("eval") || text.includes("metric")) return "chart";
  if (text.includes("torch") || text.includes("transform") || text.includes("langchain") || text.includes("rag") || text.includes("ml"))
    return "ml";
  if (text.includes("mcp") || text.includes("sql") || text.includes("s3") || text.includes("postgres") || text.includes("chroma") || text.includes("fast"))
    return "mcp";
  if (text.includes("whatsapp") || text.includes("llm")) return "chat";
  if (text.includes("agent")) return "agents";
  if (text.includes("react") || text.includes(".net") || text.includes("jwt")) return "clinical";
  return "code";
}

export function CaseStudy({
  item,
  previous,
  next,
}: {
  item: WorkItem;
  previous: WorkItem;
  next: WorkItem;
}) {
  return (
    <div className="container py-4 py-lg-5">
      <BackLink href="/projects" label="Back to Projects" />

      <header className={`case-hero cat-${item.category.toLowerCase()}`}>
        <span className="case-orb case-orb-a" />
        <span className="case-orb case-orb-b" />
        <div className="case-hero-icon float-icon">
          <ProjectGlyph slug={item.slug} />
        </div>
        <div className="case-hero-copy">
          <p className="kicker mb-2">{item.category} · Case study</p>
          <h1 className="h-display display-5 mb-2">{item.name}</h1>
          <p className="lede mb-3">{item.tagline}</p>
          <div className="d-flex flex-wrap gap-2">
            <span className={`status-pill status-${item.status}`}>{item.status}</span>
            <span className="status-pill">{item.visibility}</span>
          </div>
        </div>
      </header>

      <section className="row g-3 mb-4">
        {stories.map((story, index) => (
          <div className="col-md-4" key={story.key}>
            <article className={`story-tile tone-${story.tone} h-100`} style={{ animationDelay: `${0.08 + index * 0.1}s` }}>
              <span className="icon-bubble">
                <Glyph name={story.icon} />
              </span>
              <h2 className="h6 mt-3 mb-2">{story.title}</h2>
              <p className="mb-0">{storyText(item, story.key)}</p>
            </article>
          </div>
        ))}
      </section>

      <section className="case-panel mb-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <span className="icon-bubble">
            <Glyph name="layers" />
          </span>
          <div>
            <p className="kicker mb-1">How it is built</p>
            <h2 className="h4 mb-0">Architecture</h2>
          </div>
        </div>
        <ol className="arch-flow">
          {item.architecture.map((line, index) => (
            <li key={line} className="arch-step" style={{ animationDelay: `${0.15 + index * 0.12}s` }}>
              <span className="arch-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="icon-bubble">
                <Glyph name={stepIcon(line)} />
              </span>
              <p className="mb-0 fw-medium">{line}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-4">
        <p className="kicker">Stack</p>
        <h2 className="h4 h-display mb-3">Tools on this project</h2>
        <div className="tool-grid">
          {item.tools.map((tool, index) => (
            <article key={tool} className="tool-tile" style={{ animationDelay: `${index * 0.08}s` }}>
              <span className="icon-bubble">
                <Glyph name={toolIcon(tool)} />
              </span>
              <span className="fw-semibold">{tool}</span>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="kicker">Keep going</p>
        <h2 className="h4 h-display mb-3">More projects</h2>
        <div className="row g-3">
          {[
            ["Previous", previous],
            ["Next", next],
          ].map(([label, project]) => {
            const card = project as WorkItem;
            return (
              <div className="col-md-6" key={label as string}>
                <Link href={`/projects/${card.slug}`} className="text-decoration-none text-reset">
                  <article className="neighbor-card lift">
                    <span className="small text-secondary">{label as string}</span>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <span className="icon-bubble">
                        <ProjectGlyph slug={card.slug} />
                      </span>
                      <div>
                        <h3 className="h6 mb-1">{card.name}</h3>
                        <p className="small mb-0 text-secondary">{card.category}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
