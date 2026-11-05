/**
 * Canonical data contracts for the Kulsoom Shaikh portfolio.
 * Runtime adapters (GitHub REST, LinkedIn DMA, local JSON) must map into these types.
 */

export type IsoDate = string;
export type IsoDateTime = string;

export type DataOrigin = "github" | "linkedin" | "manual" | "cache" | "derived";

export interface SourceMeta {
  origin: DataOrigin;
  fetchedAt: IsoDateTime;
  ttlSeconds: number;
  stale: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface Profile {
  fullName: string;
  headline: string;
  location: string;
  availability: "open" | "selective" | "unavailable";
  summary: string;
  specialties: string[];
  links: SocialLink[];
  source: SourceMeta;
}

export interface LanguageShare {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GitHubRepoCard {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  primaryLanguage: string | null;
  languages: LanguageShare[];
  topics: string[];
  pushedAt: IsoDateTime;
  createdAt: IsoDateTime;
  isPinned: boolean;
  isPrivate: boolean;
  source: SourceMeta;
}

export interface GitHubActivityPoint {
  date: IsoDate;
  contributions: number;
}

export interface GitHubLiveMetrics {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  recentCommits7d: number;
  contributionSeries: GitHubActivityPoint[];
  pinnedRepos: GitHubRepoCard[];
  source: SourceMeta;
}

export type AgentStatus = "live" | "pilot" | "archived";

export interface AgentMetric {
  label: string;
  value: number;
  unit: string;
  description?: string;
}

export interface AgentSystem {
  slug: string;
  name: string;
  status: AgentStatus;
  tagline: string;
  problem: string;
  architecture: string[];
  tools: string[];
  models: string[];
  metrics: AgentMetric[];
  repoFullName?: string;
  demoUrl?: string;
  source: SourceMeta;
}

export interface Recommendation {
  recommenderName: string;
  recommenderTitle: string;
  relationship: string;
  quote: string;
  verified: boolean;
}

export interface ExperienceRecord {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: IsoDate;
  endDate: IsoDate | null;
  current: boolean;
  highlights: string[];
  stack: string[];
  recommendations: Recommendation[];
  source: SourceMeta;
}

export interface EducationRecord {
  id: string;
  institution: string;
  credential: string;
  field?: string;
  startDate?: IsoDate;
  endDate?: IsoDate;
  badges: string[];
  source: SourceMeta;
}

export type SkillLevel = "core" | "strong" | "working";

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  items: SkillItem[];
}

export interface SkillsSnapshot {
  groups: SkillGroup[];
  spokenLanguages: string[];
  source: SourceMeta;
}

export interface PortfolioSnapshot {
  profile: Profile;
  github: GitHubLiveMetrics;
  agents: AgentSystem[];
  experience: ExperienceRecord[];
  education: EducationRecord[];
  skills: SkillsSnapshot;
  generatedAt: IsoDateTime;
}

export const CACHE_TTL = {
  github: 3600,
  linkedin: 86_400,
  manual: 0,
} as const;
