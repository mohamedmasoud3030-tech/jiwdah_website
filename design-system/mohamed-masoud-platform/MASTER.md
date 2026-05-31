# Mohamed Masoud Platform — Design System

Generated from the attached UI UX Pro Max search engine for a bilingual personal portfolio and digital-services platform.

## Global direction

- Pattern: Portfolio Grid
- Style: Bento Box Grid
- Mode support: full light mode and full dark mode
- Conversion strategy: visuals first, category filters, fast loading, project-card interactions, footer contact CTA
- Section order: hero, project grid, about and philosophy, contact

## Color system

### Light mode

| Role | Value |
| --- | --- |
| Primary | `#18181B` |
| On primary | `#FFFFFF` |
| Secondary | `#3F3F46` |
| Accent and CTA | `#2563EB` |
| Background | `#FAFAFA` |
| Foreground | `#09090B` |
| Muted | `#E8ECF0` |
| Border | `#E4E4E7` |
| Destructive | `#DC2626` |

### Dark mode

Use the same blue CTA with desaturated dark surfaces, readable off-white text, and visible borders. Dark mode is designed independently; it is not a naive color inversion.

## Typography

- Arabic headings: `Noto Naskh Arabic`
- Arabic body: `Noto Sans Arabic`
- English headings and body: `Inter`
- Technical snippets only: a system monospace font

## Layout and effects

- Modular Bento cards with varied spans
- Consistent `16px` radius for major cards
- Subtle shadows and thin borders
- Smooth `150–300ms` transitions
- Visible focus rings
- One primary CTA per view
- Fixed floating navigation with reserved content offset

## Required accessibility and UX rules

- Lucide SVG icons only; no emoji icons
- Minimum touch target: `44px`
- Do not rely on hover alone
- Maintain at least `4.5:1` text contrast
- Respect `prefers-reduced-motion`
- Responsive checkpoints: `375px`, `768px`, `1024px`, `1440px`
- No horizontal mobile scrolling
- Helpful empty states instead of fabricated content

## Anti-patterns

- Low-energy muted interfaces without a clear accent
- Missing focus states
- Layout-shifting hover effects
- Inconsistent page-level styling
- Hard-coded colors scattered through components
- Fake projects, testimonials, statistics, or team members
