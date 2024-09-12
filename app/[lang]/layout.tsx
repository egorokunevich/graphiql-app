import { Box, Container } from '@mui/material';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './globals.css';

import ErrorFallback from '@/src/components/ErrorFallback/ErrorFallback';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header/Header';
import { HistoryProvider } from '@/src/context/HistoryContext';
import { LayoutProvider } from '@/src/context/LayoutContext';

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
          <LayoutProvider>
            <HistoryProvider>
              <Container sx={{ maxWidth: '1440px' }}>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                  }}
                >
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Header />
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      {children}
                    </Box>
                    <Footer />
                  </ErrorBoundary>
                </Box>
              </Container>
            </HistoryProvider>
          </LayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
