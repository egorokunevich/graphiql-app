'use client';

import { AxiosError } from '@/node_modules/axios/index';
import { Box, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import RestBodyEditor from '@/src/components/RestClient/RestBodyEditor';
import { RestHeaderEditor } from '@/src/components/RestClient/RestHeaderEditor';
import { RestTabs } from '@/src/components/RestClient/RestTabs';
import { RestUrl } from '@/src/components/RestClient/RestUrl';
import { useHistoryContext } from '@/src/context/HistoryContext';
import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { sendHttpRequest } from '@/src/hooks/useHttpRequest';
import { Method, ResponseType } from '@/src/types/index';

const RestClient = () => {
  const [tabValue, setTabValue] = useState(0);
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [body, setBody] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [resLoading, setResLoading] = useState(false);
  const t = useTranslations();
  const { loading } = useAuthRedirect();
  const { addHistoryEntry } = useHistoryContext();

  const handleSendRequest = async () => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
      setResLoading(false);
      return undefined;
    }

    try {
      const urlBase64 = Buffer.from(url).toString('base64');

      let combinedBody = body ? JSON.parse(body) : {};
      variables.forEach((variable) => {
        combinedBody[variable.key] = variable.value;
      });

      const bodyBase64 = Buffer.from(JSON.stringify(combinedBody)).toString(
        'base64',
      );

      const queryParams = headers
        .filter((header) => header.key && header.value)
        .map(
          (header) =>
            `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
        )
        .join('&');

      let restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}`;
      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyBase64) {
        restUrl = `&bodyBase64=${bodyBase64}`;
      }
      if (queryParams) {
        restUrl += `&${queryParams}`;
      }

      let respond = await sendHttpRequest(method, restUrl);

      setResponse({ status: respond?.data.status, data: respond?.data.data });
      setUrlError(false);
      setResLoading(false);

      const headersObject = headers.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      addHistoryEntry({
        type: 'REST',
        method,
        url,
        headers: headersObject,
        body,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setResponse({
          status: error.response?.data?.status || error.response?.status,
          data: error.response?.data?.data || '',
          message: error.message,
        });
        setUrlError(false);
        setResLoading(false);
      } else if (error instanceof Error) {
        setResponse({
          message: error.message,
        });
        setUrlError(false);
        setResLoading(false);
      } else {
        setResponse({
          message: 'An unexpected error occurred',
        });
        setUrlError(false);
        setResLoading(false);
      }
    }
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
        handleSendRequest={handleSendRequest}
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
