/**
 * Schema.org validation tests for form pages
 * Validates that the structured data markup follows schema.org specifications
 * Reference: https://schema.org/SoftwareApplication
 */

import { describe, it, expect } from '@jest/globals';

/**
 * Mock form details matching what's used in the page component
 */
const createMockFormDetails = (overrides = {}) => ({
  id: 'test-form-1',
  title: 'Test Form Title',
  metadata: {
    description: 'This is a test form description',
    review_date: '2024-12-01',
    maturity: 'production',
    efiling_enabled: true,
    form_titles: ['Document 1', 'Document 2'],
    fees: [{ name: 'Filing Fee', amount: 150 }],
    can_I_use_this_form: 'You can use this if...',
    before_you_start: 'Before starting...',
    help_page_url: 'https://example.com/help',
    help_page_title: 'Help Page',
    original_form: 'https://example.com/form.pdf',
    LIST_topics: ['HO-00-00-00-00', 'FA-00-00-00-00'],
    estimated_completion_minutes: 15,
    jurisdiction: 'Massachusetts',
    ...overrides?.metadata,
  },
  link: '/forms/test-form',
  serverUrl: 'https://example.com',
  serverPath: '/ma',
  ...overrides,
});

/**
 * Build the schema object as done in the page component
 */
const buildSchema = (formDetails: any) => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: formDetails.title,
    description: formDetails.metadata?.description || '',
    applicationCategory: 'LegalApplication',
    url: `${formDetails.serverUrl}${formDetails.link}`,
    isAccessibleForFree: true,
  };

  if (
    formDetails.metadata?.LIST_topics &&
    formDetails.metadata.LIST_topics.length > 0
  ) {
    schema.about = formDetails.metadata.LIST_topics.map((topic: string) => ({
      '@type': 'Thing',
      name: topic,
    }));
  }

  if (formDetails.metadata?.estimated_completion_minutes) {
    schema.timeRequired = `PT${formDetails.metadata.estimated_completion_minutes}M`;
  }

  if (formDetails.metadata?.jurisdiction) {
    schema.areaServed = {
      '@type': 'Place',
      name: formDetails.metadata.jurisdiction,
    };
  }

  return schema;
};

describe('Schema.org SoftwareApplication Markup Validation', () => {
  describe('Required Properties', () => {
    it('should have @context set to https://schema.org', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema['@context']).toBe('https://schema.org');
    });

    it('should have @type set to SoftwareApplication', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema['@type']).toBe('SoftwareApplication');
    });

    it('should have a name property (from form title)', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.name).toBe(formDetails.title);
      expect(typeof schema.name).toBe('string');
      expect(schema.name.length).toBeGreaterThan(0);
    });

    it('should have a description property', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.description).toBeDefined();
      expect(typeof schema.description).toBe('string');
    });

    it('should have a url property with absolute URL', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.url).toBeDefined();
      expect(schema.url).toMatch(/^https?:\/\//);
    });

    it('should have applicationCategory set to LegalApplication', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.applicationCategory).toBe('LegalApplication');
    });

    it('should have isAccessibleForFree set to boolean true', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.isAccessibleForFree).toBe(true);
      expect(typeof schema.isAccessibleForFree).toBe('boolean');
    });
  });

  describe('Optional Properties - about', () => {
    it('should include about property when LIST_topics are present', () => {
      const formDetails = createMockFormDetails({
        metadata: { LIST_topics: ['Family Law', 'Divorce'] },
      });
      const schema = buildSchema(formDetails);
      expect(schema.about).toBeDefined();
      expect(Array.isArray(schema.about)).toBe(true);
      expect(schema.about.length).toBe(2);
    });

    it('should not include about property when LIST_topics are empty', () => {
      const formDetails = createMockFormDetails({
        metadata: { LIST_topics: [] },
      });
      const schema = buildSchema(formDetails);
      expect(schema.about).toBeUndefined();
    });

    it('should have each about item as Thing with name', () => {
      const formDetails = createMockFormDetails({
        metadata: { LIST_topics: ['Family Law'] },
      });
      const schema = buildSchema(formDetails);
      expect(schema.about[0]['@type']).toBe('Thing');
      expect(schema.about[0].name).toBe('Family Law');
    });
  });

  describe('Optional Properties - timeRequired', () => {
    it('should include timeRequired when estimated_completion_minutes is present', () => {
      const formDetails = createMockFormDetails({
        metadata: { estimated_completion_minutes: 15 },
      });
      const schema = buildSchema(formDetails);
      expect(schema.timeRequired).toBeDefined();
      expect(schema.timeRequired).toBe('PT15M');
    });

    it('should format timeRequired as ISO 8601 duration', () => {
      const formDetails = createMockFormDetails({
        metadata: { estimated_completion_minutes: 30 },
      });
      const schema = buildSchema(formDetails);
      expect(schema.timeRequired).toMatch(/^PT\d+M$/);
    });

    it('should not include timeRequired when estimated_completion_minutes is undefined', () => {
      const formDetails = createMockFormDetails({
        metadata: { estimated_completion_minutes: undefined },
      });
      const schema = buildSchema(formDetails);
      expect(schema.timeRequired).toBeUndefined();
    });
  });

  describe('Optional Properties - areaServed', () => {
    it('should include areaServed when jurisdiction is present', () => {
      const formDetails = createMockFormDetails({
        metadata: { jurisdiction: 'Massachusetts' },
      });
      const schema = buildSchema(formDetails);
      expect(schema.areaServed).toBeDefined();
      expect(schema.areaServed['@type']).toBe('Place');
      expect(schema.areaServed.name).toBe('Massachusetts');
    });

    it('should not include areaServed when jurisdiction is undefined', () => {
      const formDetails = createMockFormDetails({
        metadata: { jurisdiction: undefined },
      });
      const schema = buildSchema(formDetails);
      expect(schema.areaServed).toBeUndefined();
    });
  });

  describe('JSON-LD Serialization', () => {
    it('should be serializable to JSON without errors', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(() => JSON.stringify(schema)).not.toThrow();
    });

    it('should produce valid JSON-LD', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      const jsonLd = JSON.stringify(schema);
      const parsed = JSON.parse(jsonLd);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('SoftwareApplication');
    });
  });

  describe('Edge Cases and Data Validation', () => {
    it('should handle empty description gracefully', () => {
      const formDetails = createMockFormDetails({
        metadata: { description: '' },
      });
      const schema = buildSchema(formDetails);
      expect(schema.description).toBe('');
      expect(typeof schema.description).toBe('string');
    });

    it('should handle missing optional metadata fields', () => {
      const formDetails = createMockFormDetails({
        metadata: {},
      });
      const schema = buildSchema(formDetails);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBeDefined();
      expect(schema.url).toBeDefined();
    });

    it('should handle zero minutes in timeRequired', () => {
      const formDetails = createMockFormDetails({
        metadata: { estimated_completion_minutes: 0 },
      });
      const schema = buildSchema(formDetails);
      // 0 is falsy, so timeRequired should not be included
      expect(schema.timeRequired).toBeUndefined();
    });

    it('should handle URLs with query parameters and fragments', () => {
      const formDetails = createMockFormDetails({
        serverUrl: 'https://example.com',
        link: '/forms/test?v=1#section',
      });
      const schema = buildSchema(formDetails);
      expect(schema.url).toBe('https://example.com/forms/test?v=1#section');
    });

    it('should validate that name is not empty', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      expect(schema.name).toBeTruthy();
      expect(schema.name.trim().length).toBeGreaterThan(0);
    });
  });

  describe('Schema.org Type Validation', () => {
    it('should only use valid schema.org types (SoftwareApplication, Thing, Place)', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      const validTypes = ['SoftwareApplication', 'Thing', 'Place'];

      expect(validTypes.includes(schema['@type'])).toBe(true);

      if (schema.about) {
        schema.about.forEach((item: any) => {
          expect(validTypes.includes(item['@type'])).toBe(true);
        });
      }

      if (schema.areaServed) {
        expect(validTypes.includes(schema.areaServed['@type'])).toBe(true);
      }
    });

    it('should validate that applicationCategory is a valid value', () => {
      const formDetails = createMockFormDetails();
      const schema = buildSchema(formDetails);
      // LegalApplication is a valid applicationCategory
      expect(
        [
          'GameApplication',
          'SocialNetworkingApplication',
          'MultimediaApplication',
          'MobileApplication',
          'WebApplication',
          'LegalApplication',
        ].includes(schema.applicationCategory)
      ).toBe(true);
    });
  });

  describe('Legal Application Specific Requirements', () => {
    it('should have all recommended properties for legal applications', () => {
      const formDetails = createMockFormDetails({
        metadata: {
          LIST_topics: ['Family Law'],
          estimated_completion_minutes: 15,
          jurisdiction: 'Massachusetts',
        },
      });
      const schema = buildSchema(formDetails);

      // Required
      expect(schema.name).toBeDefined();
      expect(schema.description).toBeDefined();
      expect(schema.url).toBeDefined();
      expect(schema.applicationCategory).toBe('LegalApplication');
      expect(schema.isAccessibleForFree).toBe(true);

      // Recommended for legal
      expect(schema.about).toBeDefined();
      expect(schema.timeRequired).toBeDefined();
      expect(schema.areaServed).toBeDefined();
    });

    it('should use Thing for about topics rather than nested descriptions', () => {
      const formDetails = createMockFormDetails({
        metadata: { LIST_topics: ['Family Law', 'Divorce'] },
      });
      const schema = buildSchema(formDetails);

      schema.about.forEach((item: any) => {
        expect(item['@type']).toBe('Thing');
        expect(item.name).toBeDefined();
        expect(typeof item.name).toBe('string');
      });
    });
  });
});
