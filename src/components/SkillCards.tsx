"use client";

import { useState } from "react";
import { SkillGlyph } from "@/components/Glyph";

type Item = { name: string; level: string };
type Group = { id: string; title: string; blurb: string; items: Item[] };

const labels: Record<string, string> = { core: "Core", strong: "Strong", working: "Working" };

export function SkillCards({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="skill-stack">
      {groups.map((group, index) => {
        const expanded = open === group.id;
        const preview = group.items.slice(0, 3);
        const shown = expanded ? group.items : preview;
        const more = group.items.length - preview.length;
        const toggle = () => setOpen(expanded ? null : group.id);

        return (
          <article key={group.id} className={`expand-card ${expanded ? "is-open" : ""}`}>
            <button type="button" className="expand-card-hit" aria-expanded={expanded} onClick={toggle}>
              <span className="expand-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="icon-bubble expand-icon">
                <SkillGlyph id={group.id} />
              </span>
              <span className="expand-card-copy">
                <span className="expand-title-row">
                  <h2 className="h5 mb-0">{group.title}</h2>
                  <span className="expand-count">{group.items.length}</span>
                </span>
                <span className="expand-blurb">{group.blurb}</span>
              </span>
              <span className={`expand-chevron ${expanded ? "is-open" : ""}`} aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <ul className="expand-list" onClick={toggle}>
              {shown.map((item) => (
                <li key={item.name} className={`skill-chip level-${item.level}`}>
                  <span>{item.name}</span>
                  {expanded ? <small className={`skill-level level-${item.level}`}>{labels[item.level] ?? item.level}</small> : null}
                </li>
              ))}
              {!expanded && more > 0 ? <li className="expand-more">+{more} more</li> : null}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
