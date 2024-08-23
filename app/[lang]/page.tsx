import { Box } from '@mui/material';

import { Locale } from '@/i18n-config';
import { getDictionary } from '@/src/utils/getDictionary';
import Footer from '@src/components/Footer/Footer';
import Header from '@src/components/Header/Header';
import MainContent from '@src/components/Main/Main';

async function MainPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = await getDictionary(lang);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* <Header isAuthenticated={true} /> */}
      <Header t={t.basic} isAuthenticated={false} />
      {/* <MainContent isAuthenticated={false} username={''} /> */}
      <MainContent t={t.basic} isAuthenticated={true} username={'Vasia'} />
      <Footer />
    </Box>
  );
}

export default MainPage;
