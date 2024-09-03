'use client';

import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';

const ButtonSignIn = React.lazy(() => import('../Buttons/ButtonSignIn'));
const ButtonSignUp = React.lazy(() => import('../Buttons/ButtonSignUp'));

const Welcome = () => {
  const t = useTranslations();
  const { showBoundary } = useErrorBoundary();

  async function handleClickForError() {
    try {
      const response = await fetch('/zapros-dlia-proverki-na-oshibku');
      if (!response.ok) {
        if (response.status >= 400 && response.status < 600) {
          showBoundary(
            new Error(
              `${response.url}. HTTP Error: ${response.status} ${response.statusText}`,
            ),
          );
        } else {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        showBoundary(error);
      }
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('basic.welcome')}
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {t('welcome.ourDevs')}
          </Typography>
          <Typography>{t('welcome.teamDescription')}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {t('welcome.project')}
          </Typography>
          <Typography>{t('welcome.projectDescription')}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {t('welcome.rollingScopes')}
          </Typography>
          <Typography>{t('welcome.RSSchoolDescription')}</Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <ButtonSignIn />
        <ButtonSignUp />
        <button onClick={handleClickForError}>Test Error</button>
      </Box>
    </Container>
  );
};

export default Welcome;
