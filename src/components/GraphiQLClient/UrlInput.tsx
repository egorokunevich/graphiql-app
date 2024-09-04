import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Tooltip,
} from '@mui/material';
import React, { useState } from 'react';

type UrlInputProps = {};

export default function UrlInput({}: UrlInputProps) {
  const [endpoint, setEndpoint] = useState('');
  const [sdlEndpoint, setSdlEndpoint] = useState('');
  const [urlError, setUrlError] = useState(false);
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
          onChange={(e) => setEndpoint(e.target.value)}
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
          value={sdlEndpoint}
          onChange={(e) => setSdlEndpoint(e.target.value)}
          variant="outlined"
          sx={{ borderRadius: 'unset', width: '100%' }}
        />
      </Box>
    </Box>
  );
}
