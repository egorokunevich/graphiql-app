'use client';

import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LanguageType } from '@/src/types/index';

function ButtonSignIn() {
  const params = useParams<{ lang: LanguageType }>();
  const t = useTranslations('basic');
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      style={{ fontWeight: 'bold' }}
      data-testid="btn-signIn"
      onClick={() => {
        router.push(`/${params.lang}/authorization`);
      }}
    >
      {t('signIn')}
    </Button>
  );
}
export default ButtonSignIn;
