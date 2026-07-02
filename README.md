# Aminur Hossain - Research Portfolio

A single-page GitHub Pages portfolio for Aminur Hossain, focused on academic profile, research areas, professional experience, publications, and contact links.

## Features

- Responsive research portfolio layout for desktop, tablet, and mobile screens.
- Sections for About, Research Highlights, Experience, Publications, and Contact.
- Dark/light theme toggle with saved browser preference.
- Interactive publication citation buttons for copying BibTeX entries.
- Project/research-area modal cards with links to GitHub and Google Scholar.
- Static contact form powered by FormSubmit.
- Zero build step: plain HTML, CSS, and JavaScript.

## Site Structure

- `index.html` - page content, profile details, publications, links, and contact form configuration.
- `styles.css` - responsive layout, theme variables, animations, and component styling.
- `script.js` - navigation behavior, theme toggle, typing animation, modals, reveal effects, and BibTeX copy handling.
- `profile.jpg` - profile image used in the hero section.

## Update Guide

1. Edit profile text, research highlights, experience, and publications in `index.html`.
2. Update external profile links in the hero, project cards, and contact section.
3. Configure the contact form email in the `form` action in `index.html`.
4. Adjust visual styling in `styles.css`.

## Deploying

This repository is named `aminurhossain.github.io`, so GitHub Pages can serve it as a user site from the root of the `main` branch.

Push changes to `main`, then confirm GitHub Pages is enabled in repository settings under **Pages** with source set to the `main` branch and `/root` folder.
