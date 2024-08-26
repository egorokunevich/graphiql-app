// 'use client';
import { Box } from '@mui/material';

import { RestClinet } from './[lang]/client/rest-client/page';

import { Locale } from '@/i18n-config';

// import { getDictionary } from '@/src/utils/getDictionary';
// import MainContent from '@src/components/Main/Main';

async function MainPage({ params: { lang } }: { params: { lang: Locale } }) {
  // const t = await getDictionary(lang);

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {/* <MainContent t={t.basic} /> */}

      <RestClinet />
    </Box>
  );
}

export default MainPage;
