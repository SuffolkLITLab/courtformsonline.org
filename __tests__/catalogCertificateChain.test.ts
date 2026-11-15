/** @jest-environment node */
import { X509Certificate } from 'node:crypto';
import { rootCertificates } from 'node:tls';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

it('bundles the published GoDaddy CA chain and verifies it to a native trust anchor', () => {
  const pem = readFileSync(
    join(process.cwd(), 'certificates/godaddy-dv-r1-chain.pem'),
    'utf8'
  );
  const certificates = pem
    .match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g)
    .map((c) => new X509Certificate(c));
  expect(certificates).toHaveLength(2);
  const [issuer, cross] = certificates;
  expect(certificates.every((c) => c.ca)).toBe(true);
  expect(issuer.fingerprint256.replace(/:/g, '')).toBe(
    '7A43BC7747D0633FBD90FF900C9242417C027DBDCA05AF72DA9A70E3518DBE2E'
  );
  expect(cross.fingerprint256.replace(/:/g, '')).toBe(
    '7BCB0F2F2D1031A6AF8D61BAA835D2835A3B8BCC26D94A3B048B1655FB81298C'
  );
  expect(issuer.issuer).toBe(cross.subject);
  expect(issuer.verify(cross.publicKey)).toBe(true);
  const anchor = rootCertificates
    .map((c) => new X509Certificate(c))
    .find((c) => c.subject === cross.issuer);
  expect(anchor).toBeDefined();
  expect(cross.verify(anchor.publicKey)).toBe(true);
});

it('supplies the chain to production builds without disabling TLS checks', () => {
  const workflow = readFileSync(
    join(process.cwd(), '.github/workflows/deploy.yml'),
    'utf8'
  );
  expect(workflow).toContain(
    'NODE_EXTRA_CA_CERTS: ${{ github.workspace }}/certificates/godaddy-dv-r1-chain.pem'
  );
  expect(workflow).not.toMatch(
    /NODE_TLS_REJECT_UNAUTHORIZED|rejectUnauthorized|CI_CATALOG_FIXTURES/
  );
});
