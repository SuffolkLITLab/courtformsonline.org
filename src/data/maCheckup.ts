import topics from '../config/maCheckup.json';
import { toUrlFriendlyString } from '../app/utils/helpers';

export { topics as checkupTopics };

export interface CheckupForm {
  filename: string;
  title: string;
}

export interface CheckupRecommendation {
  filename: string;
  label: string;
  description: string;
  href: string;
  reasons: string[];
}

/** Resolve curated IDs against the filtered MA index, never guessed form URLs. */
export function getCheckupRecommendations(
  selected: string[],
  forms: CheckupForm[]
) {
  const available = new Map(forms.map((form) => [form.filename, form]));
  const recommendations = new Map<string, CheckupRecommendation>();
  const missing = new Set<string>();

  for (const topic of topics) {
    for (const need of topic.needs) {
      if (!selected.includes(need.id)) continue;
      for (const tool of need.tools) {
        const form = available.get(tool.filename);
        if (!form) {
          missing.add(tool.filename);
          continue;
        }
        const existing = recommendations.get(tool.filename);
        if (existing) {
          existing.reasons.push(need.label);
        } else {
          recommendations.set(tool.filename, {
            ...tool,
            href: `/ma/forms/${toUrlFriendlyString(form.title)}`,
            reasons: [need.label],
          });
        }
      }
    }
  }

  return {
    recommendations: Array.from(recommendations.values()),
    missingCount: missing.size,
  };
}
