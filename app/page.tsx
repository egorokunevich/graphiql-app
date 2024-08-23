import { Box } from '@mui/material';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MainContent from '@/components/Main/Main';

function MainPage() {
  return (
    <Box sx={{ height: '100%' }}>
      {/* <Header isAuthenticated={true} /> */}
      <Header isAuthenticated={false} />
      {/* <MainContent isAuthenticated={false} username={''} /> */}
      <MainContent isAuthenticated={true} username={'Vasia'} />
      <Footer />
    </Box>
  );
}

export default MainPage;
