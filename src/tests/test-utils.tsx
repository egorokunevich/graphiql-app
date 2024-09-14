import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React, { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { mockDictionary } from './mocks/mockDictionary';

import ErrorFallback from '@src/components/ErrorFallback/ErrorFallback';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en" messages={mockDictionary}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
