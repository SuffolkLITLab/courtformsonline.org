# Massachusetts legal checkup

Implemented at `/ma/checkup`; linked from the Massachusetts home page and included in the sitemap.

## Experience

Five areas with 26 recognizable situations:

- **My home:** eviction/property-tax cases; repairs/lockouts; moving/deposits/old eviction records; disability accommodations; objections about eviction records or judgments.
- **Money, benefits & work:** debt collection; MassHealth/Social Security; workplace accommodations; new-car repairs; SNAP estimates; suing to collect a debt.
- **Children, family & safety:** protection from abuse; care for a child; child-support collection problems; existing family/care cases; marriage without waiting.
- **School:** special education evaluations; independent evaluations; school records; translation and interpretation.
- **Records & court:** juvenile/eviction records and name changes; court access; missed hearings; review of court decisions; appeal papers; other court paperwork.

The visitor picks an area and selects **all** situations that fit. Selecting a situation stays on the same screen; selecting it again removes it. “Done with this area” returns to the area overview. That overview shows the number of reviewed areas, selected situations, and areas reviewed with no selections. Visitors may explore any other area, then choose “See my summary.” The summary groups their selections by area and deduplicates tools shared by multiple situations. It remains possible to review just one area or finish with no selections.

The overview shows all five areas together, plus a summary button and Back (seven controls). Situation screens have at most six controls including Back: three situation buttons plus paging and “Done with this area”; summary pages have up to three result links, three navigation buttons, and two low-emphasis help links. Areas with no more than four situations can show them all with one Done button. Longer areas paginate without adding a deeper level. Selections persist across pages, and the last page can cycle back to the first to edit earlier choices. The site's shared navigation and footer are outside this count. Results are paged, and the last page returns to the first. Browser printing includes all results, not just the visible page. Buttons use text labels without decorative arrows or plus/minus icons.

The interface says “Takes about 5 minutes,” a design target rather than a measured usability result. The hierarchy remains three levels: areas, situations, summary. Multiple selections and returning to the overview necessarily take more than three total clicks. Completing a linked interview takes additional time.

No account, names, free text, case numbers, income amounts, or eligibility answers are collected. Selections are React state only: no answer storage, URL parameters, analytics events, or submission endpoint. Screen and pagination changes use browser history while preserving Next.js router state; no selections are written to history. The visible Back button uses the same history as browser Back/Forward, and there is no navigation trap. Older summary pages are clamped when edited answers reduce the results. Reloading/closing the page clears choices. Tool links open separately so the checkup stays available.

## Source review (2026-10-22)

The presumed `~/all_repos` directory was absent. Sources were found at `~/all_interviews/repos`, with an existing September 14 inventory at `~/all_interviews/massachusetts-2026-09-14`.

Fetched both live endpoints and compared their records against the site's Massachusetts source, exclusion, and jurisdiction rules:

- https://apps.suffolklitlab.org/list?json=1
- https://interviews.gbls.org/list?json=1
- Local filtering implementation: `src/data/fetchInterviewData.ts` and `src/config/formSources.config.js`.

There are 61 included interviews across 54 local repositories. Reviewed descriptions, eligibility metadata, corresponding YAML entrypoints, and selected screening/introductory logic. This is a routing/content review, not a full legal or runtime audit of each interview.

`ma-checkup-inventory.csv` accounts for all 61 interviews, their exact source entrypoint, and disposition. `src/config/maCheckup.json` contains the editable user-facing copy and explicit filename mappings. Fifty-seven unique tools are direct recommendations. Two more child-care interviews are reached through the Care Type Finder. Only the two professional representation tools remain directory-only. Supporting papers now have contextual descriptions explaining when they may be useful and what they do not replace.

At build time the route uses the existing `fetchInterviews('ma')` pipeline. Matching uses exact interview filenames, and URLs use the current indexed title and the site's existing slug function. A removed/unavailable interview is omitted, with an incomplete-results message. The site's static deployment must be rebuilt to pick up index changes.

## Coverage after expansion

The live Massachusetts inventory has 61 interviews. Coverage is **57 direct recommendations + 2 routed through Care Type Finder + 2 directory-only representation tools**. A generic directory link does not count as a specific checkup route.

Seven new situations add 17 previously unmapped interviews:

| Situation or contextual placement                    | Newly covered interviews                                                                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I want a court decision reviewed or paused           | Petition to Single Justice; Motion to Stay General; Motion to Reconsider                                                                                        |
| I need help with papers for an appeal                | Civil Appeal Entry Form; Civil Docketing Statement; Appellant informal brief; Appellee informal brief; Enlarge Time to File; Appeals Court Miscellaneous Motion |
| I need to complete other court paperwork             | Notice of Appearance; Civil Action Cover Sheet; CARI Request                                                                                                    |
| I disagree with a request about an old eviction case | Objection to petition to seal an eviction or to deem judgment satisfied                                                                                         |
| I want to estimate my food benefits                  | Massachusetts SNAP Calculator                                                                                                                                   |
| I am suing someone to collect a debt                 | Affidavit of address verification                                                                                                                               |
| I need to get married without waiting                | Marriage Without Delay                                                                                                                                          |
| Existing child-care and family-case situations       | Affidavit Disclosing Care or Custody Proceedings                                                                                                                |

Stage and role distinctions remain in the copy: a debt defendant does not get the creditor's address-verification form; a tenant seeking sealing does not get an objection to sealing. The appeal entry form is described as following a Notice of Assembly, brief extensions do not imply an extension to start an appeal, reconsideration is for an Appeals Court decision, and informal briefs are for self-represented parties. No deadlines or eligibility decisions are calculated here. Supporting-paper descriptions explain their limited purpose, and the child-related affidavit notes that another interview may already include it.

The two indirectly reached tools are **Caregiver authorization or temporary agent affidavit** and **Petition for Guardianship of a Minor**. Their links are present in the local Care Type Finder source; this is source verification, not an end-to-end execution of that interview.

The two directory-only interviews are **Notice of Limited Appearance Representation** and **Notice of Entry as Attorney or Representative for Immigration Court**. These remain outside the public checkup because they are for lawyers or other authorized representatives, not requests to find representation.

This accounts for the indexed consumer-facing interviews, not all possible legal needs in Massachusetts. More choices may affect completion time; “Takes about 5 minutes” remains a target that needs user testing.

## LIFT inspiration and boundaries

[LIFT Wisconsin's Legal Tune Up](https://liftwisconsin.org/legal-tune-up/) presents practical opportunities such as dealing with eviction records, debt harassment, child support, and license problems. Its public description also includes public-record integrations and guided form completion. The JavaScript application itself was not inspected beyond its publicly accessible shell.

The MA checkup borrows the everyday-problem framing and the idea of finding possible help before knowing a legal category. It does not claim to search records or reproduce LIFT's eligibility or state-agency integrations.

Specific routing decisions grounded in the MA sources:

- **Child support:** `HelpForChildSupportObligors/data/questions/dbd-01-intro.yml` explicitly says it cannot change the court-ordered amount. Recommendations describe DOR/CSE collection relief and related license problems, not a general modification or driver's-license service.
- **Criminal records:** the indexed GBLS interview is juvenile sealing. Do not describe it as adult criminal sealing or expungement.
- **Child caregiving:** start with Care Type Finder, which already distinguishes guardianship, caregiver authorization, and temporary agency. Avoid recommending guardianship indiscriminately.
- **Eviction records:** the existing sealing interview performs screening. The checkup does not reproduce waiting periods or declare someone eligible.
- **Social Security:** a waiver/repayment tool is not an appeal disputing whether an overpayment happened. Its local YAML uses `can_i_use_this_form`, while the site normalizes `can_I_use_this_form`; the checkup copy therefore states the limited purpose directly.
- **SNAP:** the calculator's description expects familiarity with SNAP rules. The recommendation explicitly describes an estimate for someone familiar with SNAP rules or working with a knowledgeable helper, not an application or eligibility decision.
- **Adult guardianship:** the care-plan report is for an already appointed guardian, not an appointment petition or initial report.
- **Court paperwork:** appeal forms, cover sheets, appearances, CARI, and care/custody affidavits are not themselves evidence that someone has a legal need. Offer them in an explicit paperwork situation or alongside a relevant family case, with descriptions that distinguish their supporting role.
- **Professional tools:** limited appearance and immigration representation forms are not consumer immigration or representation services.

No-match and no-selection states offer the full directory and [Massachusetts Legal Resource Finder](https://masslrf.org/en/home), and do not imply that the visitor has no legal needs. Relevant summaries flag existing deadlines without attempting to calculate them. Safety selections include immediate-danger guidance.

## Validation

The checkup suite passes all 12 tests, including Back/Forward selection retention and restoring a summary after its results shrink. It exercises all 26 situations, selection and removal across pages and areas, the approximate five-control target, every results page, missing-index behavior, duplicate recommendations, renamed tools, and separation of creditor/debtor and sealing/objection roles. The sitemap suite also passed previously.

Live matching using the actual `fetchInterviews('ma')` pipeline returned 61 indexed interviews, 57 unique recommendations, and zero missing mappings or source-fetch errors. All 61 source files in the inventory exist locally. A source-only TypeScript check passes.

Chromium checks verified the expanded multi-page area at 390px, combining the two appeal situations and court paperwork, and all 13 resulting tools and the two help links appearing in print. Axe reported no violations in the checked situation screen, and there were no browser runtime errors or horizontal overflow. Earlier checks also inspected the root and summary at 390px and 1280px and opened a real form detail page.

The browser initially used an old Next fetch-cache snapshot with only 54 Suffolk records, which omitted the informal-brief tools. The two generated MA source-cache entries were backed up to `/tmp/ma-checkup-stale-fetch-cache` and refreshed, then the local dev server was restarted. The full browser check passed against refreshed data. This does not change the site's static-export behavior: an export needs a fresh index at build time.

All 17 Jest suites pass (106 tests). Source-only TypeScript checking and lint on changed source files pass. A production build from a clean snapshot of the PR passes, as does the GitHub Actions build. The unrelated local `test_helpers.ts` and `test-build.js` files are excluded from this PR; the former prevents building directly in the working directory because it imports a `.ts` extension. No production deployment was performed.

Before calling the time estimate validated, try the flow with Massachusetts residents, including phone and screen-reader users. In particular, assess whether the grouped benefits and family-case choices are clear enough and whether people notice opportunities they did not already recognize as legal problems.

Browser navigation verification: starting from the Massachusetts homepage, tested situation-page Back/Forward, the visible Back button, summary pagination, returning all the way to the homepage, and Forward back into the checkup. No browser runtime errors occurred. Source-only TypeScript checking also passes.

Generic directory and legal-help links now appear below the matched recommendations on every summary page. They do not count as matching tools or create pagination. “More options” only advances through actual tool recommendations. The two low-emphasis referral links are additional to the main action controls. A regression test and mobile browser check confirm that two matched repair tools no longer create an extra page just for directory/help links.

PR review follow-up: Claude identified category cards remaining hidden when switching from search to the checkup, print rules competing with Bootstrap, and stale navigation restored after answers were cleared. These are fixed, with regression tests for mode switching during an in-flight search and fresh mounting. A Chromium check appended the competing hidden rule last and verified that all four test recommendations printed while only three appeared onscreen. Claude `/simplify` then consolidated repeated navigation, pagination, and selection logic; the full test suite, source type check, changed-source lint, and browser check passed afterward.
