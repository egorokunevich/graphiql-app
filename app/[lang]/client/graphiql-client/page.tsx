'use client';
import {
  Box,
  Button,
  Typography,
  Container,
} from '@mui/material';
import React, { useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import UrlInput from '@/src/components/GraphiQLClient/UrlInput';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import { RestTabs } from '@/src/components/RestClient/RestTabs';

const GraphiQLClient = () => {
  const [value, setValue] = useState(0);
  const [response, setResponse] = useState(null);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        flex: 1,
      }}
      disableGutters
    >
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography variant="h4" component="h1">
          GraphiQL Client
        </Typography>
      </Box>
      <UrlInput />
      <RestTabs value={value} setValue={setValue} />
      <Box>
        <CustomTabPanel value={value} index={0}>
          Header
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Body
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Variables
        </CustomTabPanel>
      </Box>
      <ResponseViewer response={response} />
    </Container>
  );
};

export default GraphiQLClient;
