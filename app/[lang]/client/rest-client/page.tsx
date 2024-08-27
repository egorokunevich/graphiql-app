'use client';

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
import { useState } from 'react';

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
  const [value, setValue] = useState(0);
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [urlError, setUrlError] = useState(false);

  const handleValueChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
  }

  const handleSendRequest = async () => {
    if (!url) {
      setUrlError(true);
      setResponse(null);
      return;
    }

    try {
      const config = {
        method,
        url,
        headers: headers.reduce(
          (acc, header) => {
            if (header.key && header.value) {
              acc[header.key] = header.value;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
        data: body,
      };

      const responseUrl = await axios(config);
      setResponse(responseUrl);
      setUrlError(false);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setResponse({
          status: error.response?.status,
          data: error.response?.data,
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
