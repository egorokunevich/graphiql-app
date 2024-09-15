import { Box } from '@mui/material';
import React from 'react';

import { TabPanelProps } from '@/src/types/index';

const CustomTabPanel = (props: TabPanelProps) => {
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
};

export default CustomTabPanel;
