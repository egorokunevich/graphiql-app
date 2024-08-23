'use client';

import { Box, Tabs, Tab } from '@mui/material';

import './Main.css';

import { getDictionary } from '@/src/utils/getDictionary';

interface MainInterface {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
  isAuthenticated: boolean;
  username: string;
}

enum TabsValues {
  RestTab = 'rest-tab',
  GraphiqlTab = 'graphiql-tab',
  HistoryTab = 'history-tab',
}

// type TabsType = 'rest-tab' | 'graphiql-tab' | 'history-tab';

const MainContent = ({ t, isAuthenticated, username }: MainInterface) => {
  return (
    <main>
      <Box sx={{ height: '100%' }}>
        <h1>{isAuthenticated ? `${t.welcome}, ${username}!` : t.welcome}</h1>
        {isAuthenticated && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={TabsValues.RestTab}>
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
