# Joy Visual Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the wedding site's visual language to match the Joy site (withjoy.com/esquizheng-party) — sketch tile background, engagement photos, outline pill buttons, refined typography, decorative sketch accents.

**Architecture:** CSS-first changes to index.css and Tailwind utility classes across page components. No new dependencies. Photos already downloaded to `public/photos/`, sketches in `public/sketches/`.

**Tech Stack:** Tailwind CSS v4 (via @tailwindcss/vite), React, Vite

---

### Task 1: Add sketch-tile background to index.css

**Files:**
- Modify: `src/index.css:18-25`

**Step 1: Add the sketch tile as a body background pattern**

In `src/index.css`, update the body rule to include the repeating tile:

```css
body {
  background-color: var(--color-cream-light);
  background-image: url('/sketches/sketch-tile.png');
  background-repeat: repeat;
  background-size: 400px;
  background-blend-mode: multiply;
  color: var(--color-brown);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

**Step 2: Verify in browser**

Run: `npx vite --port $(node ~/.claude/dev-port)`
Navigate to http://localhost:{port}/ — should see faint repeating sketch pattern behind all pages.

The tile should be subtle (the cream-light background + multiply blend mode will make the brown sketches very faint). If too strong, reduce opacity by wrapping in a pseudo-element later.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: add sketch-tile repeating background pattern"
```

---

### Task 2: Home page hero — engagement photo + Joy-style layout

**Files:**
- Modify: `src/pages/Home.jsx`

**Step 1: Replace gradient hero with photo hero**

Replace the current hero section (gradient background with text overlay) with a split-screen layout on desktop and full-bleed photo on mobile, using `hero-bridge.jpg`:

```jsx
{/* Hero */}
<section className="relative min-h-[100svh] flex flex-col">
  {/* Photo */}
  <div className="absolute inset-0">
    <img
      src="/photos/hero-bridge.jpg"
      alt="Meredith and Kyle"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
  </div>

  {/* Text overlay */}
  <div className="relative z-10 mt-auto pb-16 sm:pb-24 px-6 sm:px-12 max-w-3xl">
    <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white leading-[0.9] mb-4">
      Meredith
      <span className="block text-3xl sm:text-4xl md:text-5xl text-cream-dark/80 my-1">&amp;</span>
      Kyle
    </h1>
    <p className="font-serif text-cream/90 text-lg sm:text-xl mb-2">
      Join us for our celebrations in London &amp; Toledo!
    </p>
    <p className="font-serif text-gold text-2xl sm:text-3xl">
      June 27&ndash;30, 2026
    </p>
  </div>
</section>
```

**Step 2: Update venue preview section — outline pill button**

Change the solid wine button to an outline pill:

```jsx
<a
  href="/schedule"
  className="inline-block py-3 px-10 rounded-full border-2 border-wine text-wine font-sans font-semibold tracking-wide hover:bg-wine hover:text-cream-light transition-all duration-300"
>
  View Schedule
</a>
```

**Step 3: Update registry preview button — same outline pill**

Already outline style, keep as-is.

**Step 4: Verify with Playwright, commit**

```bash
git add src/pages/Home.jsx
git commit -m "style: hero photo + outline pill buttons on Home page"
```

---

### Task 3: Convert all solid buttons to outline pills site-wide

**Files:**
- Modify: `src/pages/RSVP.jsx`
- Modify: `src/components/Layout.jsx` (mobile floating RSVP)
- Modify: `src/components/NavMenu.jsx` (nav RSVP button)

**Step 1: RSVP.jsx — convert solid button to outline pill**

The main CTA on the RSVP page (line 19-26) currently uses `bg-wine text-cream-light`. Change to:

```jsx
className="inline-block py-3.5 px-10 rounded-full border-2 border-wine text-wine font-sans font-semibold tracking-wide hover:bg-wine hover:text-cream-light hover:scale-[1.02] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30 focus:ring-offset-2 focus:ring-offset-cream-light"
```

**Step 2: Layout.jsx — mobile floating RSVP button**

The floating RSVP button (line 84-ish) should match. Change from solid wine to outline:

From: `bg-wine text-cream-light`
To: `bg-cream-light/95 backdrop-blur-sm border-2 border-wine text-wine`

**Step 3: NavMenu.jsx RSVP buttons**

Desktop RSVP (around line 79) and mobile RSVP (around line 55) — these are already outline style (`border-2 border-wine`). Verify hover adds fill. No change needed if already correct.

**Step 4: Commit**

```bash
git add src/pages/RSVP.jsx src/components/Layout.jsx src/components/NavMenu.jsx
git commit -m "style: convert all solid buttons to outline pills"
```

---

### Task 4: Schedule page — photo hero + sketch accents

**Files:**
- Modify: `src/pages/Schedule.jsx`

**Step 1: Add engagement photo header**

Replace the plain `bg-cream-light` header with a photo banner using `hero-sitting.jpg`. Add a compact hero at the top of the schedule page:

```jsx
{/* Hero banner */}
<div className="relative h-48 sm:h-64 md:h-80 -mx-6 sm:-mx-8 -mt-16 md:-mt-20 mb-8 sm:mb-12 overflow-hidden">
  <img src="/photos/hero-sitting.jpg" alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
  <h1 className="absolute bottom-6 left-6 sm:left-8 font-serif text-4xl sm:text-5xl md:text-6xl text-wine drop-shadow-sm">
    Schedule
  </h1>
</div>
```

**Step 2: Add sketch accents to day headers**

Use individual sketch PNGs as small decorative accents next to day headers. For example, add a champagne sketch near the London day and a wine sketch near the Spain days:

```jsx
{/* Decorative sketch near day header */}
<img
  src={`/sketches/${dayIndex === 0 ? '1 champagne.png' : dayIndex === 1 ? '3 baijiu.png' : dayIndex === 2 ? '2 wine.png' : '2 gardenias.png'}`}
  alt=""
  className="absolute -right-4 -top-4 w-16 h-16 opacity-20 pointer-events-none"
  aria-hidden="true"
/>
```

**Step 3: Convert day header pills from solid wine to outline**

Change day header from `bg-wine text-cream` to outline style:
```
bg-cream-light border-2 border-wine text-wine
```

**Step 4: Commit**

```bash
git add src/pages/Schedule.jsx
git commit -m "style: Schedule page photo hero + sketch accents + outline headers"
```

---

### Task 5: Q&A page — photo hero + centered serif titles

**Files:**
- Modify: `src/pages/QAndA.jsx`

**Step 1: Add photo banner**

Add a compact hero banner using `hero-garden.jpg`:

```jsx
<div className="relative h-48 sm:h-64 overflow-hidden -mx-6 -mt-16 md:-mt-20 mb-8">
  <img src="/photos/hero-garden.jpg" alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
  <h1 className="absolute bottom-6 left-6 font-serif text-4xl md:text-5xl text-wine">
    Q &amp; A
  </h1>
</div>
```

**Step 2: Style refinement**

Ensure the questions use serif bold and answers use regular sans — matching Joy's Q&A pattern. The current accordion is fine functionally; just verify typography matches.

**Step 3: Commit**

```bash
git add src/pages/QAndA.jsx
git commit -m "style: Q&A page photo hero"
```

---

### Task 6: Registry page — photo hero + sketch accents on fund cards

**Files:**
- Modify: `src/pages/Registry.jsx`

**Step 1: Add photo banner with hero-street.jpg**

Same pattern as Q&A — compact hero with engagement photo.

**Step 2: Replace placeholder icons on fund cards with sketch images**

Replace the generic house/globe SVG icons with actual sketch assets:
- House fund card → `5 stoop.png`
- Honeymoon fund card → `1 champagne.png`

```jsx
<img
  src="/sketches/5 stoop.png"
  alt=""
  className="w-20 h-20 object-contain opacity-60"
/>
```

**Step 3: Commit**

```bash
git add src/pages/Registry.jsx
git commit -m "style: Registry page photo hero + sketch card accents"
```

---

### Task 7: Accommodations + Things to Do + Maps pages — photo heroes

**Files:**
- Modify: `src/pages/Accommodations.jsx`
- Modify: `src/pages/ThingsToDo.jsx`
- Modify: `src/pages/Maps.jsx`

**Step 1: Add photo banners to each**

Use the remaining photos:
- Accommodations → `hero-balcony.jpg`
- Things to Do → `hero-street.jpg`
- Maps → no photo needed (map is the hero)

Same compact hero pattern as Tasks 5-6.

**Step 2: Commit each**

```bash
git add src/pages/Accommodations.jsx src/pages/ThingsToDo.jsx
git commit -m "style: photo heroes on Accommodations + Things to Do pages"
```

---

### Task 8: Nav bar refinement

**Files:**
- Modify: `src/components/Layout.jsx`
- Modify: `src/index.css` (if needed)

**Step 1: Soften the nav bar**

Current nav has `border-b border-cream-dark`. Soften to:
- Remove hard border, use subtle shadow instead: `shadow-sm`
- Make background slightly more transparent: `bg-cream-light/90`
- On the home page, consider making the nav transparent over the hero photo (optional — only if it looks good)

**Step 2: Mobile drawer refinement**

The mobile slide-out drawer should match Joy's left-panel nav:
- Title "Meredith & Kyle" at top in serif
- Links stacked vertically with generous padding
- RSVP button at bottom as outline pill

Check current NavMenu.jsx — it already has this structure. Just verify styling matches Joy's warm brown tones.

**Step 3: Commit**

```bash
git add src/components/Layout.jsx src/components/NavMenu.jsx
git commit -m "style: soften nav bar, refine mobile drawer"
```

---

### Task 9: Typography pass — centered sections, title-case headings

**Files:**
- Modify: `src/index.css` (heading styles)
- Modify: Various pages for centering

**Step 1: Update heading styles in index.css**

Section titles should NOT be uppercase-tracked. They should be natural title-case serif. Check that `h1, h2, h3, h4` rules in index.css don't force uppercase. Current rules (lines 28-35) just set font-family and color — good.

**Step 2: Center section titles on content pages**

Scan all pages and ensure main section headings (`h1`, `h2`) have `text-center` where appropriate. Most already do — just verify consistency.

**Step 3: Commit**

```bash
git add -A
git commit -m "style: typography consistency pass"
```

---

### Task 10: Playwright visual review + polish

**Files:** Various

**Step 1: Launch browser and screenshot every page**

Navigate to each page, take desktop + mobile (375px) screenshots:
- Home, Schedule, Accommodations, Things to Do, Registry, Q&A, RSVP, Crossword, Maps

**Step 2: Compare against Joy site screenshots**

Check for:
- Background tile visibility (should be subtle, not overwhelming)
- Photo hero quality and cropping
- Button consistency (all outline pills)
- Color harmony
- Mobile layout integrity

**Step 3: Fix any issues found**

**Step 4: Final commit**

```bash
git add -A
git commit -m "style: visual polish from Playwright review"
```

---

### Task 11: Crossword page — light touch alignment

**Files:**
- Modify: `src/pages/Crossword.jsx` (minimal)

**Step 1: Verify crossword page looks good with new background**

The sketch tile background should show through on the crossword page. The game UI should still be readable. If the tile is too busy behind the grid, add a `bg-cream-light/90` backdrop to the game container.

**Step 2: Commit if changes needed**

```bash
git add src/pages/Crossword.jsx
git commit -m "style: crossword page background refinement"
```
