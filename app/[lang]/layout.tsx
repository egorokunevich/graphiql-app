import { Box, Container } from '@mui/material';
import type { Metadata } from 'next';

import './globals.css';

import { i18n, type Locale } from '@/i18n-config';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header/Header';
import { getDictionary } from '@/src/utils/getDictionary';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'By RNG team',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <Container sx={{ maxWidth: '1440px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header t={t.basic} />
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Footer />
          </Box>
        </Container>
      </body>
    </html>
  );
}
