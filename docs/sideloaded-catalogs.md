# Sideloaded catalog listings

`src/config/sideloadedCatalogs.config.js` holds curated production listings for
providers whose public catalog lacks the metadata needed for discovery. These
listings go through the same normalization, topic grouping, jurisdiction filtering,
and form-detail pages as fetched interviews. They do not depend on the provider's
catalog API at build time. The Start tool link still opens the provider's interview.

Each source needs a unique key, display name, base URL, default jurisdiction, and
an `interviews` array. Each interview needs its actual filename, relative start
link, title, LIST topics, and jurisdiction. Use FOLIO state codes such as
`NAM-US-US+WV`. Include the source name in the relevant state's `servers` array in
`formSources.config.js`. The all-jurisdiction family collection also considers
sideloaded sources, selecting members using the same child-guardianship topics.

Kinship Connector's filename and start link come from
<https://docs.lawv.net/list?json=1>. Its topics and jurisdiction are supplied
locally because those fields are absent from the source catalog. Description and
eligibility wording follow Legal Aid of West Virginia's
[Kinship Connector information](https://legalaidwv.org/kinship-connector/) and
[announcement](https://legalaidwv.org/news/our-kinship-connector-tool/), including
the exclusion for children in an abuse and neglect court case. This entry does not
add the provider's other interviews. Do not invent fees, completion times, review
dates, or a form-maturity rating.

If a provider later supplies adequate metadata and is added as a fetched source,
remove the corresponding sideloaded entries in the same change. Keep CI network
fixtures separate: these curated records are real published content.

A new supported state also needs a `pathToServerConfig` entry and jurisdiction
aliases. These generate its navigator entry, landing page, topic pages, all-forms
page, individual form pages, and sitemap entries. Verify search results keep that
state's path and do not lead to another state's form page.
