'use client';
import { Box, Button, Tabs, Tab, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import HeadersEditor from '@/src/components/GraphiQLClient/HeadersEditor';
import RequestEditor from '@/src/components/GraphiQLClient/RequestEditor';
import { SdlResponseViewer } from '@/src/components/GraphiQLClient/SdlViewer';
import UrlInput from '@/src/components/GraphiQLClient/UrlInput';
import VariablesEditor from '@/src/components/GraphiQLClient/VariablesEditor';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import { a11yProps, RestTabs } from '@/src/components/RestClient/RestTabs';
import { useHistoryContext } from '@/src/context/HistoryContext';
import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { useGraphiQLRequest } from '@/src/hooks/useGraphqlRequest';

const GraphiQLClient = () => {
  const [tab, setTab] = useState(0);
  const [endpoint, setEndpoint] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [body, setBody] = useState<string>('');
  const [variables, setVariables] = useState('');
  const [updateUrl, setUpdateUrl] = useState('');
  const [tabGraphiql, setTabGraphiql] = useState(true);
  const [tabs, setTabs] = useState(0);
  const { addHistoryEntry, selectedRequest, setSelectedRequest } =
    useHistoryContext();
  const { loading } = useAuthRedirect();
  const t = useTranslations();

  useEffect(() => {
    if (selectedRequest && selectedRequest.type === 'graphiql-client') {
      setEndpoint(selectedRequest.url || '');
      setBody(selectedRequest.body || '');

      const headersArray = selectedRequest.headers
        ? Object.entries(selectedRequest.headers).map(([key, value]) => ({
            key,
            value,
          }))
        : [{ key: 'Content-Type', value: 'application/json' }];
      setHeaders(headersArray);

      const variablesObj = selectedRequest.variables?.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );
      setVariables(JSON.stringify(variablesObj || {}));

      setSdlUrl(selectedRequest.sdlUrl || '');
      setSelectedRequest(null);
    }
  }, [selectedRequest]);

  const {
    handleSendRequest,
    response,
    sdlResponse,
    isSdlFetched,
    resLoading,
    urlError,
  } = useGraphiQLRequest(endpoint, body, variables, headers, sdlUrl);

  let parsedVariables: { key: string; value: string }[] = [];
  try {
    const variablesObj = JSON.parse(variables);

    parsedVariables = Object.entries(variablesObj).map(([key, value]) => ({
      key,
      value: String(value),
    }));
  } catch (error) {
    parsedVariables = [];
  }

  const onSendRequest = async () => {
    await handleSendRequest();
    addHistoryEntry({
      type: 'graphiql-client',
      url: endpoint,
      headers: headers.reduce(
        (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
        {},
      ),
      body,
      variables: parsedVariables,
      sdlUrl,
    });
  };

  const handleValueTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  if (loading) {
    return <div>{t('basic.loading')}...</div>;
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
      <Box sx={{ maxHeight: '200px', overflow: 'hidden', overflowY: 'auto' }}>
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
          onClick={onSendRequest}
          data-testid="graphiql-send"
        >
          {t('client.send') + ' ' + t('client.request')}
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
          <Tab label={t('client.response')} {...a11yProps(0)} />
          {isSdlFetched && (
            <Tab
              label={t('client.docs')}
              {...a11yProps(1)}
              data-testid="graphiql-docsTab"
            />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={tabs} index={0}>
        <ResponseViewer
          response={response}
          tabGraphiql={tabGraphiql}
          resLoading={resLoading}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabs} index={1}>
        <SdlResponseViewer sdlResponse={sdlResponse} loading={loading} />
      </CustomTabPanel>
    </Container>
  );
};

export default GraphiQLClient;
