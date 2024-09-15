'use client';

import Image from '@/node_modules/next/image';
import { Box, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useState } from 'react';

import './MainContent.css';

import { useAuthEffect } from '@/src/hooks/useAuthEffect';

const ButtonSignIn = React.lazy(() => import('../Buttons/ButtonSignIn'));
const ButtonSignUp = React.lazy(() => import('../Buttons/ButtonSignUp'));

const MainContent = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const t = useTranslations('basic');
  let userName = '';
  if (authUser?.email) {
    userName = authUser.email.split('@')[0];
  }

  useAuthEffect(setAuthUser);

  return (
    <main>
      <Box sx={{ height: '100%', mt: 2, mb: 4 }}>
        {authUser ? (
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            {`${t('welcomeBack')}, ${userName}!`}
          </Typography>
        ) : (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              {`${t('welcome')}!`}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <ButtonSignIn />
              <ButtonSignUp />
            </Box>
          </>
        )}
        <Box
          sx={{
            width: '100%',
            height: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            margin: '50px 0',
          }}
        >
          <Image
            src="/static/homepage.svg"
            alt="illustration"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Box>
    </main>
  );
};

export default MainContent;
