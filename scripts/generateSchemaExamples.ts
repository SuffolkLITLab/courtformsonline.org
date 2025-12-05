/**
 * Schema.org Markup Snapshot Test Generator
 *
 * Generates example JSON-LD output so you can manually verify the structure
 * This helps validate that your form pages will render correct schema markup
 */

import fs from 'fs';
import path from 'path';

// Mock types matching your actual app
interface FormMetadata {
  description: string;
  review_date?: string;
  maturity?: string;
  efiling_enabled?: boolean | 'email';
  form_titles?: string[];
  fees?: Array<{ name?: string; amount?: number }>;
  can_I_use_this_form?: string;
  before_you_start?: string;
  help_page_url?: string;
  help_page_title?: string;
  original_form?: string;
  LIST_topics?: string[];
  estimated_completion_minutes?: number;
  jurisdiction?: string;
}

interface FormDetails {
  id: string;
  title: string;
  metadata: FormMetadata;
  link: string;
  serverUrl: string;
  serverPath: string;
}

/**
 * Build schema exactly as in page.tsx
 */
function buildSchema(formDetails: FormDetails): any {
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
    schema.about = formDetails.metadata.LIST_topics.map((topic) => ({
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
}

/**
 * Example forms to validate
 */
const exampleForms: FormDetails[] = [
  {
    id: 'divorce-petition',
    title: 'Uncontested Divorce Petition',
    metadata: {
      description:
        'This tool helps you prepare an uncontested divorce petition in Massachusetts. It guides you through the necessary steps and generates a form you can file with the court.',
      review_date: '2024-11-15',
      maturity: 'production',
      efiling_enabled: true,
      form_titles: ['Divorce Petition', 'Affidavit of Irretrievable Breakdown'],
      fees: [{ name: 'Court Filing Fee', amount: 276 }],
      can_I_use_this_form:
        'You can use this form if you and your spouse agree to the divorce and have settled all issues.',
      before_you_start:
        'Have your marriage certificate and spouse information ready.',
      help_page_url: 'https://example.com/divorce-help',
      help_page_title: 'Divorce Help Page',
      LIST_topics: ['Family Law', 'Divorce', 'Marital Property'],
      estimated_completion_minutes: 45,
      jurisdiction: 'Massachusetts',
    },
    link: '/forms/uncontested-divorce-petition',
    serverUrl: 'https://courtformsonline.org',
    serverPath: '/ma',
  },
  {
    id: 'eviction-notice',
    title: 'Eviction Notice (3-Day Notice)',
    metadata: {
      description:
        'Create a 3-day notice to quit for non-payment of rent in Massachusetts.',
      maturity: 'beta',
      efiling_enabled: false,
      LIST_topics: ['Housing', 'Landlord-Tenant'],
      estimated_completion_minutes: 10,
      jurisdiction: 'Massachusetts',
    },
    link: '/forms/3-day-notice-to-quit',
    serverUrl: 'https://courtformsonline.org',
    serverPath: '/ma',
  },
  {
    id: 'restraining-order',
    title: 'Domestic Abuse Prevention Order',
    metadata: {
      description:
        'Apply for a domestic abuse prevention order (restraining order) to protect yourself or your children.',
      review_date: '2024-10-20',
      maturity: 'production',
      efiling_enabled: 'email',
      form_titles: ['Petition for Abuse Prevention Order', 'Affidavit'],
      can_I_use_this_form:
        'You can use this form if you are experiencing domestic violence, harassment, or stalking.',
      before_you_start:
        'Document incidents of abuse with dates and times if possible.',
      LIST_topics: ['Domestic Violence', 'Family Law', 'Safety'],
      estimated_completion_minutes: 30,
      jurisdiction: 'Massachusetts',
    },
    link: '/forms/abuse-prevention-order',
    serverUrl: 'https://courtformsonline.org',
    serverPath: '/ma',
  },
];

/**
 * Generate and display example schemas
 */
function generateExamples(): void {
  console.log('\n' + '='.repeat(70));
  console.log('📋 Schema.org Markup Examples');
  console.log('='.repeat(70) + '\n');

  exampleForms.forEach((form, index) => {
    const schema = buildSchema(form);

    console.log(`\n### Example ${index + 1}: ${form.title}`);
    console.log(`Path: ${form.serverPath}${form.link}`);
    console.log('\n```json\n' + JSON.stringify(schema, null, 2) + '\n```\n');

    // Validation notes
    console.log('**Validation Notes:**');
    if (schema.about) {
      console.log(`- ✓ Includes ${schema.about.length} topic(s)`);
    } else {
      console.log('- ⚠ No topics specified');
    }
    if (schema.timeRequired) {
      console.log(`- ✓ Time estimate: ${schema.timeRequired}`);
    } else {
      console.log('- ⚠ No time estimate');
    }
    if (schema.areaServed) {
      console.log(`- ✓ Jurisdiction: ${schema.areaServed.name}`);
    }
    console.log('');
  });

  // Write examples to a file
  const examplesContent = {
    title: 'Schema.org Markup Examples',
    description: 'Example JSON-LD structured data for court forms pages',
    generated: new Date().toISOString(),
    examples: exampleForms.map((form) => ({
      form: form.title,
      path: `${form.serverPath}${form.link}`,
      schema: buildSchema(form),
    })),
  };

  const outputPath = path.join(process.cwd(), 'schema-examples.json');
  fs.writeFileSync(outputPath, JSON.stringify(examplesContent, null, 2));
  console.log(`\n✓ Examples saved to: ${outputPath}`);
}

/**
 * Generate HTML snippet showing how schema appears in page
 */
function generateHTMLSnippet(): void {
  const exampleSchema = buildSchema(exampleForms[0]);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${exampleSchema.name} - Court Forms Online</title>
    <meta name="description" content="${exampleSchema.description}">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(exampleSchema, null, 2)}
    </script>
</head>
<body>
    <main>
        <h1>${exampleSchema.name}</h1>
        <p>${exampleSchema.description}</p>
        
        <!-- Your form content would go here -->
        <button>Start tool</button>
    </main>
    
    <script>
        // This snippet shows how the schema.org markup appears in your HTML
        console.log('Schema.org data is embedded in the page');
        console.log('Search engines and legal databases can read this structured data');
    </script>
</body>
</html>`;

  const outputPath = path.join(process.cwd(), 'schema-example.html');
  fs.writeFileSync(outputPath, html);
  console.log(`✓ HTML example saved to: ${outputPath}`);
  console.log('\n  You can open this file in a browser to see the structure');
  console.log(
    '  Use DevTools (F12) → Elements → <script type="application/ld+json">'
  );
}

// Run
generateExamples();
generateHTMLSnippet();

console.log('\n' + '='.repeat(70));
console.log('💡 How to use these examples:');
console.log('='.repeat(70));
console.log(`
1. Review the JSON schemas above for correctness

2. Check schema-examples.json:
   - Verify all required properties are present
   - Check that URLs are absolute and valid
   - Confirm optional properties are properly formatted

3. Open schema-example.html in your browser:
   - You'll see how the schema appears in your actual page
   - DevTools will show the <script type="application/ld+json"> tag

4. When deployed, validate with:
   - https://validator.schema.org/ - Official schema validator
   - https://search.google.com/test/rich-results - Google's validator

5. Paste your actual page URL into either validator and:
   - Look for any errors in red
   - Review warnings in yellow
   - Verify search engines understand your content
`);
