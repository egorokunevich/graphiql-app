import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

import { RestHeaderEditorProps } from '@/src/types/index';

export default function HeadersEditor({
  headers,
  setHeaders,
}: RestHeaderEditorProps) {
  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const handleDeleteHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  return (
    <Box>
      {headers.map((header, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Key"
              variant="outlined"
              value={header.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, e.target.value, header.value)
              }
              placeholder="Header Key"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Value"
              variant="outlined"
              value={header.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleHeaderChange(index, header.key, e.target.value)
              }
              placeholder="Header Value"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={() => handleDeleteHeader(index)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
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
