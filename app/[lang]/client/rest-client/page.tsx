'use client';

import { AxiosError } from '@/node_modules/axios/index';
import { Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CustomTabPanel from '@/src/components/CustomTabPanel/CustomPanel';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import RestBodyEditor from '@/src/components/RestClient/RestBodyEditor';
import { RestHeaderEditor } from '@/src/components/RestClient/RestHeaderEditor';
import { RestTabs } from '@/src/components/RestClient/RestTabs';
import { RestUrl } from '@/src/components/RestClient/RestUrl';
import { sendHttpRequest } from '@/src/hooks/useHttpRequest';
import { Method, ResponseType } from '@/src/types/index';

const RestClient = () => {
  const [value, setValue] = useState(0);
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const t = useTranslations();

  const handleSendRequest = async () => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
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

      setFullUrl(restUrl);
      setResponse({ status: respond?.data.status, data: respond?.data.data });
      setUrlError(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setResponse({
          status: error.response?.data?.status || error.response?.status,
          data: error.response?.data?.data || '',
          message: error.message,
        });
        setUrlError(false);
      } else if (error instanceof Error) {
        setResponse({
          message: error.message,
        });
        setUrlError(false);
      } else {
        setResponse({
          message: 'An unexpected error occurred',
        });
        setUrlError(false);
      }
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
      disableGutters
    >
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography variant="h4" component="h1">
          REST {t('basic.client')}
        </Typography>
      </Box>
      <RestUrl
        method={method}
        setMethod={setMethod}
        setUrl={setUrl}
        url={url}
        handleSendRequest={handleSendRequest}
        urlError={urlError}
      />

      <Box sx={{ paddingBottom: 1, minHeight: '250px' }}>
        <RestTabs value={value} setValue={setValue} />
        <Box sx={{ maxHeight: '180px', overflow: 'hidden', overflowY: 'auto' }}>
          <CustomTabPanel value={value} index={0}>
            <RestHeaderEditor headers={headers} setHeaders={setHeaders} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <RestBodyEditor
              variables={variables}
              setVariables={setVariables}
              body={body}
              setBody={setBody}
            />
          </CustomTabPanel>
        </Box>
      </Box>
      <ResponseViewer response={response} />
    </Container>
  );
};

export default RestClient;
