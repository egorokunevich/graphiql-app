import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField, Button, IconButton } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface RestHeaderEditorProps {
  headers: {
    key: string;
    value: string;
  }[];
  setHeaders: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >;
}

export const RestHeaderEditor = ({
  headers,
  setHeaders,
}: RestHeaderEditorProps) => {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('headers');
    window.history.replaceState({}, '', url.pathname);
  }, []);

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
    const encodedHeaders = btoa(JSON.stringify(updatedHeaders));
    const url = new URL(window.location.href);
    url.searchParams.set('headers', encodedHeaders);
    window.history.pushState({}, '', url.toString());
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string,
  ) => {
    const updatedHeaders = headers.map((header, i) =>
      i === index ? { ...header, [field]: value } : header,
    );
    setHeaders(updatedHeaders);

    const encodedHeaders = btoa(JSON.stringify(updatedHeaders));
    const url = new URL(window.location.href);
    url.searchParams.set('headers', encodedHeaders);
    window.history.pushState({}, '', url.toString());
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {headers.map((header, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
            <TextField
              label="Key"
              value={header.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, 'key', e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Value"
              value={header.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, 'value', e.target.value)
              }
              fullWidth
            />
            <IconButton onClick={() => handleRemoveHeader(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button onClick={handleAddHeader} variant="contained">
        Add Header
      </Button>
    </Box>
  );
};
