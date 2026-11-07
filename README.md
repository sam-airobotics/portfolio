# Sameer Patwardhan — Robotics & AI Portfolio

A multi-page static portfolio showcasing work and interests in automation, robotics, mechanical design, simulation, software, and AI.

🌐 **Live site:** https://sam-airobotics.github.io/portfolio/  
💻 **Repository:** https://github.com/sam-airobotics/portfolio

## 1. Website overview

Built with plain **HTML, CSS, and JavaScript**. There is no frontend framework, package manager, build step, or backend.

| Order | Page | File | Purpose |
|---:|---|---|---|
| 0 | Home | `index.html` | Landing page, introduction, circular navigation |
| 1 | About | `about.html` | Profile, interests, engineering approach |
| 2 | Experience | `experience.html` | Robotics teams, internship, IEEE roles |
| 3 | Skills | `skills.html` | Interactive 3D-style technology orbit |
| 4 | Projects | `projects.html` | Scroll-controlled 3D project helix |
| 5 | Resume | `resume.html` | Embedded PDF and download link |
| 6 | Contact | `contact.html` | Email and social links |

The page numbers are content labels, not part of the navigation labels.

## 2. Repository structure

```text
portfolio/
├── index.html
├── about.html
├── experience.html
├── skills.html
├── projects.html
├── resume.html
├── contact.html
├── resume-preview.html
├── github-stats.svg
├── css/
│   ├── style.css
│   ├── portfolio-fix.css
│   ├── home-orbit-nav.css
│   ├── top-circular-nav.css
│   ├── experience.css
│   ├── orbit-skills.css
│   └── raised-buttons.css
├── js/
│   ├── main.js
│   ├── script.js
│   ├── final-touch.js
│   ├── orbit-nav.js
│   ├── top-circular-nav.js
│   ├── orbit-skills.js
│   └── project-ring.js
└── assets/
    ├── docs/
    │   ├── Resume.pdf
    │   └── RESUME_SOURCE_NOT_BINARY.txt
    ├── images/
    │   ├── Cyberpunk.png
    │   ├── amr.png
    │   ├── black hole.png
    │   └── void.png
    └── videos/
        ├── Hero.mp4
        └── x.md
```

## 3. HTML pages

### `index.html` — Home
The GitHub Pages entry point. Displays the cyberpunk hero introduction and the homepage circular/fan navigation to the six inner pages. It loads `css/home-orbit-nav.css` and the homepage scripts `js/main.js`, `js/final-touch.js`, and `js/orbit-nav.js`. It also contains an inline script for text-scramble effects and optional hero-video scrubbing. The current markup does not contain an element with ID `heroVideo`, so the video-scrubbing branch is inactive.

### `about.html` — About
Shows the profile image, introduction, interests, and the Robotics & AI, Hardware + Software, and Design → Simulate → Validate focus cards. Includes page-specific responsive CSS inline in the HTML. Uses the shared inner-page navigation.

### `experience.html` — Experience
Shows a moving horizontal experience-card strip. Selecting a card opens a modal with the full role details. The role records are stored in the hidden `#expData` section; inline JavaScript duplicates the marquee cards and manages modal and keyboard interactions. Uses `css/experience.css`.

### `skills.html` — Skills
Renders the Engineering Stack globe with orbital planes, a central black-hole logo, and technology badges. `js/orbit-skills.js` generates the rings, badges, tooltips, and pointer interaction; `css/orbit-skills.css` styles the scene. Many technology icons are fetched from the Simple Icons CDN (`cdn.simpleicons.org`); badges without a usable icon use text abbreviations as fallbacks.

### `projects.html` — Projects
Displays projects in a scroll-controlled 3D helix. Its project data, page-specific CSS, and helix interaction logic are embedded directly in this HTML file. Scrolling changes the active project; the active project details, tags, category, and repository link update dynamically. Some project images are loaded from external GitHub repository URLs.

### `resume.html` — Resume
Embeds `assets/docs/Resume.pdf` in an iframe and links to the same file for opening/downloading.

### `contact.html` — Contact
Displays the contact introduction and Email, LinkedIn, Instagram, and GitHub links.

### `resume-preview.html` — Older standalone resume mock-up
A separate, older HTML resume layout. It is not linked from the main navigation and contains hard-coded resume content. Its PDF buttons refer to `assets/docs/Resume ROS(1).pdf`, which is absent from the current repository tree. The active resume page is `resume.html`.

## 4. CSS files

| File | Responsibility |
|---|---|
| `css/style.css` | Shared design foundation: typography, colors, backgrounds, layout primitives, hero styles, and reusable components. Also contains styles from earlier layouts. |
| `css/portfolio-fix.css` | Shared overrides and responsive refinements for the current page components. |
| `css/home-orbit-nav.css` | Homepage hero and circular/fan navigation appearance. |
| `css/top-circular-nav.css` | Black-hole trigger and fan navigation used on the six inner pages. |
| `css/experience.css` | Experience marquee cards, detail modal, and responsive behavior. |
| `css/orbit-skills.css` | Skills orbit scene, badges, tooltips, animations, and responsive sizing. |
| `css/raised-buttons.css` | Pastel raised-button style: thick dark borders, offset shadows, hover/press states, and responsive sizing. |

Some page-specific styles remain inline in About, Projects, Resume, and the legacy Resume Preview HTML files.

## 5. JavaScript files

| File | Current role |
|---|---|
| `js/main.js` | Loaded on Home. Adds the JS-enabled class, supports legacy mobile-nav hooks if present, and observes `.reveal` elements. |
| `js/final-touch.js` | Loaded on Home. Adds legacy active-link handling, optional old mobile-nav hooks, and failed-image marking. |
| `js/orbit-nav.js` | Controls the homepage circular menu: open/close, outside click, Escape, and focus behavior. |
| `js/top-circular-nav.js` | Controls the shared inner-page black-hole fan menu. |
| `js/orbit-skills.js` | Dynamically creates the skills orbit rings and badges; loads icons; handles tooltips and pointer-based scene movement. |
| `js/project-ring.js` | Older standalone project-ring implementation. Not loaded by the current Projects page, which has its own inline helix implementation. |
| `js/script.js` | Older general navigation/scroll script. Not loaded by any current HTML page; expects legacy elements such as `#year`, `#navToggle`, and `#navMobile`. |

## 6. Assets

### Images

| File | Use |
|---|---|
| `assets/images/Cyberpunk.png` | Homepage hero artwork. |
| `assets/images/black hole.png` | Inner-page navigation logo and center of the Skills globe. |
| `assets/images/void.png` | Favicon used by the main pages. |
| `assets/images/amr.png` | No current HTML, CSS, or JavaScript reference found; currently unreferenced. |

### Documents

- `assets/docs/Resume.pdf` — Active resume displayed by `resume.html`.
- `assets/docs/RESUME_SOURCE_NOT_BINARY.txt` — Informational note about a previously uploaded resume filename and binary upload limitation. Not used at runtime; its note refers to the older `Resume ROS(1).pdf` name.

### Videos and other assets

- `assets/videos/Hero.mp4` — No current video element references it. Homepage JavaScript checks for `#heroVideo`, but that element is absent.
- `assets/videos/x.md` — One-byte placeholder with no meaningful content; not used by the site.
- `github-stats.svg` — Static GitHub Activity graphic; no current page references it.

## 7. Navigation and button styling

- Home has its own circular navigation, styled by `home-orbit-nav.css` and controlled by `orbit-nav.js`.
- About, Experience, Skills, Projects, Resume, and Contact share the top-centered black-hole fan navigation from `top-circular-nav.css` and `top-circular-nav.js`.
- Navigation order: Home → About → Experience → Skills → Projects → Resume → Contact.
- `raised-buttons.css` is loaded by the seven main pages and styles the site's CTA/contact buttons. The black-hole navigation triggers are separate controls.

## 8. External dependencies

There is no npm install or build step. The site uses:
- **Google Fonts:** Space Grotesk, Inter, and JetBrains Mono.
- **Simple Icons CDN:** many of the technology icons in the Skills orbit.
- **GitHub-hosted media:** selected project images and animations.
- **GitHub avatar image:** the About page profile image.

External resources require a network connection. The Skills orbit has abbreviation fallbacks when a technology icon fails to load.

## 9. Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. A local HTTP server is recommended over opening the HTML files using `file://`.

## 10. GitHub Pages deployment

The site is a root-level static website. `index.html` is the entry point and assets use relative paths.

1. Open repository **Settings → Pages**.
2. Select the configured deployment source (typically the `main` branch and `/` root).
3. Save if settings need to be changed.
4. Visit https://sam-airobotics.github.io/portfolio/.

No build command is currently required.

## 11. Unused and cleanup candidates

The following findings are based on references in the current tracked HTML, CSS, and JavaScript. An unreferenced file may still be intentionally retained for future use or archival purposes.

| File | Finding | Suggested action |
|---|---|---|
| `js/script.js` | Not loaded by current HTML; legacy navigation/scroll implementation. | Candidate for removal after confirming no future reuse. |
| `js/project-ring.js` | Not loaded; current Projects page uses inline helix logic. | Candidate for removal or archival. |
| `resume-preview.html` | Not in main navigation; references a missing PDF filename and contains older resume content. | Archive or remove if no longer needed. |
| `assets/docs/RESUME_SOURCE_NOT_BINARY.txt` | Informational note only; not used at runtime and now out of date relative to `Resume.pdf`. | Cleanup candidate. |
| `assets/videos/Hero.mp4` | No active video element references it. | Remove if hero-video scrubbing is abandoned, or intentionally wire it into Home. |
| `assets/videos/x.md` | One-byte placeholder. | Safe cleanup candidate. |
| `assets/images/amr.png` | No current code reference found. | Keep only if intended for a future AMR section. |
| `github-stats.svg` | No current code reference found. | Add it to a page intentionally or remove it. |

### Legacy code inside files that are still used

- `css/style.css` and `css/portfolio-fix.css` contain both current shared rules and selectors from older layouts. Do not remove either stylesheet wholesale based only on old-looking selectors.
- `js/main.js` and `js/final-touch.js` are loaded on Home, but some navigation hooks target the previous header/mobile-navigation structure. Review their remaining behavior before removing them.
- The homepage inline script contains a video-scrubbing feature check for a missing `#heroVideo` element.

## 12. Maintenance guide

- **Navigation:** Keep the fan-menu links consistent on Home and the six inner pages.
- **Skills:** Add, remove, or rename technology entries in the `skills` array inside `js/orbit-skills.js`.
- **Projects:** Edit the `PROJECTS` array in `projects.html` to change titles, descriptions, tags, repository URLs, or image URLs.
- **Experience:** Update the role cards and matching records in the hidden `#expData` section of `experience.html`.
- **Resume:** Replace `assets/docs/Resume.pdf` and keep its path in `resume.html` consistent.
- **New page:** Add its link to both navigation implementations and preserve the page-number convention.

---

*Documentation reflects the tracked files on the repository's default branch. Usage findings are based on source references; unreferenced files may still have archival or future value.*
