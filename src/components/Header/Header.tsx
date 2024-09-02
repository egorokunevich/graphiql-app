'use client';

import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ButtonSignIn = React.lazy(() => import('../Buttons/ButtonSignIn'));
const ButtonSignUp = React.lazy(() => import('../Buttons/ButtonSignUp'));
const ButtonSignOut = React.lazy(() => import('../Buttons/ButtonSignOut'));

import './Header.css';

import LanguageToggle, {
  LanguageType,
} from '@/src/components/LanguageToggle/LanguageToggle';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import type { Dictionary } from '@/src/utils/getDictionary';

interface HeaderProps {
  t: Dictionary['basic'];
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
          <ButtonSignOut t={t} />
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
