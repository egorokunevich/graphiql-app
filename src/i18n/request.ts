import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

import { LanguageType } from '@src/components/LanguageToggle/LanguageToggle';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as LanguageType)) notFound();

  return {
    messages: (await import(`@src/dictionaries/${locale}.json`)).default,
  };
});
