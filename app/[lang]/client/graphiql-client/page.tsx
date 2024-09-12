'use client';
import { Box, Button, Tabs, Tab, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import HeadersEditor from '@/src/components/GraphiQLClient/HeadersEditor';
import RequestEditor from '@/src/components/GraphiQLClient/RequestEditor';
import UrlInput from '@/src/components/GraphiQLClient/UrlInput';
import VariablesEditor from '@/src/components/GraphiQLClient/VariablesEditor';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import { a11yProps, RestTabs } from '@/src/components/RestClient/RestTabs';
import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { isValidUrl } from '@/src/hooks/useCheckUrl';
import { ResponseType } from '@/src/types/index';
import { introspectionQuery } from '@/src/utils/sdlUtils';

const GraphiQLClient = () => {
  const [tab, setTab] = useState(0);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [endpoint, setEndpoint] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [sdlUrl, setSdlUrl] = useState('');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState<string>('');
  const [variables, setVariables] = useState('');
  const [updateUrl, setUpdateUrl] = useState('');
  const [tabGraphiql, setTabGraphiql] = useState(true);
  const [tabs, setTabs] = useState(0);
  const [sdlResponse, setSdlResponse] = useState<string | null>(null);
  const [isSdlFetched, setIsSdlFetched] = useState(false);
  const { loading } = useAuthRedirect();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.search || url.hash) {
      url.search = '';
      url.hash = '';
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleSendRequest = async () => {
    if (!endpoint) {
      setUrlError(true);
      setResponse(null);
      return;
    }

    try {
      new URL(endpoint);
    } catch (_) {
      setResponse({
        status: 400,
        message: 'The provided endpoint URL is not valid.',
      });
      return;
    }

    let parsedVariables = {};
    try {
      parsedVariables = variables ? JSON.parse(variables) : {};
    } catch (error) {
      setResponse({
        status: 400,
        message: 'Invalid JSON format in variables.',
      });
      return;
    }

    try {
      setTabs(0);

      const combinedBody = {
        query: body,
        variables: parsedVariables,
      };
      const responseUrl = await axios.post(endpoint, combinedBody, {
        headers: headers.reduce(
          (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
          {},
        ),
      });

      if (responseUrl && responseUrl.data) {
        setResponse({ status: responseUrl.status, data: responseUrl.data });
      } else {
        setResponse({
          status: responseUrl.status,
          message: 'Empty response received.',
        });
      }

      setUrlError(false);
      await fetchSDL();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setResponse({
            status: 'Network Error',
            message:
              'There was a problem with the network request. Please check your connection or the endpoint URL.',
          });
        } else {
          setResponse({
            status: error.response.status,
            message:
              error.response.data?.message ||
              'An error occurred on the server.',
            data: error.response.data,
          });
        }
      } else if (error instanceof Error) {
        setResponse({
          status: 0,
          message: error.message,
        });
      } else {
        setResponse({
          status: 0,
          message: 'An unexpected error occurred',
        });
      }
      setUrlError(false);
    }
  };

  const fetchSDL = async () => {
    if (!sdlUrl || !isValidUrl(sdlUrl)) {
      setIsSdlFetched(false);
      setSdlResponse(null);
      return;
    }

    try {
      setIsSdlFetched(true);
      setTabs(1);
      const sdlresponse = await axios.post(
        sdlUrl,
        {
          query: introspectionQuery,
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
    } catch (error) {
      setSdlResponse(null);
      setIsSdlFetched(false);
    }
  };

  const handleValueTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
      data-testid="graphiql-client"
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
          <VariablesEditor variables={variables} setVariables={setVariables} />
        </CustomTabPanel>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSendRequest}
          data-testid="graphiql-send"
        >
          Send Request
        </Button>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
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

      <ResponseViewer response={response} tabGraphiql={tabGraphiql} />
    </Container>
  );
};

export default GraphiQLClient;
