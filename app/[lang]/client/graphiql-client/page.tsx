'use client';
import { Box, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import HeadersEditor from '@/src/components/GraphiQLClient/HeadersEditor';
import RequestEditor from '@/src/components/GraphiQLClient/RequestEditor';
import UrlInput from '@/src/components/GraphiQLClient/UrlInput';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import { RestTabs } from '@/src/components/RestClient/RestTabs';
import { ResponseType } from '@/src/types/index';

const GraphiQLClient = () => {
  const [tab, setTab] = useState(0);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [endpoint, setEndpoint] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [sdlUrl, setSdlUrl] = useState('');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState<string>('');
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [updateUrl, setUpdateUrl] = useState('');

  const handleSendRequest = async () => {
    if (!endpoint) {
      setUrlError(true);
      setResponse(null);
      return;
    }

    try {
      const combinedBody = {
        query: body,
        variables: variables.reduce(
          (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
          {},
        ),
      };

      const responseUrl = await axios.post(endpoint, combinedBody, {
        headers: headers.reduce(
          (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
          {},
        ),
      });

      setResponse({ status: responseUrl.status, data: responseUrl.data });
      setUrlError(false);
    } catch (error: unknown) {
      console.log('unknown:', error);

      if (axios.isAxiosError(error)) {
        setResponse({
          status: error.response?.status ?? 'CORS error',
          message: error.response?.data?.message || error.message,
          data: error.response?.data || 'No data returned',
        });
      } else if (error instanceof Error) {
        console.log('instance:', error);

        setResponse({
          message: error.message,
        });
      } else {
        setResponse({
          message: 'An unexpected error occurred',
        });
      }
      setUrlError(false);
    }
  };
  console.log('url', response);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
      <UrlInput
        sdlUrl={sdlUrl}
        setSdlUrl={setSdlUrl}
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        urlError={urlError}
      />
      <RestTabs value={tab} setValue={setTab} />
      <Box>
        <CustomTabPanel value={tab} index={0}>
          <HeadersEditor
            headers={headers}
            setHeaders={setHeaders}
            updateUrl={updateUrl}
            setUpdateUrl={setUpdateUrl}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <RequestEditor body={body} setBody={setBody} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          Variables
        </CustomTabPanel>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleSendRequest}>
          Send Request
        </Button>
      </Box>
      <ResponseViewer response={response} />
    </Container>
  );
};

export default GraphiQLClient;
