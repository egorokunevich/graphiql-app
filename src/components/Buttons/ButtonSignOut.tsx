'use client';

import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import { auth } from '@/src/utils/firebase';

function ButtonSignOut() {
  const t = useTranslations('basic');

  function userSignOut() {
    signOut(auth);
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ fontWeight: 'bold' }}
        data-testid="btn-signOut"
        onClick={userSignOut}
      >
        {t('signOut')}
      </Button>
    </>
  );
}
export default ButtonSignOut;
