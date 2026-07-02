# Aminur Hossain - Personal Portfolio Website

A premium, modern, and highly interactive single-page portfolio website designed and optimized for developers. Ready to be deployed out-of-the-box to **GitHub Pages**.

## Features

- **Premium Design Aesthetics**: Ambient background glow filters, glassmorphism header, curated dark-mode color palette, and high-quality fonts (`Outfit` and `Inter`).
- **Responsive Layout**: Designed mobile-first, supporting fluid scaling across mobile, tablet, and desktop viewports.
- **Micro-Animations**: Smooth CSS transitions, scrolling tracking header, blob floating animation, and elegant card scaling on hover.
- **Dynamic Portfolio Filtering**: Instantly filter projects by category (Frontend, Full-Stack, Design) with animated fade-in and scale layouts.
- **Interactive Contact Form**: Custom feedback loop showing sending and success animations on submission.
- **Zero Build Step**: Native HTML5, CSS3, and JavaScript logic without complex framework overheads, yielding incredibly fast load times.

## How to Customize

1. **Modify Text & Profiles**:
   Open `index.html` and replace all occurrences of `Aminur Hossain` or email details with your own personal info.
2. **Update Social & Resume Links**:
   Locate the social links section (lines ~310-314) and change the URLs to direct to your GitHub, LinkedIn, etc.
3. **Change Project Items**:
   To add or remove showcase cards, update the `.projects-grid` structure in `index.html`. Assign correct `data-category` attributes to ensure filters operate correctly.
4. **Contact Form**:
   The contact form posts through FormSubmit to the email address configured in `index.html`. On the first submission, FormSubmit may send an activation email before forwarding messages.

## How to Deploy to GitHub Pages

Since this repository is named `aminurhossain.github.io`, it will serve as your user site.

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit of portfolio website files"
   git branch -M main
   # Add your remote repository:
   git remote add origin https://github.com/aminurhossain/aminurhossain.github.io.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub.
   - Select **Pages** from the left-hand menu.
   - Under **Build and deployment**, ensure the source is set to **Deploy from a branch** and choose `main` (or `master`) branch and `/root` folder.
   - Click Save. Your website will be live shortly at `https://aminurhossain.github.io/`!
