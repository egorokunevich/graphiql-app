// import { Box, Container } from '@mui/material';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import { ErrorBoundary } from 'react-error-boundary';

import './globals.css';

// import ClientTabs from '@/src/components/ClientTabs/ClientTabs';
// import ErrorFallback from '@/src/components/ErrorFallback/ErrorFallback';
// import Footer from '@/src/components/Footer/Footer';
// import Header from '@/src/components/Header/Header';
import LangLayout from '@src/components/LangLayout/LangLayout';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'By RNG team',
};

export default async function RootLayout({
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
          <LangLayout>{children}</LangLayout>
          {/* <Container sx={{ maxWidth: '1440px' }} data-testid="root-layout">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Header />
                <ClientTabs />
                <Box sx={{ flex: 1 }}>{children}</Box>
                <Footer />
              </ErrorBoundary>
            </Box>
          </Container> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
