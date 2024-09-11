import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

import { LanguageType } from '@src/types/index';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as LanguageType)) notFound();

  return {
    messages: (await import(`@src/dictionaries/${locale}.json`)).default,
  };
});
