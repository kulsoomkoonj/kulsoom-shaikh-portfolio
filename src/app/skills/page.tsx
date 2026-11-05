import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { SkillCards } from "@/components/SkillCards";
import { getSkills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skill cards for agents, MCP, ML, and full-stack delivery.",
};

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <div className="container py-5">
      <BackLink href="/" label="Back to Home" />
      <p className="kicker">Skills</p>
      <h1 className="h-display display-6 mb-2">Skills & Expertise</h1>
      <p className="text-secondary mb-3 col-lg-8">Open a card to see every technology in that group.</p>
      <ul className="skill-legend">
        <li>
          <span className="legend-dot level-core" />
          Core is daily work
        </li>
        <li>
          <span className="legend-dot level-strong" />
          Strong is shipped
        </li>
        <li>
          <span className="legend-dot level-working" />
          Working is used on a real project
        </li>
      </ul>
      <SkillCards groups={skills.groups} />
    </div>
  );
}
