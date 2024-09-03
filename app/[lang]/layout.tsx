import { Box, Container } from '@mui/material';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import './globals.css';

import ClientTabs from '@/src/components/ClientTabs/ClientTabs';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header/Header';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'By RNG team',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;

  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Container sx={{ maxWidth: '1440px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <Header />
              <ClientTabs />
              <Box sx={{ flex: 1 }}>{children}</Box>
              <Footer />
            </Box>
          </Container>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
