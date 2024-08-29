'use client';

import { Button } from '@mui/material';
import { useParams } from 'next/navigation';

import ButtonProps from './ButtonProps';

import { LanguageType } from '@/src/components/LanguageToggle/LanguageToggle';

function ButtonSighIn({ t }: ButtonProps) {
  const params = useParams<{ lang: LanguageType }>();

  return (
    <>
      <Button
        variant="outlined"
        style={{ fontWeight: 'bold' }}
        href={`/${params.lang}/authorization`}
      >
        {t.signIn}
      </Button>
    </>
  );
}
export default ButtonSighIn;

