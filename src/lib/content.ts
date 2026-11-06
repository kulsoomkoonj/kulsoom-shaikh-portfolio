
import education from "../../content/education.json";
import experience from "../../content/experience.json";
import profile from "../../content/profile.json";
import services from "../../content/services.json";
import site from "../../content/site.json";
import skills from "../../content/skills.json";
import work from "../../content/work.json";

import type { Review } from "../components/ReviewCard";

export type WorkItem = (typeof work.items)[number];

type ProfileLink = {
  label: string;
  href: string;
  handle?: string;
};

type DeliveryStat = {
  value: string;
  label: string;
  note: string;
};

type EducationDegree = {
  current?: boolean;
  [key: string]: unknown;
};

type Certification = {
  title: string;
  issuer: string;
  href: string | null;
  image?: string;
};

export function getSite() {
  return site;
}

export function getProfile() {
  return {
    ...profile,
    links: profile.links as ProfileLink[],
  };
}

export function getSkills() {
  return skills;
}

export function getExperience() {
  return {
    ...experience,
    roles: experience.roles as Record<string, unknown>[],
  };
}

export function getEducation() {
  return {
    ...education,
    degrees: education.degrees as EducationDegree[],
    certifications: education.certifications as Certification[],
  };
}

export function getWork() {
  return work.items;
}

export function getFeaturedWork() {
  return work.items.filter((item) => item.featured);
}

export function getWorkBySlug(slug: string) {
  return work.items.find((item) => item.slug === slug) ?? null;
}

export function getServices() {
  return {
    ...services,
    reviews: services.reviews as Review[],
    stats: services.stats as DeliveryStat[],
  };
}

export function getServiceById(id: string | undefined) {
  if (!id) return null;
  return services.items.find((item) => item.id === id) ?? null;
}
