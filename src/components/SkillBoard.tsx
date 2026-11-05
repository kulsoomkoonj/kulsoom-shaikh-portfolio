"use client";

import { useState } from "react";

type Item = { name: string; level: string };
type Group = { id: string; title: string; blurb: string; items: Item[] };

const labels: Record<string, string> = { core: "Core", strong: "Strong", working: "Working" };

export function SkillBoard({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const current = groups.find((group) => group.id === active) ?? groups[0];

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-4" role="tablist">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`btn rounded-pill ${group.id === current?.id ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setActive(group.id)}
          >
            {group.title}
          </button>
        ))}
      </div>
      {current ? (
        <div className="card border-0 shadow-sm lift">
          <div className="card-body p-4">
            <h3 className="h4">{current.title}</h3>
            <p className="text-secondary">{current.blurb}</p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {current.items.map((item) => (
                <span key={item.name} className="chip">
                  {item.name}
                  <small>{labels[item.level] ?? item.level}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
