import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { LanguageReel } from "@/components/LanguageReel";
import { Logo } from "@/components/Logo";
import { getEducation, getProfile, getSite, getSkills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "AI & Full Stack Studio led by Kulsoom Shaikh. Agentic AI systems and full-stack products in Python, TypeScript, React, and Angular.",
};

export default function AboutPage() {
  const profile = getProfile();
  const site = getSite();
  const spoken = getSkills().spokenLanguages;
  const study = getEducation().degrees.find((degree) => degree.current);

  return (
    <div className="container py-4 py-lg-5">
      <BackLink href="/" label="Back to Home" />
      <p className="kicker">About</p>
      <div className="row g-4 align-items-stretch">
        <div className="col-lg-4">
          <div className="hero-panel about-identity p-4 text-center h-100">
            <Logo compact />
            <h1 className="h-display h2 mt-3 mb-2">{profile.fullName}</h1>
            <p className="studio-lead mb-2">{site.studioLead}</p>
            <p className="text-secondary mb-2">{site.studioLabel}</p>
            <p className="text-secondary mb-3">{profile.location}</p>
            <p className="footer-availability mb-0">{site.availabilityLabel}</p>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="about-copy h-100">
            <p className="lede mb-3">I’m Kulsoom Shaikh. Welcome to my developer portfolio, currently being personalized with my own work and experience.</p>
            <p className="text-secondary mb-0">Explore the project examples to see the kind of work this portfolio can showcase. My verified projects, education and contact details will be added here.</p>
          </div>
        </div>
      </div>

      <section className="about-practice row g-3 my-4">
        {[
          ["Agents", "MCP servers, tool use, and RAG pipelines for workflows that have to be checked."],
          ["Product", "WhatsApp bots, clinic prototypes, and API-driven web apps shipped with an operator in the loop."],
          ["Engineering", "Requirements written down, tests on the path, and a record when an agent is allowed to act."],
        ].map(([title, copy]) => (
          <div className="col-md-4" key={title}>
            <article className="stat-card p-4 h-100">
              <h2 className="h5 h-display mb-2">{title}</h2>
              <p className="text-secondary mb-0">{copy}</p>
            </article>
          </div>
        ))}
      </section>

      <section className="py-2">
        <p className="kicker">Stack</p>
        <h2 className="h-display h3 mb-3">Languages I ship with</h2>
        <LanguageReel />
      </section>

      <div className="d-flex flex-wrap gap-2 mt-4">
        {profile.specialties.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2 mt-4">
        <Link href="/projects" className="btn btn-primary rounded-pill">
          View projects
        </Link>
        <Link href="/contact" className="btn btn-outline-dark rounded-pill">
          Contact
        </Link>
      </div>
    </div>
  );
}
