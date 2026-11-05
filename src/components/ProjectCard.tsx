import Link from "next/link";
import { ProjectGlyph } from "@/components/Glyph";

export type ProjectCardData = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  problem: string;
  status: string;
  tools: string[];
};

export function ProjectCard({ item }: { item: ProjectCardData }) {
  return (
    <Link href={`/projects/${item.slug}`} className="text-decoration-none text-reset d-block h-100">
      <article className={`card project-card h-100 border-0 shadow-sm lift cat-${item.category.toLowerCase()}`}>
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className="icon-bubble">
              <ProjectGlyph slug={item.slug} />
            </span>
            <span className={`status-pill status-${item.status}`}>{item.status}</span>
          </div>
          <p className="kicker mb-2">{item.category}</p>
          <h3 className="h5 mb-1">{item.name}</h3>
          <p className="fw-medium mb-2">{item.tagline}</p>
          <p className="text-secondary small flex-grow-1">{item.problem}</p>
          <div className="d-flex flex-wrap gap-1 mb-3">
            {item.tools.slice(0, 4).map((tool) => (
              <span key={tool} className="badge rounded-pill text-bg-light border">
                {tool}
              </span>
            ))}
          </div>
          <span className="view-case">View case study →</span>
        </div>
      </article>
    </Link>
  );
}
