'use client';

import { AxiosError } from '@/node_modules/axios/index';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Locale } from '@/i18n-config';
import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import RestBodyEditor from '@/src/components/RestBodyEditor/RestBodyEditor';
import { RestHeaderEditor } from '@/src/components/RestHeaderEditor/RestHeaderEditor';
import { RestTabs } from '@/src/components/RestTabs/RestTabs';
import { RestUrl } from '@/src/components/RestUrl/RestUrl';
import { Dictionary, getDictionary } from '@/src/utils/getDictionary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ResponseType<T = unknown> {
  status?: number;
  data?: T;
  message?: string;
}

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '15px 0' }}>{children}</Box>}
    </div>
  );
}

const RestClient = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const [value, setValue] = useState(0);
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [urlError, setUrlError] = useState(false);

  const handleSendRequest = async () => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
      return;
    }

    try {
      const urlBase64 = Buffer.from(url).toString('base64');
      const bodyBase64 = body ? Buffer.from(body).toString('base64') : '';

      const queryParams = headers
        .filter((header) => header.key && header.value)
        .map(
          (header) =>
            `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
        )
        .join('&');

      let restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}`;
      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyBase64) {
        restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}&bodyBase64=${bodyBase64}`;
      }
      if (queryParams) {
        restUrl += `&${queryParams}`;
      }

      let respond;
      if (method === 'GET') {
        respond = await axios.get(restUrl);
      }
      if (method === 'POST') {
        respond = await axios.post(restUrl);
      }
      if (method === 'PUT') {
        respond = await axios.put(restUrl);
      }

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      disableGutters
    >
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography variant="h4" component="h1">
          REST Client
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
            <RestBodyEditor body={body} setBody={setBody} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Variables Editor
          </CustomTabPanel>
        </Box>
      </Box>
      <ResponseViewer response={response} />
    </Container>
  );
};

export default RestClient;
