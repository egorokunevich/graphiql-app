'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { type Locale } from '@/i18n-config';
import { getDictionary } from '@/src/utils/getDictionary';

interface LanguageToggleProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}
export type LanguageType = 'en' | 'ru';

export default function LanguageToggle({ t }: LanguageToggleProps) {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const [language, setLanguage] = useState<LanguageType>(params.lang);

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
        <InputLabel id="language-toggle-label">{t.language}</InputLabel>
        <Select
          variant="outlined"
          labelId="language-toggle-label"
          id="language-toggle"
          value={language}
          label="Language"
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
