import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { ProjectBoard } from "@/components/ProjectBoard";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project cards for agents, JobMatch AI, MCP, clinical AI, and NLP.",
};

export default function ProjectsPage() {
  return (
    <div className="container py-5">
      <BackLink href="/" label="Back to Home" />
      <p className="kicker">Projects</p>
      <h1 className="h-display display-6 mb-2">Selected projects</h1>
      <p className="text-secondary col-lg-8 mb-4">
        Filter by type. Open a card for the problem, architecture, and limits.
      </p>
      <ProjectBoard items={getWork()} />
    </div>
  );
}
