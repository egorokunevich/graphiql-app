'use client';

// import { useRouter } from 'next/navigation';
import { AxiosError } from '@/node_modules/axios/index';
import {
  Box,
  Container,
  TextField,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ResponseViewer } from '@/src/components/ResponseViewer';
import { RestUrl } from '@/src/components/RestUrl';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RestClient = () => {
  // const router = useRouter();
  const [value, setValue] = useState(0);
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [urlError, setUrlError] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {

  //     if (fullUrl) {
  //       router.push(fullUrl);
  //     }
  //   }
  //  }, [fullUrl]);

  const handleValueChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSendRequest = async () => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
      return;
    }

    try {
      const urlBase64 = Buffer.from(url).toString('base64');
      const bodyBase64 = body
        ? Buffer.from(JSON.stringify(body)).toString('base64')
        : '';

      const queryParams = headers
        .filter((header) => header.key && header.value)
        .map(
          (header) =>
            `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
        )
        .join('&');

      let restUrl = `/api/rest-client?method=${method}&urlBase64=${urlBase64}`;
      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyBase64) {
        restUrl += `&bodyBase64=${bodyBase64}`;
      }
      if (queryParams) {
        restUrl += `&${queryParams}`;
      }

      const respond = await axios.get(restUrl);
      setFullUrl(restUrl);
      // router.push(fullUrl, undefined, { shallow: true });
      setResponse({ status: respond.data.status, data: respond.data.data });
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

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
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

      <Box sx={{ paddingBottom: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
          <Tabs
            value={value}
            onChange={handleValueChange}
            aria-label="basic tabs example"
          >
            <Tab label="Headers" {...a11yProps(0)} />
            <Tab label="Body" {...a11yProps(1)} />
            <Tab label="Variables" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{ display: 'flex', gap: 1, paddingLeft: 0, paddingRight: 0 }}
          >
            <TextField label="Key" variant="outlined" sx={{ width: '100%' }} />
            <TextField
              label="Value"
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Body Editor
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Variables Editor
        </CustomTabPanel>
      </Box>
      <ResponseViewer response={response} />
    </Container>
  );
};

export default RestClient;
