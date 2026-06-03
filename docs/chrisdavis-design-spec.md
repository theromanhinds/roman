# Chris Davis Design Reference Spec
> Source: https://www.chrisdavis.work/ — studied June 2026
> Purpose: Lift design patterns and animations to level up the Roman Hinds portfolio

---

## 1. Overall Aesthetic

- **Mood**: Dark, editorial, minimal. Confidence without decoration.
- **Color palette**:
  - Body background: `#121212` (near-black, not pure black — warmer)
  - Section background (light): `#f5f5f5` (off-white, same warm feel as delba.dev)
  - Footer/bottom bar: `#0a0a0a`
  - Text on dark: `#ffffff`
  - Text on light: `#0a0a0a`
- **Contrast**: The page flips hard between full-black sections and full-light sections. No gray in between — it's binary.

---

## 2. Typography

- **Font**: `Inter` throughout (loaded via Framer's CDN). Weights 400 and 600.
- **Hero h1**: Small-ish — `~19px / 500 weight` — deliberately understated on dark. Text reads: *"Crafting videos that move people."*
- **Section headings (h2)**: Massive — `62px / 600 weight / line-height 57px / letter-spacing -3.72px`. Tight negative tracking makes it feel like editorial print. Example: *"Projects."*
- **Body/supporting text**: `Inter 400`, `~15–16px`, relaxed line-height.
- **Counter label**: Small caps label in parentheses `(6)` above section headings — a subtle typographic device.

**Key takeaway for Roman**: The contrast between a tiny h1 and a huge h2 is the move. Headline = small/medium weight. Section title = enormous/bold with tight letter-spacing.

---

## 3. Page Load / Intro Splash Animation

This is the standout feature. On every page load:

1. **Black screen fills 100vw × 100vh** (position: fixed, z-index: 9999, bg: `#121212`)
2. **Name centered** — "chris davis" in white Inter, ~32–40px, weight 400, centered absolutely
3. **Held for ~0.8–1s** — just long enough to register
4. **Fade + scale out**: The splash overlay fades to opacity 0 while simultaneously the hero content fades in from below
5. **Duration**: Total intro sequence is ~1.5–2 seconds

**How to implement this for Roman:**

```tsx
// IntroSplash.tsx
// - Renders fixed overlay with name centered
// - useEffect: after 900ms, add class 'leaving' → opacity: 0, transition: opacity 0.5s ease
// - After transition ends, unmount the overlay (useState mounted)
// - Meanwhile the main content starts at opacity: 0, translateY: 12px
//   and transitions in once splash begins leaving
```

CSS approach:
```css
.intro-splash {
  position: fixed; inset: 0; z-index: 9999;
  background: #121212;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.5s ease;
}
.intro-splash.leaving { opacity: 0; pointer-events: none; }

.page-content {
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s;
}
.page-content.visible { opacity: 1; transform: translateY(0); }
```

---

## 4. Hero Section

- Full-bleed video/image background (grayscale or high-contrast B&W)
- Text overlaid bottom-left with `position: absolute; bottom: 32px; left: 32px`
- Rounded corners on the hero block: `border-radius: 12–16px`
- Subtle vignette or overlay to make white text legible on the photo/video

**For Roman**: A full-bleed hero image with name + tagline overlaid bottom-left would be a major upgrade from the current flat two-column. Could keep the two-column below it.

---

## 5. Navigation

- **Hamburger menu** (two horizontal lines) — top-left, fixed position
- No traditional nav bar. Opens into a side-panel or overlay with: Home · About · Projects · Contact
- Contact info (phone + email) shown directly in the nav panel
- This keeps the hero completely clean — nothing competes with the image

**For Roman**: Replace the fixed theme toggle with a minimal hamburger that reveals links + theme toggle together.

---

## 6. Project Cards

- Cards are full-width list items stacked vertically
- Each card: project name + year label (`Mocean /2022`) on top row
- Below: full-bleed image or video thumbnail with `border-radius: 12px`
- Three-dot `···` icon on the right of the title row (hover to reveal actions or link)
- Background: white card on light-gray page — subtle `box-shadow` or just `border: 1px solid #e5e5e5`
- No decorative borders on the card itself — whitespace does all the work

---

## 7. Scroll & Motion

- **Framer-powered** (this site is built in Framer). But the patterns are transferable:
- Section headings **slide up from slightly below** as they enter viewport (`translateY: 20px → 0, opacity 0 → 1`)
- Stagger: heading fades in first, then description, then cards one by one (~100ms delay each)
- Project images have a **subtle parallax** — image moves slightly slower than the card container on scroll
- No aggressive spring physics — transitions are `ease` or `ease-out`, 0.4–0.6s duration

---

## 8. Footer

Two-column layout:
- Left: Navigation links (Home / About / Projects / Contact) in large Inter 400 ~28–32px
- Right: Social links with ↗ arrow (YouTube · LinkedIn · VSCO)
- Below: Black bar with copyright + "Made with love in New York City."
- Background: `#f5f5f5` for the link section, `#0a0a0a` for the bottom strip

---

## 9. Micro-details Worth Stealing

| Detail | Implementation |
|--------|---------------|
| Negative letter-spacing on big headings | `letter-spacing: -0.06em` on anything > 40px |
| Period at end of section headings | *"Projects."* *"About."* — adds editorial weight |
| Year label next to project name | `Tonami /2024` in a muted color |
| Count label before section | `(6)` above "Projects." — subtle but memorable |
| Pure black section + pure white section alternation | No gradients, no transitions between — hard cuts |
| Name in footer as large text | Not just copyright — the name itself, big |

---

## 10. Priority Actions for Roman Portfolio

Ordered by impact:

1. **Intro splash** — black screen → name → fade reveal. Single biggest upgrade.
2. **Hero image** — full-bleed `avatar.jpg` with name overlaid bottom-left, rounded corners
3. **Negative letter-spacing** on "Roman Hinds" h1 — `letter-spacing: -0.04em`
4. **Section heading style** — make "Projects" much bigger (48–60px), bold, tight tracking
5. **Project cards** — upgrade from plain list to stacked cards with year label
6. **Scroll-in animations** — fade + slide up per section using `IntersectionObserver`
7. **Footer** — two-column with large nav links + social links ↗
