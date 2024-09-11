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
const ButtonMainPage = React.lazy(() => import('../Buttons/ButtonMainPage'));

import './Header.css';

import LanguageToggle from '@/src/components/LanguageToggle/LanguageToggle';
import { useLayoutContext } from '@/src/context/LayoutContext';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { LanguageType } from '@/src/types/index';

const Header = () => {
  const { mainPage, setMainPage } = useLayoutContext();
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

  const handleMainPageClick = () => {
    setMainPage(true);
  };

  return (
    <header data-testid="header">
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
        <LanguageToggle />
        {authUser ? (
          <>
            {mainPage ? (
              <ButtonSignOut />
            ) : (
              <ButtonMainPage onClick={handleMainPageClick} />
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <ButtonSignIn />
            <ButtonSignUp />
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;
