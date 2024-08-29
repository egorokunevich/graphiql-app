'use client';

import { Button, Box } from '@mui/material';
import { signOut, User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import './Header.css';

import { useAuthEffect } from '@/src//hooks/useAuthEffect';
import LanguageToggle, {
  LanguageType,
} from '@/src/components/LanguageToggle/LanguageToggle';
import { auth } from '@/src/utils/firebase';
import { type getDictionary } from '@/src/utils/getDictionary';

interface HeaderProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

const Header = ({ t }: HeaderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const params = useParams<{ lang: LanguageType }>();

  useAuthEffect(setAuthUser);

  function userSignOut() {
    signOut(auth);
  }

  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          width: '100%',
          backgroundColor: '#F0F7F4',
        }}
      >
        <Link href={`/${params.lang}`}>
          <Image
            src="/static/logo.png"
            alt="RS School Logo"
            width={40}
            height={40}
          />
        </Link>
        <LanguageToggle t={t} />
        {authUser ? (
          <Button variant="outlined" onClick={userSignOut}>
            {t.signOut}
          </Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <Button variant="outlined" href={`/${params.lang}/authorization`}>
              {t.signIn}
            </Button>
            <Button variant="outlined" href={`/${params.lang}/registration`}>
              {t.signUp}
            </Button>
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;
