"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";

export function ProjectBoard({ items }: { items: ProjectCardData[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [active, setActive] = useState("All");
  const shown = useMemo(
    () => (active === "All" ? items : items.filter((item) => item.category === active)),
    [active, items],
  );

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm rounded-pill ${active === category ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="row g-4 stagger">
        {shown.map((item) => (
          <div className="col-md-6 col-xl-4" key={item.slug}>
            <ProjectCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
