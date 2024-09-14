import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import './globals.css';

// import { LayoutProvider } from '@/src/context/LayoutContext';
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
          {/* <LayoutProvider> */}
          <LangLayout>{children}</LangLayout>
          {/* </LayoutProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
