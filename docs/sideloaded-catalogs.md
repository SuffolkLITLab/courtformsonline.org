# Supplemental catalog metadata

`src/config/supplementalCatalogMetadata.config.js` supplies discovery metadata
for providers whose public catalogs omit it. This is curated production content,
independent of CI fixtures. Entries are keyed by provider and exact interview
filename, then merged into fetched metadata before normalization and topic grouping.

Legal Aid of West Virginia's full live catalog is fetched from
<https://docs.lawv.net/list?json=1>. Its current eight interviews lack LIST topics
and jurisdiction. Local supplements provide those fields and public descriptions:
six housing tools, a name-change petition, and Kinship Connector. The source still
controls the interview list, filenames, titles, start links, and visibility.
Unlisted interviews are removed before supplements are applied. Future public
interviews without a supplement remain visible under Other topics using the
provider's West Virginia default; they do not need a manual URL-list update.

Descriptions follow each tool's public introduction. Kinship Connector's
eligibility wording includes relatives anticipating a caregiving role and the
exclusion for children in an abuse and neglect court case. Further information:
[Kinship Connector](https://legalaidwv.org/kinship-connector/) and
[Renters Rights West Virginia](https://legalaidwv.org/renters-rights-west-virginia).
Do not invent review dates, filing fees, completion times, or maturity ratings.
Local supplements explicitly replace the named metadata fields; remove obsolete
supplements when the provider supplies suitable metadata itself.

Only providers configured for a state are used on its state pages. The
all-jurisdiction collection considers all configured providers, then uses LIST
topics to select its child-care and guardianship tools. Housing and name-change
tools appear on West Virginia's regular pages, not the emergency-planning index.
A source failure is reported normally; CI fixtures are never a production fallback.

A new supported state also needs a `pathToServerConfig` entry and jurisdiction
aliases. These generate its navigator entry, landing page, topic pages, all-forms
page, individual form pages, and sitemap entries. Verify search results retain that
state's path. Filing/courthouse links use general guides where an authored state
guide does not exist.
