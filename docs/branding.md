# Branding

The header uses `public/court-forms-online-logo.svg`: the existing gold LIT Lab
torch and a white, outlined “Court Forms Online” wordmark. Its 252 × 48 viewBox
preserves the previous header metrics: a 22 × 48 torch, an 8px gap, and a 222px
wordmark set at a nominal 24px. The image scales down on narrow screens to leave
room for the navigation toggle.

The SVG uses **Nunito ExtraBold (800)**, a visually similar substitute for the
Museo Sans Rounded requested in issue #174, with the lettering scaled to match
the existing wordmark’s width.
The lettering is outlined, so visitors do not need to download or install the
logo font. The source is the [Google Fonts Nunito variable font](https://github.com/google/fonts/blob/main/ofl/nunito/Nunito%5Bwght%5D.ttf),
shaped with kerning at weight 800 before conversion to SVG paths. Its license
is retained in [branding/Nunito-OFL.txt](branding/Nunito-OFL.txt).

Body text uses **Albert Sans**, including Bootstrap controls. The normal and
italic variable fonts (weights 100–900, Latin subset) are bundled as WOFF2 files
in `src/app/fonts` and loaded through `next/font/local`, with `font-display: swap`
and system fallbacks. Builds and visitors do not need a Google Fonts connection.
The files come from [Google Fonts](https://fonts.google.com/specimen/Albert+Sans),
with the upstream license in `src/app/fonts/AlbertSans-OFL.txt`.
