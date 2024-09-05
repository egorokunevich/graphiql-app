import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

type UrlInputProps = {
  endpoint: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  sdlUrl: string;
  setSdlUrl: Dispatch<SetStateAction<string>>;
  urlError: boolean;
};

export default function UrlInput({
  sdlUrl,
  setSdlUrl,
  endpoint,
  setEndpoint,
  urlError,
}: UrlInputProps) {
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    const url = new URL(window.location.href);

    setEndpoint(newUrl);
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
          value={endpoint}
          onChange={handleUrlChange}
          error={urlError}
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
