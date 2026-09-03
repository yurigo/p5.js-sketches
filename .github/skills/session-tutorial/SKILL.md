---
name: session-tutorial
description: Create and maintain a documented p5.js class session with a tutorial index and linked sketches.
---

# Session tutorial workflow

Use this skill when adding or improving a folder under `sessions/`.

## Required structure

Each session must contain:

- `README.md`: an academic summary in Spanish with objectives, prerequisites,
  a sequenced development, guided practice, and references;
- `index.html`: a self-contained tutorial page that presents the sequence and
  links to every associated sketch;
- `sketches/<name>/`: the p5.js projects produced during the session.

## Procedure

1. Read every sketch README and `sketch.js` in the session.
2. Turn the class notes into measurable learning objectives and an ordered
   tutorial.
3. Add a prominent relative link from `index.html` to each sketch.
4. Add a reciprocal link from each sketch README to the session tutorial.
5. Keep the tutorial usable offline: use relative links and avoid adding
   dependencies.
6. Add the session to the `Sessions` section of the repository `README.md`.
7. Run `./validate-sketch.sh` for each sketch that follows the repository
   structure and manually verify all tutorial links.

## Content guidelines

Prefer semantic HTML, accessible link text, and short explanations of the
p5.js concepts being introduced. Keep examples aligned with the actual sketch;
do not describe behavior that is not present in its source code.
