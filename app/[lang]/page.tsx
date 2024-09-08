'use client';

import { Box } from '@mui/material';

import ClientTabs from '@/src/components/ClientTabs/ClientTabs';
import MainContent from '@/src/components/MainContent/MainContent';
import Welcome from '@/src/components/Welcome/Welcome';
import { useLayoutContext } from '@/src/context/LayoutContext';

const MainPage: React.FC = () => {
  const { mainPage } = useLayoutContext();

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {mainPage ? (
        <>
          <MainContent />
          <ClientTabs />
        </>
      ) : (
        <Welcome />
      )}
    </Box>
  );
};

export default MainPage;
