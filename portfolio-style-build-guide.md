# Portfolio Style & Build Guide
## Inspired by delba.dev + next-blog-mdx.vercel.app

> Hand this document to an AI agent to build your portfolio from scratch.
> Everything it needs — stack, file structure, CSS tokens, component specs, and copy patterns — is here.

---

## 1. Core Design Philosophy

These two sites share the same DNA. The aesthetic is:

- **Radical restraint.** No cards, no grids, no decorative borders. Content is the UI.
- **Prose-first layout.** Everything flows like a well-written document.
- **Type-driven hierarchy.** Headings, body, and muted text do all the visual work.
- **Invisible chrome.** Nav, footer, and theme toggle disappear into the background.
- **The dark/light flip is instant.** No fades, no transitions — just a clean inversion.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components by default |
| Language | TypeScript | Strict mode on |
| Styling | Tailwind CSS v4 | Utility-first, no CSS-in-JS |
| Content | MDX via `@next/mdx` | Write pages in Markdown + JSX |
| Font | Inter (Google Fonts, `next/font`) | Subsets: `['latin']` |
| Dark mode | `next-themes` | Strategy: `class`, default `system` |
| Deployment | Vercel | One-click, zero config |
| Analytics | `@vercel/analytics` | Optional but included |

**Install command:**
```bash
pnpm create next-app@latest my-portfolio \
  --typescript --tailwind --app --src-dir=false --import-alias="@/*"
pnpm add next-themes @vercel/analytics
pnpm add -D @next/mdx @mdx-js/loader @mdx-js/react
```

---

## 3. File Structure

```
/
├── app/
│   ├── globals.css          # Tailwind directives + CSS vars
│   ├── layout.tsx           # Root layout: font, theme provider, nav, footer
│   ├── page.mdx             # Home page — written in MDX
│   ├── [project-slug]/
│   │   └── page.mdx         # Each project/app as its own MDX page
│   └── blog/                # Optional: writing section
│       ├── page.tsx
│       └── [slug]/
│           └── page.mdx
├── components/
│   ├── ThemeToggle.tsx      # Sun/moon icon button
│   ├── Nav.tsx              # Minimal top nav
│   └── Footer.tsx           # Social links row
├── mdx-components.tsx       # Custom MDX element overrides
├── next.config.ts           # MDX + image domains
├── tailwind.config.ts       # Extend with custom tokens
└── package.json
```

---

## 4. Color Tokens (Light & Dark)

Both sites use a near-zero-color palette. Extract these exact values.

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "next-themes";

:root {
  --background: #ffffff;
  --foreground: #111111;         /* headings, strong text */
  --muted: #6b7280;              /* gray-500 — secondary text, dates */
  --subtle: #9ca3af;             /* gray-400 — footer links, placeholders */
  --border: #e5e7eb;             /* gray-200 — dividers only */
  --link: #3b82f6;               /* blue-500 — anchor hover */
  --link-visited: #6366f1;       /* indigo-500 */
  --code-bg: #f3f4f6;            /* gray-100 — inline code bg */
  --code-text: #111111;
}

.dark {
  --background: #09090b;         /* zinc-950 — matches leerob exactly */
  --foreground: #e4e4e7;         /* zinc-200 */
  --muted: #71717a;              /* zinc-500 */
  --subtle: #52525b;             /* zinc-600 */
  --border: #27272a;             /* zinc-800 */
  --link: #60a5fa;               /* blue-400 */
  --link-visited: #818cf8;       /* indigo-400 */
  --code-bg: #18181b;            /* zinc-900 */
  --code-text: #e4e4e7;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

**Tailwind classes used verbatim in the source:**
- Background: `bg-white dark:bg-zinc-950`
- Body text: `text-gray-900 dark:text-zinc-200`
- Muted text: `text-gray-400 dark:text-gray-500`
- Link hover: `hover:text-blue-500`
- Link transition: `transition-colors duration-200`

---

## 5. Typography Scale

```
Font family:  Inter (variable, latin subset)
Antialiasing: antialiased (Tailwind)
Tracking:     tracking-tight (all body text)

Heading 1 (page title):  text-2xl font-semibold  — ~24px
Heading 2 (sections):    text-xl font-medium     — ~20px, anchor-linked
Body:                     text-base               — 16px, leading-relaxed
Small / muted:            text-sm text-gray-400   — 14px
Code inline:              font-mono text-sm       — 14px, bg gray-100
```

**Prose max-width:** `max-w-[60ch]` — this is the magic number. Both sites cap line length at ~60 characters, centered with `mx-auto`. Never go wider.

**Spacing between sections:** `space-y-6` on the main content wrapper.

---

## 6. Root Layout (`app/layout.tsx`)

```tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Your Name',
    template: '%s | Your Name',
  },
  description: 'Building in public. Developer, maker.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased tracking-tight`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              <Nav />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 7. Nav Component

Minimal. Name on the left, theme toggle on the right. No hamburger, no dropdown.

```tsx
// components/Nav.tsx
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <nav className="flex items-center justify-between mb-8">
      <Link
        href="/"
        className="text-gray-900 dark:text-zinc-200 font-medium hover:text-blue-500 transition-colors duration-200"
      >
        Your Name
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200 text-sm"
        >
          projects
        </Link>
        <Link
          href="/blog"
          className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200 text-sm"
        >
          writing
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
```

---

## 8. Theme Toggle Component

Small icon button. Swaps sun ↔ moon. No label text.

```tsx
// components/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />; // prevent hydration flash

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
```

---

## 9. Footer Component

Centered, lowercase text links. Exactly the pattern from both reference sites.

```tsx
// components/Footer.tsx
export default function Footer() {
  const links = [
    { name: '@yourhandle', url: 'https://x.com/yourhandle' },
    { name: 'github', url: 'https://github.com/yourusername' },
    { name: 'linkedin', url: 'https://linkedin.com/in/yourprofile' },
    // add youtube, twitch, etc. as needed
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200 text-sm"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
```

---

## 10. Home Page Content Pattern (`app/page.mdx`)

This is the exact structure from delba.dev. No hero banner, no avatar above the fold. Just clean prose.

```mdx
# Your Name

One sentence that describes what you do and what you're building.
[Let's connect](https://linkedin.com/in/you) if you want to talk.

## [Projects](#projects)

- **[App Name One](https://yourapp.com):** One sentence description of what it does.
- **[App Name Two](https://yourapp2.com):** One sentence. What problem it solves.
- **App Name Three (in progress):** Brief note on what you're building.

## [Writing](#writing)

- **[Post Title](https://yourdomain.com/blog/slug):** One-line teaser.
- **[Another Post](https://yourdomain.com/blog/slug2):** One-line teaser.

## [About](#about)

Two or three sentences. Who you are, what you care about, what you're working on.

---

[GitHub](https://github.com/you) · [Twitter/X](https://x.com/you) · [LinkedIn](https://linkedin.com/in/you)
```

---

## 11. MDX Components Override (`mdx-components.tsx`)

Customize how standard Markdown elements render. These match the aesthetic exactly.

```tsx
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings — anchor-linked, tight tracking
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-200 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="text-xl font-medium tracking-tight text-gray-900 dark:text-zinc-200 mt-8 mb-3 group">
        <a href={`#${id}`} className="no-underline hover:underline">{children}</a>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-medium tracking-tight text-gray-900 dark:text-zinc-200 mt-6 mb-2">
        {children}
      </h3>
    ),
    // Body text
    p: ({ children }) => (
      <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 mb-4">
        {children}
      </p>
    ),
    // Links — blue on hover
    a: ({ href, children }) => {
      const isInternal = href?.startsWith('/');
      if (isInternal) {
        return (
          <Link href={href!} className="text-gray-900 dark:text-zinc-200 underline underline-offset-2 hover:text-blue-500 transition-colors duration-200">
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="text-gray-900 dark:text-zinc-200 underline underline-offset-2 hover:text-blue-500 transition-colors duration-200">
          {children}
        </a>
      );
    },
    // Lists — tight, no extra padding
    ul: ({ children }) => (
      <ul className="space-y-1 my-4 pl-0 list-none">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 before:content-['-'] before:mr-2 before:text-gray-400">
        {children}
      </li>
    ),
    // Inline code
    code: ({ children }) => (
      <code className="font-mono text-sm bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    // Horizontal rule — subtle divider
    hr: () => <hr className="my-8 border-gray-200 dark:border-zinc-800" />,
    // Strong — same color as body, just heavier
    strong: ({ children }) => (
      <strong className="font-medium text-gray-900 dark:text-zinc-200">{children}</strong>
    ),
    ...components,
  };
}
```

---

## 12. Next.js Config (`next.config.ts`)

```ts
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true, // Rust-based MDX compiler (faster)
  },
};

export default withMDX(nextConfig);
```

---

## 13. Tailwind Config (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './mdx-components.tsx',
  ],
  darkMode: 'class', // controlled by next-themes
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '60ch', // the magic number
      },
      typography: {
        // if you add @tailwindcss/typography later
        DEFAULT: {
          css: {
            maxWidth: '60ch',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 14. Project / App Page Pattern

Each project you're building gets its own MDX page at `/app/[slug]/page.mdx`.

```mdx
---
title: App Name
description: One-sentence description.
---

# App Name

**Status:** Building in public · [Follow along →](https://x.com/yourhandle)

What it does in one paragraph. The problem it solves, who it's for.

## Stack

- Next.js, TypeScript, Tailwind
- [Any other key tech]

## Links

- [Live app](https://yourapp.com)
- [GitHub](https://github.com/you/repo)
- [Launch thread](https://x.com/...)
```

---

## 15. Key Visual Rules (for the agent to follow strictly)

1. **No cards.** Never wrap content in bordered boxes unless absolutely required.
2. **No hero sections.** The page starts with an `h1` and a single sentence. That's it.
3. **No custom colors beyond the palette above.** Blues are only for link hovers.
4. **Lowercase nav links and footer links.** Always. (`github` not `GitHub` in the footer.)
5. **No font sizes below 14px.** The smallest text is `text-sm` on muted items.
6. **Sections use `##` with anchor IDs.** Enabled via MDX heading override.
7. **Content width never exceeds `60ch`.** This is non-negotiable.
8. **Spacing is `space-y-6`** between top-level content blocks. Never tighter.
9. **The `<hr />` divider** (from `---` in MDX) separates the bio from the social link row at the bottom of the home page. Exactly one divider, at the end.
10. **Theme toggle is a single icon button** in the top-right of the nav. No label. No dropdown.
11. **No images on the home page** (optional: small circular avatar can go in the About section only).
12. **External links always open in a new tab** with `target="_blank" rel="noopener noreferrer"`.

---

## 16. Deployment

```bash
# Push to GitHub, then:
vercel deploy

# Or one-click from the Vercel dashboard:
# Import repo → Framework: Next.js → Deploy
# Zero env vars needed for the base setup
```

---

## 17. Customization Checklist for the Agent

- [ ] Replace `Your Name` everywhere in `layout.tsx` and `metadata`
- [ ] Update `metadataBase` URL to your actual domain
- [ ] Fill in footer links with real social handles
- [ ] Write home page content in `app/page.mdx`
- [ ] Create one MDX page per project under `app/[project-name]/page.mdx`
- [ ] Set `defaultTheme` in ThemeProvider to `'dark'` if you prefer dark-first
- [ ] Add OG image generation via `app/opengraph-image.tsx` (optional but recommended)

---

*Sources: delba.dev (design + content structure), next-blog-mdx.vercel.app / github.com/leerob/next-mdx-blog (layout.tsx source, Tailwind classes, font config)*
