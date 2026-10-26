# Site audit — October 2026

Audit of https://samplephotographywebsite.vercel.app/ (static HTML/CSS/JS, GSAP + ScrollTrigger + Lenis).
The site was refined in place; no sections were rebuilt and no new libraries were added.

## Fixed

| Area | Issue | Fix |
| --- | --- | --- |
| Statistics | Weddings / countries / years rendered as `0` until animated, and the figures were unverified | Removed from the page; shown only when `showStats` is enabled in `js/config.js` with real values |
| Press | Publication names implied endorsements that aren't confirmed | Hidden behind `showPress` |
| Testimonials | Sample quotes presented as real clients | Hidden behind `showTestimonials`; the experience section closes cleanly without them |
| Enquiry form | Showed "Thank you" after a fake 0.9s timer — nothing was sent | Posts to `formEndpoint` and reports success only on a 2xx response; shows an error and keeps the visitor's text on failure; with no endpoint it opens the visitor's email app pre-filled |
| Enquiry form | No spam protection; fragile text→date input swap; errors not linked to fields | Honeypot field, native date input (past dates rejected), `aria-describedby` errors, busy state, mobile keyboard hints |
| Services | No way to enquire about a specific service; prices hard-coded in markup | "Enquire" link per service pre-selects the commission type; prices come from `js/config.js` |
| Films | "Play" badge and cursor promised video that doesn't exist | Labelled "Film"; viewer says "Film still" |
| Hero | Photo faded in from black over 2.6s; nav hidden for 2s; frame tilts up to 7° looked random | Photo visible in ~0.9s, nav at 0.3s; tilts halved and frames given real depth (translateZ) |
| Featured story | Background sat in a flat mid-grey for the first third of the scroll | Darkens as the image expands instead |
| Contrast | Champagne (2.4:1) and taupe (2.1:1) used for small text on ivory | `--champagne-ink` (5.1:1) for small text, `--champagne-deep` (3.4:1) for large italic accents; original champagne kept on dark sections |
| Touch targets | Filter tabs 34px, testimonial dots 20px, footer links 21px | All ≥ 44px |
| Images | Hero and gallery always downloaded desktop-size files | `srcset`/`sizes` on hero, featured image and gallery; hero preloaded |
| Hidden elements | `display: grid/flex` overrode the `hidden` attribute | Global `[hidden] { display: none !important }` |

Verified after the changes: all seven portfolio filters show only their own category, lightbox and 3D gallery controls work, no console errors, and no horizontal overflow at 375 / 768 / 1440px.

## Needs confirmation before launch

Everything below was written as sample copy and has **not** been verified:

- **Photography** — every image is an Unsplash placeholder. Portfolio titles, couple names and locations are invented and must be replaced with real studio work.
- **Films** — there are no real films; the Films category shows stills. Add real video embeds (e.g. Vimeo) or remove the category.
- **Studio facts** — "Est. 2012" (hero), "since 2012" and "Fourteen years later" (Our Story), "a small studio of four".
- **People** — Eleanor Hollis and Samuel Vale, and their roles.
- **Featured story** — "Mira & Julian", Atacama, "212 delivered".
- **Prices** — all six starting prices (`js/config.js → prices`).
- **Service inclusions** — "two photographers, heirloom album", "planning consultation, online gallery, printing rights", "gallery in four weeks", "linen-bound album".
- **Contact** — email address, "14 Mercer Yard, London", "Lake Como · London · Udaipur", "2027 & 2028 dates open", "reply within two working days".
- **Social links** — Instagram / Vimeo / Pinterest currently point to `#`.
- **Hidden until supplied** — statistics, press mentions, testimonials (`js/config.js`).

## To finish the enquiry form

Create a form with a form service that accepts `FormData` POSTs (Formspree, Getform, Basin, etc.) and paste its URL into `formEndpoint` in `js/config.js`. Until then the form opens the visitor's email app instead of sending.
