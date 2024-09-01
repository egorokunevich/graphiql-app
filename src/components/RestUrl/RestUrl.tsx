import { NextResponse } from '@/node_modules/next/server';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { Method } from '@/app/[lang]/client/rest-client/page';

interface RestUrlProps {
  urlError: boolean;
  handleSendRequest: () => Promise<
    NextResponse<{ status: number | undefined; data: null }> | undefined
  >;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  method: Method;
  setMethod: Dispatch<SetStateAction<Method>>;
}

export const RestUrl = ({
  urlError,
  handleSendRequest,
  url,
  setUrl,
  method,
  setMethod,
}: RestUrlProps) => {
  const options = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const handleMethodChange = (event: SelectChangeEvent<string>) => {
    const selectedMethod = event.target.value as Method;
    setMethod(selectedMethod);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('method', selectedMethod);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);

    const encodedUrl = btoa(inputUrl);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('encodedUrl', encodedUrl);
    window.history.pushState({}, '', newUrl.toString());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FormControl sx={{ width: '10%', borderRadius: 'unset' }}>
        <InputLabel id="method-label">Method</InputLabel>
        <Select
          labelId="method-label"
          value={method}
          label="Method"
          onChange={handleMethodChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={`${option}`}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="Endpoint URL"
          variant="outlined"
          sx={{ borderRadius: 'unset', width: '100%' }}
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
      <Button
        variant="contained"
        sx={{
          borderRadius: 'unset',
          height: '56px',
          boxSizing: 'border-box',
        }}
        onClick={handleSendRequest}
      >
        Send
      </Button>
    </Box>
  );
};
