# Pamela Malone — Slimming World & Online 1-on-1 Coaching Website

A static HTML, CSS, and JavaScript website built for **Pamela Malone** (Slimming World Consultant & Certified Life Coach), designed for zero-build hosting on **GitHub Pages**.

## Project Structure

- `index.html` — Main single-page website (Group Dates & Times, Online 1-on-1 Coaching, About Pamela, FAQs, Contact & Quick WhatsApp Enquiry Builder)
- `styles.css` — Responsive editorial styling
- `script.js` — Mobile navigation, group day filter tabs, pre-filled enquiry routing, and WhatsApp/clipboard message builder
- `images/` — `pamela.png` and `pamela_before_and_after.jpeg`
- `.nojekyll` — Ensures GitHub Pages serves static files directly without Jekyll processing

## Deploying to GitHub Pages

1. Push this repository to GitHub (make sure `index.html`, `styles.css`, `script.js`, `.nojekyll`, and `images/` are at the root of the branch).
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Select your default branch (`main`) and folder (`/ (root)`), then click **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repository-name>/` within a minute or two.

> **Tip:** All asset links use relative paths (`./styles.css`, `./script.js`, `./images/...`), so the site works on both a project subpath and a custom domain.

## Updating Group Times or Contact Info

- Group dates, venues, and session times are in `index.html` inside the `#groups` section.
- Phone/WhatsApp number (`086 123 1774` / `353861231774`) can be updated in `index.html` and `script.js` (`WHATSAPP_NUMBER`).
