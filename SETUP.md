# StuGro site: setup and content checklist

Everything you need to fill in lives in **`/content`**. You should never need to touch `/components` to update content.

- Any value starting with `TODO_` is a placeholder. The site hides it and shows a graceful fallback ("Link coming soon", a designed video frame, and so on), so nothing breaks while you fill things in.
- Find every placeholder with: `grep -rn "TODO_" content` (or search `TODO_` in VS Code).
- Blocks with `isSample: true` show a small dashed **"Sample data"** tag on the page. Flip each to `false` once its data is real. To hide all tags at once, set `site.showSampleBadges = false` in `content/site.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 (or the next free port)
npm run build      # production build, type-checks everything
```

If a content file is filled in with the wrong shape (a missing field, or a string where a number belongs), `npm run build` fails and names the line.

---

## 1. `content/site.ts`: identity, contact, socials, team, stats

| Key | What to provide | Format / example |
| --- | --- | --- |
| `site.name` | Brand name. Currently **"StuGro"** to match the logo; the brief said "STU Grow". Pick one. | `"StuGro"` |
| `site.url` | `TODO_SITE_DOMAIN`: the production URL, used for canonical links, sitemap, and share images | `"https://stugro.org"` |
| `site.foundedYear` | `TODO_FOUNDED_YEAR` | `"2024"` |
| `site.email` | `TODO_CONTACT_EMAIL`: public inbox. Enables mailto links in the footer and signup fallback. | `"hello@stugro.org"` |
| `site.signupUrl` | `TODO_SIGNUP_FORM_URL`: Google Form / Tally / etc. Every "Sign up" button uses it. | `"https://forms.gle/..."` |
| `socials[].url` | `TODO_SOCIAL_TIKTOK_URL`, `TODO_SOCIAL_INSTAGRAM_URL`, `TODO_SOCIAL_YOUTUBE_URL` | full profile URL, `https://www.tiktok.com/@handle` |
| `socials[].handle` | `TODO_SOCIAL_*_HANDLE` | `"@stugro"` |
| `socials[].blurb` | Draft one-liners about each channel. Edit to match what you actually post. | one sentence |
| `stats` | **Sample numbers.** 3–4 figures you can stand behind. Set `isSample: false`. | `{ value: 120, suffix: "+", label: "students taught" }` |
| `team.members` | `TODO_TEAM_MEMBER_1_NAME` … plus roles. Optional `photo` (put the file in `/public/team/`). Empty the array to hide the section. | `{ name: "Alex Kim", role: "President", photo: "/team/alex.jpg" }` |
| `pillars` | Homepage pillar copy (draft). Check every claim is true. | strings |

**Signup fallback:** if `signupUrl` is empty, buttons fall back to emailing `site.email`. If that's empty too, they link to the class schedule.

## 2. `content/social.ts`: `/social`

| Key | What to provide | Format |
| --- | --- | --- |
| `latestVideo.id` | `TODO_LATEST_YOUTUBE_VIDEO_ID` | the part after `v=`: `youtube.com/watch?v=`**`dQw4w9WgXcQ`** → `"dQw4w9WgXcQ"` |
| `latestVideo.title` / `.description` | `TODO_LATEST_VIDEO_TITLE`, `TODO_LATEST_VIDEO_DESCRIPTION` | strings |
| `recentPosts.posts[]` | Six **sample** posts with `TODO_POST_URL_1…6`. Replace with real ones, newest first. | `{ platform: "tiktok", kind: "short", title, url, date: "2026-09-18", thumbnail? }` |

`kind` sets the tile shape: `"short"` is tall, `"post"` is square, `"video"` is 16:9. `thumbnail` is optional; without one, a typographic cover is generated. YouTube thumbnails (`https://i.ytimg.com/...`) are already allowed. For other image hosts, add them to `images.remotePatterns` in `next.config.ts`, or save images into `/public`.

## 3. `content/curriculum.ts`: `/teaching` curriculum

- The **four unit titles and summaries come from your flyer** (Stocks & Investing, Cash Management, Financial Literacy, Real World Applications).
- The **lessons inside each unit are sample topics.** Replace them with your real lesson plan.
- Format: `{ id, title, summary, lessons: [{ title, summary?, duration? }] }`. Add, remove, or reorder freely. Numbering updates automatically.

## 4. `content/schedule.ts`: `/teaching` class times

- The first class is **from the flyer**: *Finance Class for Kids*, ages 10–14, online, Saturdays 2:30–3:30 PM, new batch monthly, "this month is free".
  - ⚠️ **The flyer doesn't state a timezone. I assumed ET because you're in New Jersey.** Confirm it.
  - `link`: `TODO_CLASS_MEETING_LINK` (optional Zoom/Meet or info link).
- The second class ("Investing Basics for Teens (sample)") is **invented** to show how multiple rows look. Replace or delete it.
- `open: false` shows "Closed" and hides that class's signup. `badge` is the short highlight chip.
- `classHighlights` feeds the hero card on `/teaching`. Update `offer` ("This month is free") when it changes.

## 5. `content/portfolio.ts`: `/investing`

**Everything in this file is sample data. It is NOT your real portfolio.** Replace all of it, then set `portfolio.isSample` and `thesis.isSample` to `false`.

| Key | What to provide | Format |
| --- | --- | --- |
| `portfolio.inceptionDate` | `TODO_PORTFOLIO_INCEPTION_DATE` | `"2025-01-15"` |
| `portfolio.asOf` | Date the numbers were last updated | `"2026-09-19"` |
| `portfolio.benchmarkName` | What you compare against | `"S&P 500"` |
| `portfolio.cashWeight` | Cash as a % of the portfolio | `6` |
| `portfolio.summary` | `totalValue` and `startingValue` in dollars | numbers |
| `holdings[]` | One per position. Weights + cash should sum to about 100. | `{ ticker, name, sector, weight, entryDate, entryPrice, currentPrice, rationale }` |
| `performance[]` | Monthly series, **both indexed to 100 at the start** (so 112 means +12%) | `{ date: "2025-01", portfolio: 100, benchmark: 100 }` |
| `thesis` | Draft "how we decide" principles. Rewrite in your words. | `{ intro, principles: [{ title, body }] }` |
| `disclaimer` | Full disclaimer text. **Have an adult/advisor review it.** | string |

Returns in the holdings table are calculated from `entryPrice` → `currentPrice`. The chart rebases to 0% at the start of whichever range (6M / 1Y / All) is selected.

## 6. `content/glossary.ts`: homepage ticker tape

General finance definitions. Safe as-is; edit or add freely.

## 7. Brand assets

- `brand_assets/logo-source.png` and `brand_assets/flyer-finance-class-for-kids.png` are copies of the two screenshots you left in the folder. The originals are untouched.
- `public/brand/stugro-*.png` are transparent logo variants I extracted from that screenshot (full logo, bull mark, and inverse versions for dark backgrounds).
- ⚠️ **They come from a ~460px screenshot, so they're soft at large sizes.** If you have the original logo file (ideally SVG, or a PNG at 1000px+ with transparency), drop it in and replace the four files in `public/brand/` with the same names.

---

## Re-skinning (when your reference images arrive)

The whole visual system is driven from **`styles/tokens.css`**:

- **Color:** `--ink`, `--mint`, `--grow`, `--paper`, and friends (sampled from your logo: navy `#0F2F45`, mint `#77BE9B`)
- **Type scale:** `--text-*`, fluid display sizes with tightening tracking
- **Spacing rhythm:** `--gutter`, `--space-section`, `--space-block`
- **Radius, shadows, depth layers:** `--radius-*`, `--shadow-raised`, `--shadow-float`
- **Motion:** `--ease-out`, `--ease-in-out`, `--ease-drawer`, durations
- **Charts:** `--chart-portfolio`, `--chart-benchmark` (palette validated for colorblind separation and contrast; re-validate if you change them)
- **Grain intensity:** `--grain-opacity`

**Fonts** are set in `app/layout.tsx`: Archivo (display; its width axis powers the condensed headlines) and Figtree (body). JS motion presets (springs, reveal stagger) are in `lib/motion.ts`.

## Where things live

```
app/                 routes: page.tsx (home), social/, teaching/, investing/, plus sitemap, robots, OG image
components/layout/   Header (active nav + scroll progress), MobileNav, Footer, PageTransition
components/ui/       primitives: ButtonLink, Reveal, CountUp, Magnetic, PageHero, SectionHeading, VideoThumb, SampleBadge
components/home|social|teaching|investing/   page sections
content/             ← everything you edit
styles/tokens.css    ← everything you re-skin
screenshot.mjs       node screenshot.mjs <url> [label] [--width=390] [--full] [--reduced] [--click=selector]
```
