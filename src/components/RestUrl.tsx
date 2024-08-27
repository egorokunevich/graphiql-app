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
import React, { Dispatch, SetStateAction, useState } from 'react';

import { ResponseType } from '@/app/[lang]/client/rest-client/page';

interface ChildProps {
  urlError: boolean;
  handleSendRequest: () => Promise<void>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

export const RestUrl = ({
  urlError,
  handleSendRequest,
  url,
  setUrl,
}: ChildProps) => {
  const [method, setMethod] = useState('GET');
  const options = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  const handleMethodChange = (event: SelectChangeEvent<string>) => {
    setMethod(event.target.value as string);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
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
