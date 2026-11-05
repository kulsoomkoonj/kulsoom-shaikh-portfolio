# Plan — Humera.dev

Build a **new** professional site in this repo. Do not restyle the old Vercel galaxy theme.

## Goal

A hiring manager should know in 10 seconds: Humera builds **agentic AI, MCP, and full-stack products**, remotely from Pakistan, and can be emailed.

## Phases (your 10 steps)

| # | Step | Status |
| --- | --- | --- |
| 1 | Plan | This file |
| 2 | Theme | `docs/03-theme.md` |
| 3 | Functional spec | `docs/04-functional-spec.md` |
| 4 | Workflows | `docs/05-workflows.md` |
| 5 | Develop pages | In progress |
| 6 | Improvements | After first visual pass |
| 7 | Git upload | Only when you ask (no token in git) |
| 8 | Agents developing | After core pages exist |
| 9 | Remaining / market gaps | After v1 |
| 10 | Domain deploy | Vercel + custom domain later |

## Information architecture

- `/` — hero, selected work, selected skills, latest role, contact strip
- `/about` — story, languages, way of working
- `/work` + `/work/[slug]` — case studies
- `/skills` — five groups from `content/skills.json`
- `/experience` — jobs, education, certs
- `/contact` — email, LinkedIn, GitHub, form

## Content rules

- JSON in `content/` is the source of truth (easy to edit).
- Phone stays off the public site unless you later say yes.
- OmniTrader numbers always say **simulated / paper**, never live profit.
- Private GitHub repos: show name + story, no “View source” unless public.

## Stack

Next.js App Router, TypeScript, Tailwind, Geist, static-first. GitHub MCP is for **authoring**, not for visitor requests.
