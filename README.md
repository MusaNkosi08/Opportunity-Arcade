# OPPORTUNITY ARCADE

**Insert coin. Level up your future.**

Opportunity Arcade is a production-style vanilla HTML5/CSS3/JavaScript prototype for a verified youth opportunities portal aimed at young South Africans. The arcade framing turns searching into a quest, saved opportunities into an inventory, filters into difficulty settings, and deadlines into arcade timers.

> **Important:** opportunity records link to official provider pages. Availability, eligibility and closing dates can change, so verify the current details on the provider page before applying.

## Tech stack
- Semantic HTML5
- CSS3, Flexbox, CSS Grid and CSS custom properties
- Vanilla JavaScript modules
- JSON dataset
- localStorage for saved opportunities, achievements and checklists
- sessionStorage for recently viewed state
- Web Share API with clipboard fallback
- No frontend framework or build step

## Pages
- `index.html` — Arcade Lobby
- `opportunities.html` — Game Selection Screen
- `opportunity.html` — Mission Briefing
- `career-match.html` — CV Match and Opportunity Finder
- `resources.html` — Training Grounds
- `contact.html` — Insert Coin

## Features
- Keyword search across title, organisation and description
- Multi-select category filters
- Location filtering
- Closing-soon and closing-month filters
- Beginner/Intermediate/Advanced difficulty
- Newest, closing-soonest and alphabetical sorting
- Live deadline labels
- Save/inventory system
- Achievement HUD
- Application checklist saved per opportunity
- Recently viewed session marker
- Share button
- Responsive mobile navigation
- Persistent player profiles with avatar selection
- Browser-only CV keyword matching against the opportunity dataset
- Profile-scoped XP, saved posts and checklist progress
- Form validation and success states
- Accessible focus states and screen-reader live regions
- `prefers-reduced-motion` support
- Scam warnings and official-source verification notices

## Setup
No npm install is required.

1. Clone or download the repository.
2. Serve the folder with a local static server. For example:
   `python3 -m http.server 8000`
3. Open `http://localhost:8000`.
4. Do not open the HTML files directly with `file://` because browsers may block JSON `fetch()` requests.

## Deployment
The site is suitable for GitHub Pages, Netlify or Vercel as a static site. Publish the repository root.

## Data
Edit `data/opportunities.json` to add or update records. Each record should retain:
- title
- organisation
- category
- location
- closing date
- experience
- description
- requirements
- qualifications
- documents
- steps
- application URL
- organisation details
- date added
- last updated

The dataset contains real programmes and opportunity-search portals sourced from first-party provider pages. Listings with no published closing date use `null` and display "OPEN · VERIFY DEADLINE" rather than inventing a date. Keep the source URL and `lastUpdated` field current when refreshing records.

## Testing evidence checklist
- [x] Navigation works across all five pages
- [x] Search and filters render JSON records
- [x] Empty state and reset controls exist
- [x] Save state persists with localStorage
- [x] Achievement state persists with localStorage
- [x] Checklist state persists per opportunity
- [x] Responsive CSS covers small mobile to desktop
- [x] Keyboard focus states are visible
- [x] Form fields have labels and validation
- [x] Reduced-motion preference is respected
- [x] Official source links and verification warnings are visible

## Known limitations
- Listings are manually sourced and are not connected to a live verification backend; availability must be checked on each provider page.
- Forms are front-end demonstrations and do not send messages to a server.
- Some providers publish rolling or changing availability and do not publish one closing date.
- Organisation logos and real application links are intentionally not supplied.
- Profiles are stored locally in the browser and are not synchronized across devices.
- A production release should add server-side validation, moderation, authentication, a content-management workflow, analytics with appropriate privacy controls, and automated expiry verification.

## Recommended future improvements
1. Add an administrator verification dashboard.
2. Connect to a secure database and API.
3. Add automated opportunity expiry and review queues.
4. Add organisation verification badges based on a real verification process.
5. Add user accounts and cross-device saved inventories.
6. Add richer analytics without collecting unnecessary personal data.
7. Add automated accessibility testing to CI.
8. Add Playwright/Cypress end-to-end tests.
9. Add content moderation and reporting workflows.
10. Add production monitoring and error reporting.

## Suggested screenshots
Capture:
1. Arcade Lobby desktop
2. Game Selection with filters
3. Mission Briefing
4. Training Grounds
5. Insert Coin form validation
6. Mobile navigation and opportunity cards

## Wireframe outline
Lobby → Search → Featured quests → Categories → High Scores → Training → Firewall alert

Game Selection → Search/filter controls → Result count → Opportunity cards → Empty state

Mission Briefing → Dossier → Countdown → Requirements → Loadout → Steps → Checklist → Start Mission

Training Grounds → Six power-up cards → Verification guidance

Insert Coin → Four validated forms → Success state
