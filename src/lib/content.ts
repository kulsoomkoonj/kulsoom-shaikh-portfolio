
import education from "../../content/education.json";
import experience from "../../content/experience.json";
import profile from "../../content/profile.json";
import services from "../../content/services.json";
import site from "../../content/site.json";
import skills from "../../content/skills.json";
import work from "../../content/work.json";

import type { Review } from "../components/ReviewCard";

// ============================================
// TypeScript Data Types
// ============================================

export type WorkItem = (typeof work.items)[number];

export type ProfileLink = {
  label: string;
  href: string;
  handle?: string;
};

export type DeliveryStat = {
  value: string;
  label: string;
  note: string;
};

export type EducationDegree = {
  id?: string;
  credential: string;
  institution: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  badges?: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  href: string | null;
  image?: string;
};

export type ExperienceRole = {
  id?: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  highlights: string[];
  stack?: string[];
};

// ============================================
// Site
// ============================================

export function getSite() {
  return site;
}

// ============================================
// Profile
// ============================================

export function getProfile() {
  return {
    ...profile,
    links: profile.links as ProfileLink[],
  };
}

// ============================================
// Skills
// ============================================

export function getSkills() {
  return skills;
}

// ============================================
// Experience
// ============================================

export function getExperience() {
  return {
    ...experience,
    roles: experience.roles as ExperienceRole[],
  };
}

// ============================================
// Education
// ============================================

export function getEducation() {
  return {
    ...education,
    degrees: education.degrees as EducationDegree[],
    certifications: education.certifications as Certification[],
  };
}

// ============================================
// Projects
// ============================================

export function getWork(): WorkItem[] {
  return work.items;
}

export function getFeaturedWork(): WorkItem[] {
  return work.items.filter((item) => item.featured);
}

export function getWorkBySlug(
  slug: string
): WorkItem | null {
  return (
    work.items.find((item) => item.slug === slug) ?? null
  );
}

// ============================================
// Services
// ============================================

export function getServices() {
  return {
    ...services,
    reviews: services.reviews as Review[],
    stats: services.stats as DeliveryStat[],
  };
}

export function getServiceById(id: string | undefined) {
  if (!id) {
    return null;
  }

  return (
    services.items.find((item) => item.id === id) ?? null
  );
}
