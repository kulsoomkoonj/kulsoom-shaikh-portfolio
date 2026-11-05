"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  visibility: string;
  tools: string[];
};

const filters = ["all", "live", "pilot", "archived"] as const;

export function WorkBoard({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const shown = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.status === filter)),
    [filter, items],
  );

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            className={`btn btn-sm rounded-pill filter-btn ${filter === key ? "active" : "btn-outline-secondary"}`}
            onClick={() => setFilter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="row g-3">
        {shown.map((item) => (
          <div className="col-md-6" key={item.slug}>
            <Link href={`/work/${item.slug}`} className="text-decoration-none text-reset">
              <article className="card h-100 lift border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between gap-2 mb-2">
                    <span className="badge text-bg-light text-uppercase">{item.status}</span>
                    <span className="small text-secondary">{item.visibility}</span>
                  </div>
                  <h3 className="h5">{item.name}</h3>
                  <p className="text-secondary mb-3">{item.tagline}</p>
                  <div className="d-flex flex-wrap gap-1">
                    {item.tools.slice(0, 4).map((tool) => (
                      <span key={tool} className="badge rounded-pill text-bg-light">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
      {shown.length === 0 ? <p className="text-secondary">Nothing in this filter yet.</p> : null}
    </div>
  );
}
