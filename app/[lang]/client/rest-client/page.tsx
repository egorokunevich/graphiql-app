'use client';

import { AxiosError } from '@/node_modules/axios/index';
import { NextResponse } from '@/node_modules/next/server';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { ResponseViewer } from '@/src/components/ResponseViewer/ResponseViewer';
import RestBodyEditor from '@/src/components/RestBodyEditor/RestBodyEditor';
import { RestHeaderEditor } from '@/src/components/RestHeaderEditor/RestHeaderEditor';
import { RestTabs } from '@/src/components/RestTabs/RestTabs';
import { RestUrl } from '@/src/components/RestUrl/RestUrl';

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
      return;
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
        restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}&bodyBase64=${bodyBase64}`;
      }
      if (queryParams) {
        restUrl += `&${queryParams}`;
      }

      let respond;
      switch (method) {
        case 'GET':
          respond = await axios.get(restUrl);
          break;
        case 'POST':
          respond = await axios.post(restUrl);
          break;
        case 'PUT':
          respond = await axios.put(restUrl);
          break;
        case 'PATCH':
          respond = await axios.patch(restUrl);
          break;
        case 'DELETE':
          respond = await axios.delete(restUrl);
          break;
        case 'HEAD':
          respond = await axios.head(restUrl);
          setResponse({ status: respond?.status, data: null });
          return NextResponse.json({ status: respond?.status, data: null });
        case 'OPTIONS':
          respond = await axios.options(restUrl);
          break;
        default:
          throw new Error('Invalid HTTP method');
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
