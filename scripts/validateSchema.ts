#!/usr/bin/env node
/**
 * Schema.org Markup Validator
 * 
 * This script validates schema.org structured data without requiring a live website.
 * It can:
 * 1. Validate raw JSON-LD schema
 * 2. Check for common schema.org errors
 * 3. Generate validator URLs for manual inspection
 * 
 * Usage:
 *   npx ts-node scripts/validateSchema.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface SchemaValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

class SchemaValidator {
  private errors: string[] = [];
  private warnings: string[] = [];
  private info: string[] = [];

  /**
   * Validate schema.org structured data
   */
  validate(schema: any): SchemaValidationResult {
    this.errors = [];
    this.warnings = [];
    this.info = [];

    // Basic structure validation
    this.validateContext(schema);
    this.validateType(schema);
    this.validateSoftwareApplication(schema);

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      info: this.info,
    };
  }

  private validateContext(schema: any): void {
    if (!schema['@context']) {
      this.errors.push('Missing required property: @context');
    } else if (schema['@context'] !== 'https://schema.org') {
      this.errors.push(
        `Invalid @context: "${schema['@context']}". Should be "https://schema.org"`
      );
    } else {
      this.info.push('✓ @context correctly set to https://schema.org');
    }
  }

  private validateType(schema: any): void {
    if (!schema['@type']) {
      this.errors.push('Missing required property: @type');
    } else if (schema['@type'] !== 'SoftwareApplication') {
      this.errors.push(
        `Invalid @type: "${schema['@type']}". Should be "SoftwareApplication"`
      );
    } else {
      this.info.push('✓ @type correctly set to SoftwareApplication');
    }
  }

  private validateSoftwareApplication(schema: any): void {
    // Required properties
    if (!schema.name) {
      this.errors.push('Missing required property: name');
    } else if (typeof schema.name !== 'string') {
      this.errors.push(`Invalid type for name: ${typeof schema.name}. Should be string`);
    } else if (schema.name.trim().length === 0) {
      this.errors.push('Property name cannot be empty');
    } else {
      this.info.push(`✓ name: "${schema.name}"`);
    }

    if (!schema.description) {
      this.warnings.push(
        'Recommended property missing: description. This helps search engines understand your form.'
      );
    } else if (typeof schema.description !== 'string') {
      this.errors.push(
        `Invalid type for description: ${typeof schema.description}. Should be string`
      );
    } else {
      this.info.push(
        `✓ description: "${schema.description.substring(0, 50)}..."`
      );
    }

    if (!schema.url) {
      this.errors.push('Missing required property: url');
    } else if (typeof schema.url !== 'string') {
      this.errors.push(
        `Invalid type for url: ${typeof schema.url}. Should be string`
      );
    } else if (!this.isValidAbsoluteUrl(schema.url)) {
      this.errors.push(
        `Invalid url: "${schema.url}". Must be an absolute URL (starting with http:// or https://)`
      );
    } else {
      this.info.push(`✓ url: ${schema.url}`);
    }

    if (!schema.applicationCategory) {
      this.warnings.push(
        'Recommended property missing: applicationCategory'
      );
    } else {
      const validCategories = [
        'GameApplication',
        'SocialNetworkingApplication',
        'MultimediaApplication',
        'MobileApplication',
        'WebApplication',
        'LegalApplication',
        'BusinessApplication',
      ];
      if (!validCategories.includes(schema.applicationCategory)) {
        this.warnings.push(
          `Unknown applicationCategory: "${schema.applicationCategory}". Consider using "LegalApplication" for legal forms.`
        );
      } else {
        this.info.push(`✓ applicationCategory: ${schema.applicationCategory}`);
      }
    }

    if (schema.isAccessibleForFree !== undefined) {
      if (typeof schema.isAccessibleForFree !== 'boolean') {
        this.errors.push(
          `Invalid type for isAccessibleForFree: ${typeof schema.isAccessibleForFree}. Should be boolean`
        );
      } else {
        this.info.push(`✓ isAccessibleForFree: ${schema.isAccessibleForFree}`);
      }
    } else {
      this.warnings.push(
        'Recommended property missing: isAccessibleForFree'
      );
    }

    // Optional properties
    if (schema.about) {
      this.validateAbout(schema.about);
    }

    if (schema.timeRequired) {
      this.validateTimeRequired(schema.timeRequired);
    }

    if (schema.areaServed) {
      this.validateAreaServed(schema.areaServed);
    }
  }

  private validateAbout(about: any): void {
    if (!Array.isArray(about)) {
      this.errors.push(
        `Invalid type for about: ${typeof about}. Should be array`
      );
      return;
    }

    about.forEach((item, index) => {
      if (!item['@type']) {
        this.errors.push(
          `about[${index}]: Missing required property @type`
        );
      } else if (item['@type'] !== 'Thing') {
        this.warnings.push(
          `about[${index}]: Type is "${item['@type']}", typically should be "Thing" for topics`
        );
      }

      if (!item.name) {
        this.errors.push(
          `about[${index}]: Missing required property name`
        );
      } else if (typeof item.name !== 'string') {
        this.errors.push(
          `about[${index}].name: Invalid type ${typeof item.name}. Should be string`
        );
      }
    });

    this.info.push(`✓ about: ${about.length} topic(s)`);
  }

  private validateTimeRequired(timeRequired: any): void {
    if (typeof timeRequired !== 'string') {
      this.errors.push(
        `Invalid type for timeRequired: ${typeof timeRequired}. Should be ISO 8601 duration string`
      );
      return;
    }

    // Basic ISO 8601 duration validation
    if (!timeRequired.match(/^PT(\d+H)?(\d+M)?(\d+S)?$/)) {
      this.errors.push(
        `Invalid timeRequired format: "${timeRequired}". Should be ISO 8601 duration (e.g., "PT15M" for 15 minutes)`
      );
    } else {
      this.info.push(`✓ timeRequired: ${timeRequired}`);
    }
  }

  private validateAreaServed(areaServed: any): void {
    if (typeof areaServed === 'string') {
      this.info.push(`✓ areaServed: ${areaServed}`);
      return;
    }

    if (typeof areaServed === 'object' && areaServed['@type']) {
      if (areaServed['@type'] !== 'Place') {
        this.warnings.push(
          `areaServed @type is "${areaServed['@type']}", typically should be "Place"`
        );
      }

      if (!areaServed.name) {
        this.errors.push('areaServed.name: Missing required property name');
      } else {
        this.info.push(`✓ areaServed: ${areaServed.name}`);
      }
    } else {
      this.errors.push(
        `Invalid type for areaServed: ${typeof areaServed}. Should be string or Place object`
      );
    }
  }

  private isValidAbsoluteUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
}

/**
 * Example usage and sample schemas for testing
 */
function demonstrateValidation(): void {
  const validator = new SchemaValidator();

  // Example 1: Valid schema
  console.log('\n=== Example 1: Valid Schema ===\n');
  const validSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Divorce Forms Assistant',
    description: 'An interactive tool to help you prepare divorce forms',
    applicationCategory: 'LegalApplication',
    url: 'https://courtformsonline.org/ma/forms/divorce',
    isAccessibleForFree: true,
    about: [
      { '@type': 'Thing', name: 'Family Law' },
      { '@type': 'Thing', name: 'Divorce' },
    ],
    timeRequired: 'PT30M',
    areaServed: { '@type': 'Place', name: 'Massachusetts' },
  };

  let result = validator.validate(validSchema);
  console.log(`Valid: ${result.valid}`);
  result.info.forEach((msg) => console.log(`  ${msg}`));
  if (result.warnings.length > 0) {
    result.warnings.forEach((msg) => console.log(`  ⚠ ${msg}`));
  }

  // Example 2: Schema with errors
  console.log('\n=== Example 2: Schema with Errors ===\n');
  const invalidSchema = {
    '@context': 'https://example.org', // Wrong context
    '@type': 'Form', // Wrong type
    description: 'Missing name property',
    url: 'not-a-valid-url', // Invalid URL
  };

  result = validator.validate(invalidSchema);
  console.log(`Valid: ${result.valid}`);
  if (result.errors.length > 0) {
    result.errors.forEach((msg) => console.log(`  ✗ ${msg}`));
  }
  if (result.warnings.length > 0) {
    result.warnings.forEach((msg) => console.log(`  ⚠ ${msg}`));
  }
}

// Run demonstration
demonstrateValidation();

console.log('\n' + '='.repeat(60));
console.log('📋 How to use the official Schema.org Validator');
console.log('='.repeat(60));
console.log(`
The official Schema.org validator (https://validator.schema.org/) works with:

1. JSON-LD markup in HTML (requires live server or local test)
2. RDFa markup
3. Microdata

For offline testing, you can:
- Export your form data to JSON
- Use this validation script to check the structure
- Once deployed, use the validator at: https://validator.schema.org/

To test your actual HTML markup when deployed:
1. Go to https://validator.schema.org/
2. Paste your full page URL
3. It will analyze all structured data on the page

Google also provides a Rich Results Test:
https://search.google.com/test/rich-results

And Schema.org's own testing tool at:
https://www.schema.org/docs/developers.html#testing
`);
