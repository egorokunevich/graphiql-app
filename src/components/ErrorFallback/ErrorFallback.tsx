'use client';

import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import React from 'react';

import { ErrorProps } from '@/src/types/index';

function ErrorFallback({ error, resetErrorBoundary, httpError }: ErrorProps) {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="max-w-[640px] w-full shadow-lg text-center p-4">
        <CardContent>
          <Typography variant="h5" component="div" className="text-center mb-6">
            {httpError ? 'HTTP Error' : 'Something went wrong'}
          </Typography>
          <Typography color="textSecondary" className="mb-6">
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

