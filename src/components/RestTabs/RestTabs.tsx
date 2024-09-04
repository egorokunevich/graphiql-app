import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { Dispatch, SetStateAction } from 'react';

interface RestTabsProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export const RestTabs = ({ value, setValue }: RestTabsProps) => {
  const t = useTranslations('client');

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
        <Tab label={t('body')} {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
};
