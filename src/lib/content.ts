/**
 * Typed loaders for version-controlled JSON. Pages stay dumb; copy lives in /content.
 */
/* Relative imports (not @content) keep JSON HMR stable under Next/Turbopack. */
import education from "../../content/education.json";
import experience from "../../content/experience.json";
import profile from "../../content/profile.json";
import services from "../../content/services.json";
import site from "../../content/site.json";
import skills from "../../content/skills.json";
import work from "../../content/work.json";

export type WorkItem = (typeof work.items)[number];

export function getSite() {
  return site;
}

export function getProfile() {
  return profile;
}

export function getSkills() {
  return skills;
}

export function getExperience() {
  return experience;
}

export function getEducation() {
  return education;
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
  return services;
}

export function getServiceById(id: string | undefined) {
  if (!id) return null;
  return services.items.find((item) => item.id === id) ?? null;
}
