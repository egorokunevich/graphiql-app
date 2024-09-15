'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { type Locale } from '@/i18n-config';
import { LanguageType } from '@/src/types/index';

export default function LanguageToggle() {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [language, setLanguage] = useState<LanguageType>(params.lang);
  const t = useTranslations('basic');

  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleLanguageChange = async (e: Event) => {
    await setLanguage((e.target! as HTMLOptionElement).value as LanguageType);

    router.push(
      redirectedPathName(
        (e.target! as HTMLOptionElement).value as LanguageType,
      ),
    );
  };

  return (
    <>
      <FormControl fullWidth sx={{ maxWidth: '200px' }}>
        <InputLabel id="language-toggle-label">{t('language')}</InputLabel>
        <Select
          sx={{ maxHeight: '36px' }}
          variant="outlined"
          labelId="language-toggle-label"
          id="language-toggle"
          value={language}
          label="Language"
          inputProps={{ 'data-testid': 'lang-select' }}
          onChange={(e) => {
            handleLanguageChange(e as Event);
          }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
