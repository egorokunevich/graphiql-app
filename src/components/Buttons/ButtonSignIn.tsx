'use client';

import { Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LanguageType } from '@/src/types/index';

function ButtonSignIn() {
  const params = useParams<{ lang: LanguageType }>();
  const t = useTranslations('basic');

  return (
    <>
      <Button
        variant="outlined"
        style={{ fontWeight: 'bold' }}
        href={`/${params.lang}/authorization`}
      >
        {t('signIn')}
      </Button>
    </>
  );
}
export default ButtonSignIn;
