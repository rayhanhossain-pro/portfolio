# Md Rayhan Hossain: Portfolio

A bilingual (English / Bangla) portfolio built with plain HTML, CSS and JavaScript. No build step, no frameworks.

## Folder structure
```
index.html                 Main page (all sections)
project-details/project.html   One template for every web project (reads ?id=...)
css/style.css              Styles and brand colors (top of file)
js/translations.js         All English and Bangla text
js/projects.js             Contact details + project list (edit this to add projects)
js/main.js                 Menu, language toggle, cards, form, reveal animations
js/project-details.js      Builds the project detail page
assets/images/             portrait.jpg, cert-*.jpg, og-image.jpg, projects/
assets/resume/resume.pdf   Add your resume here
```

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
(Use the local server to test the Resume button; browsers block that file check on `file://`.)

## What to add
1. `assets/images/portrait.jpg` (about 480x600). It appears automatically.
2. `assets/resume/resume.pdf`. The Resume button turns on automatically when the file exists.
3. Certificate images: `cert-digital-marketing.jpg`, `cert-graphic-design.jpg`, `cert-programming-hero.jpg`.
4. In `js/projects.js`: your email, phone, WhatsApp, and real projects (demo, repo and drive links, details).
5. In `index.html`: replace `YOUR-USERNAME.github.io/YOUR-REPO` in the canonical and Open Graph tags, and add `assets/images/og-image.jpg`.

## Contact form
GitHub Pages is static, so the form cannot send mail by itself. It validates, then opens the visitor's email app (`mailto:`) using the email in `js/projects.js`. If no email is set, it says so instead of pretending to send.

## Deploy to GitHub Pages
1. Create a GitHub repository and upload these files (keep `index.html` at the top level).
2. Repository **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. After a minute your site appears at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
All paths are relative, so the repository subpath works without changes.
