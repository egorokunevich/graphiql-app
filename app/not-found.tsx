'use client';

import { Box, Button, Typography, Container } from '@mui/material';
import React from 'react';

function NotFound() {
  return (
    <html>
      <body>
        <Container
          sx={{
            maxWidth: '640px',
            minHeight: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box className="flex flex-col items-center justify-center max-w-md w-full p-6 shadow-lg">
            <Typography
              variant="h1"
              component="div"
              className="text-center text-9xl font-bold text-gray-700 mb-4"
            >
              404
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className="text-center mb-5"
              sx={{
                marginBottom: '20px',
              }}
            >
              Sorry, the page you are looking for does not exist.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = '/')}
              className="text-1xl"
            >
              return to main page
            </Button>
          </Box>
        </Container>
      </body>
    </html>
  );
}

export default NotFound;

