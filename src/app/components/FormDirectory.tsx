import type { ReactNode } from 'react';
import type { FamilyEmergencyForm } from '../../data/familyEmergencyForms';
import { message, type Locale } from '../../i18n/messages';
import FamilyPlanningTools from './FamilyPlanningTools';
import MarkdownContent from './MarkdownContent';

export default function FormDirectory({
  forms,
  locale,
}: {
  forms: FamilyEmergencyForm[];
  locale: Locale;
}) {
  const descriptions: Record<string, ReactNode> = {};
  const cards = forms.map(({ description, descriptionLanguage, ...card }) => {
    if (description) {
      descriptions[card.id] = (
        <details className="mb-3">
          <summary>
            {message(
              locale,
              descriptionLanguage === locale
                ? 'catalog.description'
                : descriptionLanguage === 'en'
                  ? 'catalog.descriptionEnglish'
                  : 'catalog.descriptionUnknown'
            )}
          </summary>
          <div className="mt-2" lang={descriptionLanguage}>
            <MarkdownContent>{description}</MarkdownContent>
          </div>
        </details>
      );
    }
    return card;
  });
  return (
    <FamilyPlanningTools
      forms={cards}
      descriptions={descriptions}
      locale={locale}
    />
  );
}
