'use client';

import { Box, Tabs, Tab } from '@mui/material';

import './Main.css';

interface MainInterface {
  isAuthenticated: boolean;
  username: string;
}

enum TabsValues {
  RestTab = 'rest-tab',
  GraphiqlTab = 'graphiql-tab',
  HistoryTab = 'history-tab',
}

// type TabsType = 'rest-tab' | 'graphiql-tab' | 'history-tab';

const MainContent = ({ isAuthenticated, username }: MainInterface) => {
  return (
    <main style={{ height: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <h1>{isAuthenticated ? `Welcome Back, ${username}!` : 'Welcome!'}</h1>
        {isAuthenticated && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={TabsValues.RestTab}>
                <Tab
                  label="REST Client"
                  value={TabsValues.RestTab}
                  tabIndex={0}
                />
                <Tab
                  label="GraphiQL Client"
                  value={TabsValues.GraphiqlTab}
                  tabIndex={1}
                />
                <Tab
                  label="History"
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
