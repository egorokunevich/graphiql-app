import 'server-only';

import type { Locale } from '@/i18n-config';

const dictionaries = {
  en: () =>
    import('@/public/dictionaries/en.json').then((module) => module.default),
  ru: () =>
    import('@/public/dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
