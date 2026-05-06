# Editing rootedcommunity.org

A practical guide for editing the website. No coding required — everything happens in **Sanity Studio**, a content management system that lives at:

**https://rooted-community.sanity.studio/**

Content you publish there appears on https://rootedcommunity.org/ within a couple of minutes (the site rebuilds automatically when you publish).

---

## Logging in

Visit https://rooted-community.sanity.studio/ and sign in. The first time you sign in, you'll be using whatever email address is associated with your invite. If you're not invited yet, ask Benny to add you — it takes 30 seconds on his end.

---

## What you'll see

The Studio sidebar is organized by what each item controls on the website:

- **Site Settings** — global stuff that appears on every page: the site title, tagline, contact email, partnerships email, mailing address, EIN, 501(c)(3) status, Form 990 link, fiscal sponsor info, and social media links. Edit this once, and the changes show up site-wide.
- **Pages** — the fixed pages of the site (Home, Mission, Impact, Get Involved, Contact). Each page has its own editor with the fields specific to that page.
- **Programs** — the seven programs (Housing Support, Immediate Needs Support, etc.). Each one has its own detail page on the website.
- **Impact Metrics** — the headline statistics that appear on the homepage and impact page.
- **People** — staff, board, advisors, volunteers. Used on the Team page and grouped by type.
- **Partners** — coalition partners, funders, fiscal sponsors, in-kind supporters. Used on the Partners page.

Click any item in the sidebar to expand it.

---

## Editing existing content

### General flow (works for every type)

1. Click the type in the sidebar (e.g. **Programs**).
2. Click the specific document you want to edit (e.g. **Housing Support**).
3. Make your changes. Studio auto-saves drafts as you type — you don't need to hit save.
4. When ready, click the green **Publish** button at the bottom right.
5. Wait ~1–2 minutes for the website to rebuild, then refresh the live page to see your changes.

### Drafts vs. published

When you make a change, Studio creates a **draft** that only you can see. The live site shows the **published** version until you click Publish on the new draft. This means you can work on changes over multiple sessions without anything going live until you're ready.

If you want to discard a draft without publishing, click the three-dot menu next to the Publish button → **Discard changes**.

---

## Adding new content

### A new person (staff, board, advisor, or volunteer)

1. Click **People** in the sidebar.
2. Click the **+ Create** button at the top.
3. Fill in:
   - **Full Name** (required)
   - **Role / Title** — e.g., "Executive Director" or "Board Chair" (required)
   - **Type** — Staff, Board, Advisor, or Volunteer (required)
   - **Pronouns** — optional, only displayed if filled in
   - **Bio** — rich text; you can format paragraphs, add links, etc.
   - **Photo** — square or close-to-square works best (face-centered crop). Click the image area to upload.
   - **Email** — optional, displayed as a clickable link if added
   - **Sort Order** — lower numbers appear first within their type group. Defaults to 100.
4. Click **Publish**.

### A new partner

1. Click **Partners** in the sidebar.
2. Click **+ Create**.
3. Fill in:
   - **Name** (required)
   - **Type** — Coalition Partner, Funder, Fiscal Sponsor, or In-kind Supporter (required)
   - **Logo** — upload a logo. Transparent PNG is best; the site applies a monochrome filter for visual consistency.
   - **Website URL** — optional
   - **Description** — optional context, displayed on the partners page
   - **Year Partnership Began** — optional
   - **Featured on homepage strip** — check if you want this partner shown on the homepage logo wall
   - **Sort Order** — lower numbers appear first within their type group
4. Click **Publish**.

### A new impact metric

1. Click **Impact Metrics** in the sidebar.
2. Click **+ Create**.
3. Fill in:
   - **Value** — the headline number, like "311" or "2/3" (required)
   - **Label** — what it measures, like "community members served in 2025" (required)
   - **Context** — optional rich-text explanation of how it's calculated
   - **Source** — citation or attribution, like "Internal program tracking, 2025"
   - **Year** — calendar year the data covers
   - **Sort Order** — for display ordering
4. Click **Publish**.

To feature a metric on the **Impact page**, open the **Pages → Impact** singleton and add the metric under "Featured Metrics."

### A new program

1. Click **Programs** in the sidebar.
2. Click **+ Create**.
3. Fill in:
   - **Program Name** (required)
   - **Slug** — auto-generates from the name, but you can customize. This becomes part of the URL (e.g. `housing-support` → `/programs/housing-support/`).
   - **Summary** — 1–2 sentences for the program tile (max 280 characters)
   - **Who it serves** — short paragraph
   - **How it works** — rich text, longer narrative
   - **Eligibility** — short paragraph
   - **Outcome** — rich text describing what changes for participants
   - **Hero Image** — used on the program detail page and program tile
   - **Referral / Intake URL** — optional external link
   - **Featured on homepage** — check if you want this program shown on the homepage grid (otherwise it shows only on the programs index page)
   - **Sort Order** — controls order on the programs index
4. Click **Publish**.

---

## Editing the singleton pages (Home, Mission, Impact, Get Involved, Contact)

These pages each have one document — you don't create new ones, you just edit the existing.

### Home

Controls the homepage hero (the big section at the top of the site).

- **Hero Eyebrow** — small label above the headline (currently "Rooted Community")
- **Hero Headline** — the main mission line (currently "A community committed to healing the trauma of incarceration.")
- **Hero Subhead** — supporting paragraph below the headline
- **Hero Image** — single hero photo. Optional but high-impact.
- **Primary CTA / Secondary CTA** — button labels and links (currently "Our mission" and "Our programs")
- **Featured Impact Stat** — one big number to surface on the homepage
- **Partners Strip Heading** — text above the partners logo wall

### Mission

Controls the `/mission/` page.

- **Mission Statement, Vision Statement** — short paragraphs
- **Origin Story** — rich text, longer narrative
- **Theory of Change** — three rich-text blocks (Problem, Approach, Outcome)
- **Pull Quote** — optional anchor quote with attribution

### Impact

Controls the `/impact/` page.

- **Page Intro** — rich text framing the metrics
- **Featured Metrics** — pick which Impact Metric documents to display, and in what order (drag to reorder)
- **Year in Review** — long-form annual snapshot rich text

### Get Involved

Controls the `/get-involved/` page. Each section has its own intro:

- **Donate** — intro + donation tiers (amount + outcome) + donate URL
- **Volunteer** — intro + CTA
- **Partnerships** — intro pitch to foundation funders
- **Refer** — intro + referral URL

### Contact

Controls the `/contact/` page.

- **Channels** — list of contact addresses, each with a label (e.g. "General", "Partnerships and funders") and a description

If Channels is empty, the page falls back to whatever's in **Site Settings** (general contact email, partnerships email, mailing address) — so for many cases, you only need to edit Site Settings and leave the Contact page channels empty.

---

## Working with images

### Uploading

Click any image field in Studio and drag a file in, or click to browse. Sanity stores the original at full resolution and generates resized versions automatically — you don't need to resize images yourself.

### Hotspot

After uploading, click the image and you'll see a **hotspot** crop tool. The hotspot tells the site "this is the most important part of the image — keep it visible no matter how the image is cropped on different screens." For portraits, set the hotspot on the face. For landscape photos, set it on the focal subject.

### Alt text

Every image field also has an **Alternative Text** subfield. Always fill this in — it's what screen readers announce, and it's what shows in browsers if the image fails to load. Describe what's in the image, briefly. Examples:

- ✅ "A small group sitting in a circle, three women, one man, all leaning in."
- ✅ "Logo: Community Passageways."
- ❌ "An image of a person." (too generic)
- ❌ "DSC_0234.jpg" (filename — useless to a screen reader)

For purely decorative images, you can leave alt text blank — but you almost never want decorative-only images on a marketing site.

---

## When you publish, what happens?

1. Studio sends your changes to the Sanity database.
2. A webhook fires, telling GitHub "content changed, please rebuild the site."
3. GitHub Actions runs a build (~1–2 minutes), pulling the latest content from Sanity and generating new HTML.
4. The new site goes live at https://rootedcommunity.org/.

If something doesn't show up after a few minutes, hard-refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows). Browsers cache pages; the rebuild succeeded but your browser is showing the old version.

---

## What if I make a mistake?

Every change is reversible:

- **Before publishing** → click the three-dot menu → **Discard changes**.
- **After publishing** → edit again, fix it, publish. The site rebuilds in another minute or two.
- **Major mistake** → contact Benny. There's a version history in Sanity; we can roll back to any prior published version of any document.

You cannot break the website by editing content in Studio. The structure of the site is set by code; Studio only fills in the content.

---

## Things to keep in mind

- **Required fields are marked with a red asterisk.** Studio won't let you publish without them.
- **Empty optional fields are fine.** The website hides sections when their data is missing. So if a program doesn't have a hero image yet, the program tile shows a colored placeholder instead — no broken pages.
- **The Studio doesn't show a preview of how the live site will look.** Studio is for content; the site is at rootedcommunity.org. Publish, wait a minute, refresh the live page.
- **Mobile preview.** Once changes are live, check them on a phone too — most funders look at sites on mobile first.

---

## Common questions

**Can I work on changes without publishing?**
Yes. Edit, leave the draft alone, come back later. Drafts persist across sessions.

**Can I save a draft without publishing?**
Studio auto-saves as you type. There's no separate "Save Draft" button.

**Can two people edit at the same time?**
Yes — Sanity supports concurrent editing. You'll see other editors' cursors and changes in real time.

**What if I accidentally delete something?**
Sanity keeps full version history. Open the document, click the clock icon at the top to browse history, and restore a prior version.

**Where do new programs show up on the site?**
Automatically:
- The programs index page (`/programs/`) lists all programs
- A new detail page is created at `/programs/<slug>/`
- If "Featured on homepage" is checked, it also appears on the homepage grid

**Where do new people show up?**
On the Team page (`/team/`), grouped by type (Staff, Board, Advisors, Volunteers).

**Where do new partners show up?**
On the Partners page (`/partners/`), grouped by type (Funders, Coalition partners, etc.). Partners with "Featured on homepage strip" checked also appear on the homepage logo wall.

---

If you get stuck, screenshot whatever's confusing and send it to Benny. The Studio has a forgiving learning curve, but everyone hits weird edge cases the first few times.
