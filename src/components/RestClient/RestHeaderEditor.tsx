import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import { RestHeaderEditorProps } from '@/src/types/index';

const RestHeaderEditor = ({
  headers,
  setHeaders,
}: RestHeaderEditorProps) => {
  const t = useTranslations('client');

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('headers');
    window.history.replaceState({}, '', url.pathname);
  }, []);

  const updateUrlWithHeaders = (
    updatedHeaders: { key: string; value: string }[],
  ) => {
    const url = new URL(window.location.href);
    updatedHeaders.forEach((header) => {
      url.searchParams.delete(header.key);
    });
    updatedHeaders.forEach((header) => {
      if (header.key && header.value) {
        url.searchParams.set(
          encodeURIComponent(header.key),
          encodeURIComponent(header.value),
        );
      }
    });

    window.history.pushState({}, '', url.toString());
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
    updateUrlWithHeaders(updatedHeaders);
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
    updateUrlWithHeaders(updatedHeaders);
  };

  const handleAddHeader = () => {
    const updatedHeaders = [...headers, { key: '', value: '' }];
    setHeaders(updatedHeaders);
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
              label={t('key')}
              value={header.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, 'key', e.target.value)
              }
              fullWidth
            />
            <TextField
              label={t('value')}
              value={header.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, 'value', e.target.value)
              }
              fullWidth
            />
            <IconButton onClick={() => handleRemoveHeader(index)} data-testid="delete-button">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button onClick={handleAddHeader} variant="contained">
        Add header
      </Button>
    </Box>
  );
};

export default RestHeaderEditor;
