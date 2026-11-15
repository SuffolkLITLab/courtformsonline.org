The PR build uses these catalog fixtures to compile and export the site without
depending on the availability of the interview servers. Suffolk entries are a
representative subset of the saved public catalog, with the merged family topic
metadata applied. The original five other providers use explicitly labeled test records. The LAWV
catalog records its eight public listings without interview answers.
No interview answers or private data are included.

The fixture includes the twelve student forms, existing child-guardianship tools,
and examples from other topics. Keep at least one catalog for every configured
provider; the fixture tests check that coverage.

Only the `Build Application` workflow opts into `scripts/ci-catalog-fetch.cjs`.
The Pages deployment workflow continues to use live catalogs. These fixtures
are test inputs and are never a fallback for a production deployment.
