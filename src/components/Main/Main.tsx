'use client';

import { Box, Tabs, Tab } from '@mui/material';
import { User } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import './Main.css';

import { LanguageType } from '@/src/components/LanguageToggle/LanguageToggle';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';
import { getDictionary } from '@/src/utils/getDictionary';

interface MainInterface {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

type TabsType = '' | 'rest-client' | 'graphiql-client' | 'history';

const MainContent = ({ t }: MainInterface) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [value, setValue] = useState<TabsType>('');
  const router = useRouter();

  useAuthEffect(setAuthUser);
  const params = useParams<{ lang: LanguageType }>();

  const handleTabChange = (e: React.SyntheticEvent, newValue: TabsType) => {
    setValue(newValue);
    router.push(`/${params.lang}/${newValue}`);
  };

  const a11yProps = (TabValue: TabsType) => {
    return {
      id: `simple-tab-${TabValue}`,
      'aria-controls': `simple-tabpanel-${TabValue}`,
    };
  };

  return (
    <main>
      <Box sx={{ height: '100%' }}>
        <h1>{authUser ? `${t.welcome}, ${authUser.email}!` : t.welcome}</h1>
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
                label={`REST ${t.client}`}
                {...a11yProps('rest-client')}
              />
              <Tab
                value="graphiql-client"
                label={`GraphiQL ${t.client}`}
                {...a11yProps('graphiql-client')}
              />
              <Tab
                value="history"
                label={t.history}
                {...a11yProps('history')}
              />
            </Tabs>
          </Box>
        )}
      </Box>
    </main>
  );
};

export default MainContent;
