# Testing Evidence

## Functional test cases

| ID | Test | Expected result |
|---|---|---|
| T01 | Open Lobby | Page loads and navigation is visible |
| T02 | Search "frontend" | Matching opportunity appears |
| T03 | Select multiple categories | Results narrow to selected categories |
| T04 | Select location | Results narrow to location |
| T05 | Select "This Week" | Only near-term records remain |
| T06 | Save an opportunity | Save state changes and persists after refresh |
| T07 | Open mission details | Requirements, loadout and deadline display |
| T08 | Tick checklist | Tick remains after refresh |
| T09 | Share on unsupported browser | Link is copied as fallback |
| T10 | Submit empty contact form | Inline validation appears |
| T11 | Submit valid contact form | Success message appears |
| T12 | Create player profile | Name and avatar are remembered on return |
| T13 | Resize to 320px | Content remains usable without intentional horizontal layout |
| T14 | Enable reduced motion | Heavy animation is suppressed |
| T15 | Keyboard through navigation | Focus is visible and controls are reachable |

## Responsible-content checks
- Records link to official provider or opportunity-search pages.
- Listings still require current eligibility and deadline verification on the provider page.
- Scam guidance is displayed prominently.
- Date added and last updated fields are included in each record.
