'use client';

import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import { useState } from 'react';

import './MainContent.css';

import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { getDictionary } from '@/src/utils/getDictionary';

interface MainContentProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

const MainContent = ({ t }: MainContentProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useAuthEffect(setAuthUser);

  return (
    <main>
      <Box sx={{ height: '100%' }}>
        <h1>{authUser ? `${t.welcome}, ${authUser.email}!` : t.welcome}</h1>
      </Box>
    </main>
  );
};

export default MainContent;
