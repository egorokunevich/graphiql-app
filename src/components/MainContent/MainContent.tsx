'use client';

import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';

import './MainContent.css';

import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import type { Dictionary } from '@/src/utils/getDictionary';

const Welcome = React.lazy(() => import('../Welcome/Welcome'));

interface MainContentProps {
  t: Dictionary['basic'];
}

const MainContent = ({ t }: MainContentProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useAuthEffect(setAuthUser);

  return (
    <main>
      <Box sx={{ height: '100%' }}>
        {authUser ? (
          <h1>{`${t.welcome}, ${authUser.email}!`}</h1>
        ) : (
          <Welcome t={t} />
        )}
      </Box>
    </main>
  );
};

export default MainContent;
