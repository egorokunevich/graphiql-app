'use client';

import { AxiosError } from '@/node_modules/axios/index';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ResponseType<T = unknown> {
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

export const RestClinet = () => {
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

  const handleMethodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMethod(event.target.value as string);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
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
  console.log(
    'method:',
    method,
    'url:',
    url,
    'value:',
    value,
    'response:',
    response,
  );

  return (
    <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          REST Client
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <FormControl sx={{ width: '10%', borderRadius: 'unset' }}>
          <InputLabel id="method-label">Method</InputLabel>
          <Select
            labelId="method-label"
            value={method}
            label="Method"
            onChange={handleMethodChange}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
            <MenuItem value="PATCH">PATCH</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="Endpoint URL"
          variant="outlined"
          sx={{ borderRadius: 'unset', width: '100%' }}
          error={urlError}
          helperText={urlError ? 'URL cannot be empty' : ''}
        />
        <Button
          variant="contained"
          sx={{ borderRadius: 'unset' }}
          onClick={handleSendRequest}
        >
          Send
        </Button>
      </Box>
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

      <Paper
        sx={{
          boxShadow: 'none',
          borderTop: 1,
          borderColor: 'divider',
          borderRadius: 'unset',
          padding: 1,
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {' '}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="h6" fontWeight="400" color="#707070">
              Status:
            </Typography>
            {response && (
              <Typography
                variant="h6"
                fontWeight="400"
                color={response?.message ? 'error' : 'green'}
              >
                {response?.message
                  ? `${response.status} Failed`
                  : `${response?.status} OK`}
              </Typography>
            )}
          </Box>
          <Typography variant="h6" fontWeight="400" color="#707070">
            Response
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {response ? (
            response.message ? (
              <Box
                sx={{
                  marginTop: 3,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Image
                  src="/static/astronaut.svg"
                  alt="astronaut"
                  width={200}
                  height={200}
                />
                <Typography color="#454545" variant="subtitle2">
                  Could not send request
                </Typography>
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  maxHeight: '330px',
                  overflowY: 'auto',
                  padding: 1,
                  backgroundColor: '#F0F7F4',
                  borderRadius: 1,
                }}
              >
                {typeof response?.data === 'string'
                  ? response?.data
                  : JSON.stringify(response?.data, null, 2)}
              </Box>
            )
          ) : (
            <Box
              sx={{
                marginTop: 3,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Image
                src="/static/illustration.svg"
                alt=""
                width={200}
                height={200}
              />
              <Typography color="#454545" variant="subtitle2" gutterBottom>
                Enter the URL and click Send to get a response
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
