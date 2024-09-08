import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { RestTabsProps } from '@/src/types/index';

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const RestTabs = ({ value, setValue, tabGraphiql }: RestTabsProps) => {
  const t = useTranslations('client');

  const handleValueChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        marginTop: 2,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Tabs
        value={value}
        onChange={handleValueChange}
        aria-label="basic tabs example"
        sx={{ padding: 0 }}
      >
        <Tab label={t('headers')} {...a11yProps(0)} />
        {tabGraphiql ? (
          <Tab label={'Query'} {...a11yProps(1)} />
        ) : (
          <Tab label={t('body')} {...a11yProps(1)} />
        )}
        {tabGraphiql && <Tab label={'Variables'} {...a11yProps(2)} />}
      </Tabs>
    </Box>
  );
};
