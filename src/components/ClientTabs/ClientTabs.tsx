'use client';

import { Box, Tabs, Tab } from '@mui/material';
import { User } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { LanguageType } from '@/src/types/index';

type TabsType = '' | 'rest-client' | 'graphiql-client' | 'history';

const ClientTabs = () => {
  const t = useTranslations('basic');
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [value, setValue] = useState<TabsType>('');
  const params = useParams<{ lang: LanguageType; client: TabsType }>();
  const router = useRouter();
  useAuthEffect(setAuthUser);

  const handleTabChange = (e: React.SyntheticEvent, newValue: TabsType) => {
    setValue(newValue);
    router.push(`/${params.lang}/client/${newValue}`);
  };

  const a11yProps = (TabValue: TabsType) => {
    return {
      id: `simple-tab-${TabValue}`,
      'aria-controls': `simple-tabpanel-${TabValue}`,
    };
  };

  return (
    <>
      {authUser && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab
              sx={{ width: '0', height: '0', pointerEvents: 'none' }}
              value=""
              label={''}
              {...a11yProps('')}
            />
            <Tab
              value="rest-client"
              label={`REST ${t('client')}`}
              {...a11yProps('rest-client')}
            />
            <Tab
              value="graphiql-client"
              label={`GraphiQL ${t('client')}`}
              {...a11yProps('graphiql-client')}
            />
            <Tab
              value="history"
              label={t('history')}
              {...a11yProps('history')}
            />
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default ClientTabs;
