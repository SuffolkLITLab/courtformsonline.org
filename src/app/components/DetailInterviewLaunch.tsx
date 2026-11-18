'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import { spanishInterviewUrl } from '../../data/interviewUrl';
import { message, type Locale } from '../../i18n/messages';

type Props = {
  serverUrl: string;
  filename?: string;
  link?: string;
};

function LaunchButton({
  serverUrl,
  filename,
  link,
  locale,
}: Props & { locale: Locale }) {
  const href =
    locale === 'es'
      ? spanishInterviewUrl(serverUrl, filename, link)
      : `${serverUrl}${link}`;
  return (
    <Button className="btn btn-primary btn-lg my-3" href={href} lang={locale}>
      {message(locale, 'forms.start')}
    </Button>
  );
}

function LaunchWithPreference(props: Props) {
  const locale = useSearchParams()?.get('lang') === 'es' ? 'es' : 'en';
  return <LaunchButton {...props} locale={locale} />;
}

export default function DetailInterviewLaunch(props: Props) {
  return (
    <Suspense fallback={<LaunchButton {...props} locale="en" />}>
      <LaunchWithPreference {...props} />
    </Suspense>
  );
}
