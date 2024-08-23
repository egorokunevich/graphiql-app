'use client';

import { Button, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import './Header.css';

import LanguageToggle from '@/src/components/LanguageToggle/LanguageToggle';
import { type getDictionary } from '@/src/utils/getDictionary';

interface HeaderProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
  isAuthenticated: boolean;
}

const Header = ({ t, isAuthenticated }: HeaderProps) => {
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
        <Link href={'/'}>
          <Image
            src="/static/logo.png"
            alt="RS School Logo"
            width={40}
            height={40}
          />
        </Link>
        <LanguageToggle t={t} />
        {isAuthenticated ? (
          <Button variant="outlined">{t.signOut}</Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <Button variant="outlined" href="/authorization">
              {t.signIn}
            </Button>
            <Button variant="outlined" href="/registration">
              {t.signUp}
            </Button>
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;
