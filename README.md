# Tomer Epshtein — Portfolio

Personal portfolio site positioning Tomer as a product builder / creative
technologist. Built with Vite + React, plain CSS, and `react-router-dom`.

The repo is part of the pitch — the code is meant to read clean as a work
sample.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the build locally
```

## Structure

```
src/
  components/   Nav, Hero, Work, ProjectCard, FrameStrip, About, Skills, Contact
                (each with a co-located .css file)
  pages/        Home, CaseStudy (template, route /work/:slug)
  data/         projects.js — project + case-study content in one place
  assets/       screenshots, CV.pdf (to be added)
  App.jsx       routes
  main.jsx      entry + <BrowserRouter>
  index.css     design tokens (palette, type) + global styles
```

## Design notes

- **Signature motif:** the `FrameStrip` component — a colorist's contact-sheet /
  film-frame strip that recurs through the page (hero, card bands, dividers).
- **Palette:** near-monochrome paper (`--paper #fbfbfd`, `--ink #13131a`) with a
  single indigo accent (`--accent #4f46e5`). Defined as CSS variables in
  `src/index.css`.
- **Type:** Inter (display + body), Space Mono (labels, captions, data).

## Content still to wire in

- Case studies (`src/data/projects.js`) have placeholder section copy for
  Sakemly and Stents: Problem / What I built / What I cut & why / What broke /
  Where it stands.
- Card preview bands are gradient placeholders — swap in real screenshots.
- Drop the CV at `public/cv.pdf` and point `CV_URL` in `Nav.jsx` at it.
- Replace the LinkedIn placeholder in `Contact.jsx`.

## Deploy

Configured for Vercel (`vercel.json` rewrites all routes to `index.html` so
client-side routes resolve on direct load). Connect the GitHub repo to Vercel
for auto-deploy on push.
