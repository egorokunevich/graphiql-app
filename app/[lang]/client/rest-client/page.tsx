'use client';
import { useState } from 'react';
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
} from '@mui/material';
import Image from 'next/image';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ marginTop: 4, marginBottom: 2 }}>
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
          <Select labelId="method-label" value={'method'} label="Method">
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
            <MenuItem value="PATCH">PATCH</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Endpoint URL"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 'unset' }}
        />
        <Button variant="contained" sx={{ borderRadius: 'unset' }}>
          Send
        </Button>
      </Box>
      <Box sx={{ paddingBottom: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
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
            <TextField label="Key" variant="outlined" fullWidth />
            <TextField label="Value" variant="outlined" fullWidth />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Body Editor
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Variables Editor
        </CustomTabPanel>
      </Box>
      <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="400" color="#707070">
          Response
        </Typography>
        <Box
          fullWidth
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
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
      </Box>
    </Container>
  );
};
