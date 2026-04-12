# Royal Chess Co. — Website

Ultra-luxury product site for the Heritage Marble Chess Set. Standalone
Next.js + Tailwind app, intentionally kept separate from the route manager
in the repo root.

## Design direction

Inspired by maisons like Hermès, Loewe and Bottega — restrained editorial
layout, serif display type (Cormorant Garamond), a warm ivory / burgundy /
brass palette, and generous whitespace. The tone is "one object, made
slowly" rather than "shop now".

## Run locally

```bash
cd chess-site
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
chess-site/
├── app/
│   ├── layout.tsx          # Root layout, header + footer
│   ├── page.tsx            # Home — assembles all sections
│   └── globals.css         # Tailwind + typography + textures
├── components/
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   └── sections/
│       ├── Announcement.tsx
│       ├── Hero.tsx
│       ├── ProductShowcase.tsx
│       ├── Materials.tsx
│       ├── Craftsmanship.tsx
│       ├── Editorial.tsx
│       ├── Atelier.tsx
│       └── Newsletter.tsx
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Dropping in real product photography

All imagery is currently rendered as styled placeholders (SVG / CSS) so the
layout is legible without assets. When real photography is ready:

1. Add images to `chess-site/public/`.
2. In `components/sections/Hero.tsx`, replace the `<HeroArtwork />` component
   with `<Image src="/hero.jpg" ... />` from `next/image`.
3. Same for the placeholder blocks in `ProductShowcase.tsx`, `Atelier.tsx`,
   and the swatches in `Materials.tsx`.

## Notes

- Fonts are loaded from Google Fonts in `globals.css`. For production, move
  to `next/font` for better performance.
- Every price and spec is placeholder copy — swap before launch.
