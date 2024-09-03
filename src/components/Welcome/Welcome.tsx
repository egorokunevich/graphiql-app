'use client';

import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';

const ButtonSignIn = React.lazy(() => import('../Buttons/ButtonSignIn'));
const ButtonSignUp = React.lazy(() => import('../Buttons/ButtonSignUp'));

import { type getDictionary } from '@/src/utils/getDictionary';

interface ButtonProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

const Welcome = ({ t }: ButtonProps) => {
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
        {t.welcome}
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Our Developers
          </Typography>
          <Typography>
            We are a team of 3 developers working on creating lightweight
            version of Postman and GraphQL, combined into a single application.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Project
          </Typography>
          <Typography>
            The application is developed in React and Next.js. Firebase is
            responsible for user registration. The application supports 2
            languages: Russian and English.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Rolling Scopes
          </Typography>
          <Typography>
            The project was created as part of the Rolling Scopes training
            course. RS School offers a unique learning experience as a free,
            community-based online education initiative. The RS School has been
            run by the Rolling Scopes community since 2013.
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <ButtonSignIn t={t} />
        <ButtonSignUp t={t} />
        <button onClick={handleClickForError}>Test Error</button>
      </Box>
    </Container>
  );
};

export default Welcome;
