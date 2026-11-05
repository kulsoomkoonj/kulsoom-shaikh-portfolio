# Kulsoom Shaikh — Portfolio (Next.js 15)

A Vercel-deployable version of the supplied Next.js starter, personalized with Kulsoom Shaikh’s name and a fresh KS monogram.

## Deploy to Vercel
1. Extract this zip and upload the entire `Kulsoom-Shaikh-Portfolio` folder to a **new GitHub repository** (not the zip alone).
2. In https://vercel.com/new select **Import Git Repository**, choose the repo, set Framework Preset **Next.js**, and Deploy.
3. Under **Settings > Environment Variables**, add `NEXT_PUBLIC_CONTACT_EMAIL` with Kulsoom's REAL email, and `NEXT_PUBLIC_SITE_URL` with the actual Vercel URL; redeploy.
4. The contact form opens the visitor's own email app: it does **not** send mail from Vercel. For direct website delivery, connect an email service.
5. Edit `content/profile.json`, `content/work.json`, `content/skills.json`, `content/education.json` and `content/services.json` with **Kulsoom’s verified** achievements and projects. The project cards are explicitly labeled as illustrative template examples; don't publish them as real work.
6. Add Kulsoom's own CV to `public/Kulsoom-Shaikh-CV.pdf`, then restore the CV button using `site.cvPath` in the relevant pages if desired. The original Humera CV/certificates, social handles, reviews and personal logo have NOT been copied.
7. Optional: update `src/app/api/agent` / `src/lib/agent*` copy to reflect only verified projects and actual links.

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Important
This is a **personalized starter**, not a fully verified factual biography. No deployment has been performed from this environment; deploy through Vercel using your own account. Set your own email and project URL before publicly sharing.
