'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ButtonMainPageProps {
  onClick: () => void;
}

function ButtonMainPage({ onClick }: ButtonMainPageProps) {
  const t = useTranslations();

  return (
    <>
      <Button
        onClick={onClick}
        variant="outlined"
        style={{ fontWeight: 'bold' }}
      >
        {t('basic.mainPage')}
      </Button>
    </>
  );
}
export default ButtonMainPage;
