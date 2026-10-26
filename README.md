# Hollis & Vale — Photography Website

A premium, editorial photography studio website with cinematic scroll-driven and 3D animations.

## Stack
- HTML5, CSS3 (Grid, sticky, 3D transforms, clip-path), vanilla JavaScript
- [GSAP 3.12.5](https://gsap.com/) + ScrollTrigger for scroll choreography
- [Lenis 1.1.13](https://github.com/darkroomengineering/lenis) for smooth scrolling
- Google Fonts (Cormorant Garamond, Manrope); placeholder photography from Unsplash

## Run locally
No build step. Serve the folder with any static server:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Before going live
- Connect the contact form to a real endpoint (it currently simulates sending).
- Replace Unsplash placeholder images and sample copy (names, prices, testimonials, social links).
