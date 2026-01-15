/**
 * Test for national jurisdiction functionality
 *
 * This test ensures that forms with national jurisdiction codes (NAM-US, NAM-US-US)
 * appear on all jurisdiction-specific pages, not just the default jurisdiction.
 *
 * This feature is important for forms like immigration forms or forms related to
 * national rights (e.g., right to reasonable accommodation) that apply across all states.
 */

import {
  jurisdictionMatches,
  normalizeJurisdiction,
} from '../src/utils/jurisdiction';
import { nationalJurisdictions } from '../src/config/formSources.config';

describe('National Jurisdiction Support', () => {
  it('should have NAM-US and NAM-US-US as national jurisdiction codes', () => {
    expect(nationalJurisdictions).toContain('NAM-US');
    expect(nationalJurisdictions).toContain('NAM-US-US');
    expect(nationalJurisdictions.length).toBeGreaterThan(0);
  });

  it('should match national jurisdiction codes on any state page', () => {
    const states = [
      'Massachusetts',
      'Maine',
      'Michigan',
      'Minnesota',
      'Vermont',
      'Missouri',
    ];

    states.forEach((state) => {
      // NAM-US should match any state
      expect(jurisdictionMatches('NAM-US', state)).toBe(true);
      // NAM-US-US should match any state
      expect(jurisdictionMatches('NAM-US-US', state)).toBe(true);
    });
  });

  it('should match national jurisdiction codes case-insensitively', () => {
    expect(jurisdictionMatches('nam-us', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('NAM-US', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('Nam-Us', 'Massachusetts')).toBe(true);

    expect(jurisdictionMatches('nam-us-us', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('NAM-US-US', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('Nam-Us-Us', 'Massachusetts')).toBe(true);
  });

  it('should handle whitespace in national jurisdiction codes', () => {
    expect(jurisdictionMatches(' NAM-US ', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches(' NAM-US-US ', 'Maine')).toBe(true);
  });

  it('should still correctly match state-specific jurisdictions', () => {
    // State-specific forms should only match their state
    expect(jurisdictionMatches('NAM-US-US+MA', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('NAM-US-US+MA', 'Maine')).toBe(false);

    expect(jurisdictionMatches('NAM-US-US+ME', 'Maine')).toBe(true);
    expect(jurisdictionMatches('NAM-US-US+ME', 'Massachusetts')).toBe(false);
  });

  it('should still correctly match state codes', () => {
    // Two-letter state codes should work as before
    expect(jurisdictionMatches('MA', 'Massachusetts')).toBe(true);
    expect(jurisdictionMatches('MA', 'Maine')).toBe(false);

    expect(jurisdictionMatches('ME', 'Maine')).toBe(true);
    expect(jurisdictionMatches('ME', 'Massachusetts')).toBe(false);
  });

  it('use case: immigration form with national jurisdiction should appear on all state pages', () => {
    // An immigration form might have NAM-US jurisdiction
    const immigrationFormJurisdiction = 'NAM-US';

    // It should appear on all state-specific pages
    expect(
      jurisdictionMatches(immigrationFormJurisdiction, 'Massachusetts')
    ).toBe(true);
    expect(jurisdictionMatches(immigrationFormJurisdiction, 'Maine')).toBe(
      true
    );
    expect(jurisdictionMatches(immigrationFormJurisdiction, 'Michigan')).toBe(
      true
    );
    expect(jurisdictionMatches(immigrationFormJurisdiction, 'Minnesota')).toBe(
      true
    );
  });

  it('use case: national rights form with NAM-US-US should appear on all state pages', () => {
    // A form about national rights (e.g., reasonable accommodation) might have NAM-US-US
    const nationalRightsFormJurisdiction = 'NAM-US-US';

    // It should appear on all state-specific pages
    expect(
      jurisdictionMatches(nationalRightsFormJurisdiction, 'Massachusetts')
    ).toBe(true);
    expect(jurisdictionMatches(nationalRightsFormJurisdiction, 'Vermont')).toBe(
      true
    );
    expect(
      jurisdictionMatches(nationalRightsFormJurisdiction, 'Missouri')
    ).toBe(true);
  });

  it('should normalize state-specific FOLIO codes but not national ones', () => {
    // State-specific FOLIO codes should normalize to state names
    expect(normalizeJurisdiction('NAM-US-US+MA')).toBe('Massachusetts');
    expect(normalizeJurisdiction('NAM-US-US+ME')).toBe('Maine');

    // National codes should not be normalized by normalizeJurisdiction
    // (they're checked separately in jurisdictionMatches)
    // They'll return themselves since they're not in the aliases
    expect(normalizeJurisdiction('NAM-US')).toBe('NAM-US');
    expect(normalizeJurisdiction('NAM-US-US')).toBe('NAM-US-US');
  });
});
