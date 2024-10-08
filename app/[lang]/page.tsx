'use client';

import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import { useState } from 'react';

import MainContent from '@src/components/MainContent/MainContent';
import Welcome from '@src/components/Welcome/Welcome';
import { useAuthEffect } from '@src/hooks/useAuthEffect';

const MainPage = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  useAuthEffect(setAuthUser);

  return (
    <Box sx={{ position: 'relative', height: '100%' }} data-testid="main-page">
      {authUser ? (
        <>
          <MainContent />
        </>
      ) : (
        <Welcome />
      )}
    </Box>
  );
};

export default MainPage;
