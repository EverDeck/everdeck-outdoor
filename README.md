# Everdeck Outdoor

Static marketing site for Everdeck Outdoor, a custom deck / swing / outdoor-structure builder serving Greater Vancouver. Plain HTML, CSS and JavaScript — no build step, no framework.

## Structure

```
/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/   optimized project photos (.jpg + .webp)
│   ├── logo/     Everdeck logo, sized for nav/footer
│   └── qr/       drop Instagram/Facebook QR codes here (see below)
└── README.md
```

## Running locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Things to finish before launch

- **Estimate form endpoint** — `js/script.js` has `FORM_ENDPOINT = "YOUR_FORM_ENDPOINT_HERE"`. Replace with a real Formspree (or similar) endpoint so submissions reach `everdeckoutdoor@gmail.com`.
- **Social links** — `index.html` footer has `YOUR_INSTAGRAM_URL`, `YOUR_FACEBOOK_URL`, `YOUR_TIKTOK_URL` placeholders.
- **QR codes** — footer has placeholder tiles for Instagram/Facebook QR codes. Generate real ones and either swap the placeholder markup for `<img>` tags pointing at `assets/qr/instagram-qr.png` / `assets/qr/facebook-qr.png`, or drop the files in `assets/qr/` and update the markup.
