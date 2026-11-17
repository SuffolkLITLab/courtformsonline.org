# LAWV catalog certificate chain

On November 15, 2026, `docs.lawv.net` presented a wildcard certificate issued by
GoDaddy TLS Intermediate CA DV - R1v1 but served its older G2 intermediate instead.
Node 22 and 24 could not validate the catalog connection. The bundled CA chain
supplies the missing DV issuer and its cross-certificate to Node's existing G2
trust anchor. The live leaf certificate and private keys are not bundled.

The production build and `npm run dev` use `NODE_EXTRA_CA_CERTS` with this file.
Certificate and hostname validation remain enabled. Restart the dev server after
updating this setting; Node reads the extra certificates when it starts.
For a local live build:

```sh
NODE_EXTRA_CA_CERTS="$PWD/certificates/godaddy-dv-r1-chain.pem" npm run build
```

Both certificates were downloaded from [GoDaddy's official repository](https://certs.godaddy.com/repository).
Their SHA-256 fingerprints match the published values:

- [DV issuer](https://certs.godaddy.com/repository/gd_tls_issuing_dv-r1v1.crt.pem):
  `7A43BC7747D0633FBD90FF900C9242417C027DBDCA05AF72DA9A70E3518DBE2E`
- [R1-to-G2 cross-certificate](https://certs.godaddy.com/repository/gd_tls_root-r1-cross-g2.crt.pem):
  `7BCB0F2F2D1031A6AF8D61BAA835D2835A3B8BCC26D94A3B048B1655FB81298C`

Signature verification confirmed that the issuer and cross-certificate chain to
a GoDaddy G2 root already in Node's native trust store. OpenSSL then verified the
live leaf's chain and `docs.lawv.net` hostname, and Node fetched all eight catalog
records with validation enabled. Regression tests verify the bundled chain's
signatures, published fingerprints, CA constraints, and native trust anchor.

The provider should correct the served certificate chain. Once normal Node fetch
works without the extra chain, remove this file and the build environment setting.
CI catalog fixtures do not require this setting and remain separate from live builds.
