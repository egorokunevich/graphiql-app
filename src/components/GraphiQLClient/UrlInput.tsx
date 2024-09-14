'use client';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { UrlInputProps } from '@/src/types/index';

export default function UrlInput({
  sdlUrl,
  setSdlUrl,
  endpoint,
  setEndpoint,
  urlError,
}: UrlInputProps) {
  const [localEndpoint, setLocalEndpoint] = useState(endpoint);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    const url = new URL(window.location.href);

    setEndpoint(newUrl);
    setLocalEndpoint(newUrl);
    setSdlUrl(`${newUrl}?sdl`);

    const encodedUrl = Buffer.from(newUrl).toString('base64');
    url.searchParams.set('encodedUrl', encodedUrl);
    window.history.pushState({}, '', url.toString());
    if (!newUrl) {
      setSdlUrl('');
      url.searchParams.delete('encodedUrl');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleSdlUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSdlUrl(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          label="GraphQL Endpoint URL"
          variant="outlined"
          sx={{ borderRadius: 'unset', width: '100%' }}
          value={localEndpoint}
          onChange={(e) =>
            handleUrlChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          error={urlError}
          inputProps={{ 'data-testid': 'graphiql-url' }}
        />
        {urlError && (
          <Tooltip
            title="URL cannot be empty"
            placement="right"
            sx={{ position: 'absolute', right: 0, top: 8 }}
          >
            <IconButton>
              <ErrorOutlineIcon color="error" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          label="SDL Endpoint URL"
          value={sdlUrl}
          onChange={handleSdlUrlChange}
          variant="outlined"
          sx={{ borderRadius: 'unset', width: '100%' }}
        />
      </Box>
    </Box>
  );
}
