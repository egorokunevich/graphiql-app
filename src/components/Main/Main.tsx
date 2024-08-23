'use client';

import { Box, Tabs, Tab } from '@mui/material';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';

import './Main.css';

import { getDictionary } from '@/src/utils/getDictionary';

interface MainInterface {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
  isAuthenticated: boolean;
  username: string;
}

enum TabsValues {
  RestTab = 'rest-client',
  GraphiqlTab = 'graphiql-client',
  HistoryTab = 'history',
}

// type TabsType = 'rest-client' | 'graphiql-client' | 'history';

const MainContent = ({ t, isAuthenticated, username }: MainInterface) => {
  // const params = useParams();
  // const [tab, setTab] = useState<TabsType>('rest-client');

  // const handleTabChange = (e: React.SyntheticEvent) => {
  // console.log(1);
  // setTab((e.target! as HTMLInputElement).value as TabsType);
  // };

  return (
    <main>
      <Box sx={{ height: '100%' }}>
        <h1>{isAuthenticated ? `${t.welcome}, ${username}!` : t.welcome}</h1>
        {isAuthenticated && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
              // value={tab}
              // onChange={(e) => {
              //   handleTabChange(e);
              // }}
              >
                <Tab
                  label={`REST ${t.client}`}
                  value={TabsValues.RestTab}
                  tabIndex={0}
                />
                <Tab
                  label={`GraphiQL ${t.client}`}
                  value={TabsValues.GraphiqlTab}
                  tabIndex={1}
                />
                <Tab
                  label={t.history}
                  value={TabsValues.HistoryTab}
                  tabIndex={2}
                />
              </Tabs>
            </Box>
          </>
        )}
      </Box>
    </main>
  );
};

export default MainContent;
