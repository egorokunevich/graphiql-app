'use client';

import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';

import ButtonProps from './ButtonProps';

import { auth } from '@/src/utils/firebase';

function ButtonSignOut({ t }: ButtonProps) {
  function userSignOut() {
    signOut(auth);
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ fontWeight: 'bold' }}
        onClick={userSignOut}
      >
        {t.signOut}
      </Button>
    </>
  );
}
export default ButtonSignOut;
