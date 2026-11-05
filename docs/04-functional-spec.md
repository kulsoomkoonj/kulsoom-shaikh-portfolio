# Functional spec (plain language)

This is what the website **does**. No jargon required.

## Anyone visiting

1. Lands on Home and sees your name, role, and three buttons: Work, Contact, CV.
2. Can open About, Work, Skills, Experience, Contact from the top menu on every page (no 404).
3. Can read 5–7 selected projects. Clicking a project opens a longer page: problem, what you built, tools, result, limits.
4. Can scan skills in groups (Agents/MCP, Voice, ML, Programming, Delivery).
5. Can read jobs, Sukkur IBA degrees, and certifications.
6. Can email you or open LinkedIn / GitHub.
7. Can download the CV PDF.
8. Site works on a phone. Keyboard users can Tab through links. Screen readers hear real headings.

## What the site does *not* do (v1)

- It does not log people in.
- It does not show a floating AI chat.
- It does not pull private GitHub code live in the browser.
- It does not claim live trading profit.

## Contact form (v1)

Visitor types name, email, message. Submit opens their mail app (`mailto`) with the text filled in. Later we can switch to a server inbox without changing the page layout.

## You (editing)

Change words in `content/*.json`. Rebuild. No database.
