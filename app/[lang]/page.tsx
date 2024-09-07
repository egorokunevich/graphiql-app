import { Box } from '@mui/material';

import MainContent from '@src/components/MainContent/MainContent';

async function MainPage() {
  return (
    <Box sx={{ position: 'relative', height: '100%' }} data-testid="main-page">
      <MainContent />
    </Box>
  );
}

export default MainPage;
