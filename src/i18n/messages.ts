import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';
export type MessageId = keyof typeof en;

const messages: Record<Locale, Record<MessageId, string>> = { en, es };

export function message(
  locale: Locale,
  id: MessageId,
  values: Record<string, string | number> = {}
): string {
  return messages[locale][id].replace(/\{(\w+)\}/g, (placeholder, key) =>
    Object.hasOwn(values, key) ? String(values[key]) : placeholder
  );
}

export function topicTitle(
  locale: Locale,
  topic: { name: string; long_name: string }
) {
  const id = `topic.${topic.name}` as MessageId;
  return locale === 'es' && Object.hasOwn(en, id)
    ? message(locale, id)
    : topic.long_name;
}
