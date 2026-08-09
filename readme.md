# HTML / CSS / JS Codsoft Assignment Projects

Three Level 1 front-end projects, each in its own folder below. Each one is fully self-contained — open its `index.html` in a browser, no install or server needed.

---

## 1. Portfolio Website

A one-page developer portfolio: hero intro, about section, skills grid, project cards, resume download button, and a contact section 

- Built to look like a real developer's site, but the name, contact details, and project names are fictional (adapted from a real resume for a college assignment, with identifying details changed).
- No JavaScript — pure HTML/CSS layout practice using Flexbox and CSS Grid.
- Before using for real: swap the placeholder SVG avatars for actual photos, add a real `resume.pdf`, and change the contact

## 2. Nextora Landing Page

A SaaS-style business landing page, rebuilt to match a reference

- Focus of this project: layout precision — matching alignment, spacing, and color blocking from a reference image using CSS Grid/Flexbox and absolute positioning.
- The hero photo is loaded from an external URL — confirm that link is still live before submitting, or replace it with your own image.

## 3. Calculator App

A working calculator styled  extended with the full button set a calculator needs: digits 0–9, `+ − × ÷`, `%`, decimal point, backspace, and clear.
- This is the only project with real logic: `script.js` tracks the current number, the previous number, and the chosen operator, then computes the result on `=`.
- Handles edge cases: divide-by-zero shows `Error` instead of crashing, and floating-point rounding errors (like `0.1 + 0.2` showing extra decimals) are cleaned up.
- Also works with the keyboard, not just mouse clicks.

---

## Where I improved

1. **Layout with real content** (Portfolio) — structuring a full page of sections
2. **Layout matched to a design spec** (Landing page) — precision, not just structure
3. **Interactivity with JavaScript** (Calculator) — state, event listeners, and logic on top of layout
