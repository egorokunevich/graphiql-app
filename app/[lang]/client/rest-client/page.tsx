'use client';

import { Box, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import RestBodyEditor from '@/src/components/RestClient/RestBodyEditor';
import RestHeaderEditor from '@/src/components/RestClient/RestHeaderEditor';
import { RestTabs } from '@/src/components/RestClient/RestTabs';
import { RestUrl } from '@/src/components/RestClient/RestUrl';
import { useHistoryContext } from '@/src/context/HistoryContext';
import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { useRestRequest } from '@/src/hooks/useRestRequest';
import { Method } from '@/src/types/index';

const RestClient = () => {
  const [tabValue, setTabValue] = useState(0);
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [body, setBody] = useState('');
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const t = useTranslations();
  const { loading } = useAuthRedirect();
  const { handleSendRequest, response, urlError, resLoading } =
    useRestRequest();

  const { selectedRequest, setSelectedRequest } = useHistoryContext();

  useEffect(() => {
    if (selectedRequest && selectedRequest.type === 'rest-client') {
      setMethod((selectedRequest.method as Method) || 'GET');
      setUrl(selectedRequest.url || '');
      setBody(selectedRequest.body || '');

      const headersArray = selectedRequest.headers
        ? Object.entries(selectedRequest.headers).map(([key, value]) => ({
            key,
            value,
          }))
        : [{ key: 'Content-Type', value: 'application/json' }];
      setHeaders(headersArray);

      setVariables(selectedRequest.variables || [{ key: '', value: '' }]);
      setSelectedRequest(null);
    }
  }, [selectedRequest]);

  const handleSend = async () => {
    await handleSendRequest({
      method,
      url,
      body,
      headers,
      variables,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        width: '100%',
      }}
      disableGutters
    >
      <RestUrl
        method={method}
        setMethod={setMethod}
        setUrl={setUrl}
        url={url}
        handleSendRequest={handleSend}
        urlError={urlError}
      />

      <Box sx={{ paddingBottom: 1, minHeight: '250px' }}>
        <RestTabs value={tabValue} setValue={setTabValue} />
        <Box sx={{ maxHeight: '180px', overflow: 'hidden', overflowY: 'auto' }}>
          <CustomTabPanel value={tabValue} index={0}>
            <RestHeaderEditor headers={headers} setHeaders={setHeaders} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <RestBodyEditor
              variables={variables}
              setVariables={setVariables}
              body={body}
              setBody={setBody}
            />
          </CustomTabPanel>
        </Box>
      </Box>
      <ResponseViewer response={response} resLoading={resLoading} />
    </Container>
  );
};

export default RestClient;
