import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import React from 'react';

import { HeadersEditorProps } from '@/src/types/index';

export default function HeadersEditor({
  headers,
  setHeaders,
  updateUrl,
  setUpdateUrl,
}: HeadersEditorProps) {
  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
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
    handleUpdateUrl(updatedHeaders);
  };

  const handleDeleteHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);

    const url = new URL(window.location.href);
    const headerToDelete = headers[index];
    if (headerToDelete && headerToDelete.key) {
      url.searchParams.delete(encodeURIComponent(headerToDelete.key));
    }

    window.history.pushState({}, '', url.toString());
    setUpdateUrl(url.toString());
  };

  const handleUpdateUrl = (
    updatedHeaders: { key: string; value: string }[],
  ) => {
    const url = new URL(window.location.href);
    updatedHeaders.forEach((header) => {
      url.searchParams.delete(encodeURIComponent(header.key));
    });

    updatedHeaders.forEach((header) => {
      if (header.key && header.value) {
        url.searchParams.set(
          encodeURIComponent(header.key),
          encodeURIComponent(header.value),
        );
      }
    });

    const headersQuery = updatedHeaders
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
      )
      .join('&');

    const routeUrl = `${headersQuery ? '?' + headersQuery : ''}`;
    updateUrl += routeUrl;
    setUpdateUrl(updateUrl);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <Box sx={{ width: '100%' }}>
      {headers.map((header, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
          <TextField
            label={'Key'}
            value={header.key}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleHeaderChange(index, 'key', e.target.value)
            }
            fullWidth
          />
          <TextField
            label={'Value'}
            value={header.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleHeaderChange(index, 'value', e.target.value)
            }
            fullWidth
          />
          <IconButton onClick={() => handleDeleteHeader(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddHeader}>
        Add Header
      </Button>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
        If you are making a CORS request, each added header should be supported
        on the backend.
      </Typography>
    </Box>
  );
}
