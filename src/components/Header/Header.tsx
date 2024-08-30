'use client';

import { Button, Box } from '@mui/material';
import { signOut, User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ButtonSignIn = React.lazy(() => import('../Buttons/ButtonSignIn'));
const ButtonSignUp = React.lazy(() => import('../Buttons/ButtonSignUp'));

import './Header.css';

import LanguageToggle, {
  LanguageType,
} from '@/src/components/LanguageToggle/LanguageToggle';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { auth } from '@/src/utils/firebase';
import { type getDictionary } from '@/src/utils/getDictionary';

interface HeaderProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

const Header = ({ t }: HeaderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const params = useParams<{ lang: LanguageType }>();

  useAuthEffect(setAuthUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function userSignOut() {
    signOut(auth);
  }

  return (
    <header>
      <Box
        className={isSticky ? 'header sticky' : 'header'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
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
            <ButtonSignIn t={t} />
            <ButtonSignUp t={t} />
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;

