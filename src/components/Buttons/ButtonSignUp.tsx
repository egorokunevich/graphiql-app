'use client';

import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LanguageType } from '@/src/types/index';

function ButtonSignIn() {
  const router = useRouter();
  const params = useParams<{ lang: LanguageType }>();
  const t = useTranslations('basic');

  return (
    <Button
      variant="outlined"
      style={{ fontWeight: 'bold' }}
      onClick={() => {
        router.push(`/${params.lang}/registration`);
      }}
      data-testid="btn-signUp"
    >
      {t('signUp')}
    </Button>
  );
}
export default ButtonSignIn;
