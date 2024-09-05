'use client';
import { Box, Button, Tabs, Tab, Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import HeadersEditor from '@/src/components/GraphiQLClient/HeadersEditor';
import RequestEditor from '@/src/components/GraphiQLClient/RequestEditor';
import SdlViewer from '@/src/components/GraphiQLClient/SdlViewer';
import UrlInput from '@/src/components/GraphiQLClient/UrlInput';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import { a11yProps, RestTabs } from '@/src/components/RestClient/RestTabs';
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
  const [tabGraphiql, setTabGraphiql] = useState(true);
  const [tabs, setTabs] = useState(0);
  const [sdlResponse, setSdlResponse] = useState<string | null>(null);
  const [isSdlFetched, setIsSdlFetched] = useState(false);

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
      fetchSDL();
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
    setTabs(0);
  };

  const fetchSDL = async () => {
    if (!sdlUrl) {
      setIsSdlFetched(false);
      setSdlResponse(null);
      return;
    }

    try {
      const sdlresponse = await axios.post(
        sdlUrl,
        {
          query: body,
        },
        {
          headers: {
            ...headers.reduce(
              (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
              {},
            ),
          },
        },
      );
      setSdlResponse(sdlresponse.data);
      setIsSdlFetched(true);
    } catch (error) {
      setSdlResponse(null);
      setIsSdlFetched(false);
    }
  };

  const handleValueTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };
  console.log(sdlResponse);
  console.log(response);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        paddingTop: 2,
      }}
      disableGutters
    >
      <UrlInput
        sdlUrl={sdlUrl}
        setSdlUrl={setSdlUrl}
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        urlError={urlError}
      />
      <RestTabs
        value={tab}
        setValue={setTab}
        tabGraphiql={tabGraphiql}
        setTabGraphiql={setTabGraphiql}
      />
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSendRequest}>
          Send Request
        </Button>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '-16px',
        }}
      >
        <Tabs
          value={tabs}
          onChange={handleValueTabs}
          aria-label="basic tabs example"
          sx={{ padding: 0 }}
        >
          <Tab label={'Response'} {...a11yProps(0)} />
          {isSdlFetched && <Tab label={'Docs'} {...a11yProps(1)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={tabs} index={0}>
        <ResponseViewer response={response} />
      </CustomTabPanel>
      <CustomTabPanel value={tabs} index={1}>
        <SdlViewer sdlResponse={sdlResponse} />
      </CustomTabPanel>
    </Container>
  );
};

export default GraphiQLClient;
