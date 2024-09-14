'use client';

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';
// import ProfileCard from '../ProfileCard/ProfieCard';

const ProfileCard = React.lazy(() => import('../ProfileCard/ProfieCard'));
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
    <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
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
        {t('basic.welcome')}
      </Typography>

      <Card sx={{ mb: 4, px: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {t('welcome.ourDevs')}
          </Typography>

          <Grid
            container
            spacing={2}
            justifyContent="space-around"
            sx={{ mb: 4, mt: 2 }}
          >
            <ProfileCard
              username={'Yahor Akunevich'}
              avatarUrl={'https://avatars.githubusercontent.com/u/84414222?v=4'}
              profileUrl={'https://github.com/egorokunevich'}
              profession={'Frontend Developer'}
            />
            <ProfileCard
              username={'Manzura Jabbarova'}
              avatarUrl={
                'https://avatars.githubusercontent.com/u/100751526?v=4'
              }
              profileUrl={'https://github.com/manzura94'}
              profession={'Frontend Developer'}
            />
            <ProfileCard
              username={'Khilman Mikhail'}
              avatarUrl={'https://avatars.githubusercontent.com/u/43726927?v=4'}
              profileUrl={'https://github.com/grimpatron'}
              profession={'Frontend Developer'}
            />
          </Grid>
          <Typography>{t('welcome.teamDescription')}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, px: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {t('welcome.project')}
          </Typography>
          <Typography>{t('welcome.projectDescription')}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, px: 2 }}>
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
