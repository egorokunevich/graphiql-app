'use client';

import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useState } from 'react';

import './MainContent.css';

import { useAuthEffect } from '@/src/hooks/useAuthEffect';

const Welcome = React.lazy(() => import('../Welcome/Welcome'));

const MainContent = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const t = useTranslations('basic');

  useAuthEffect(setAuthUser);

  return (
    <main>
      <Box sx={{ height: '100%' }}>
        {authUser ? (
          <h1>{`${t('welcome')}, ${authUser.email}!`}</h1>
        ) : (
          <Welcome />
        )}
      </Box>
    </main>
  );
};

export default MainContent;
