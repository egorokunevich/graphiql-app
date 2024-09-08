'use client';

import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import React from 'react';

interface ErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
  httpError?: string | null;
}

function ErrorFallback({ error, resetErrorBoundary, httpError }: ErrorProps) {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="max-w-md w-full shadow-lg text-center p-4">
        <CardContent>
          <Typography variant="h5" component="div" className="text-center mb-4">
            {httpError ? 'HTTP Error' : 'Something went wrong'}
          </Typography>
          <Typography color="textSecondary" className="mb-4">
            {httpError || error.message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={resetErrorBoundary}
          >
            Come back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ErrorFallback;
