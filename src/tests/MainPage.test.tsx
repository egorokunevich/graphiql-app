import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ErrorBoundary } from 'react-error-boundary';

import { mockDictionary } from './mocks/mockDictionary';

import MainPage from '@app/[lang]/page';
import ErrorFallback from '@src/components/ErrorFallback/ErrorFallback';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({
    lang: 'en',
  }),
}));

const mockGetMessages = jest.fn().mockReturnValue(mockDictionary);

jest.mock('next-intl/server', () => ({
  getMessages: () => mockGetMessages(),
}));

describe('MainPage test', () => {
  it('Should render in the document', async () => {
    const messages = await getMessages();
    const ui = await MainPage();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{ui}</ErrorBoundary>
      </NextIntlClientProvider>,
    );

    const page = await screen.findByTestId('main-page');
    expect(page).toBeInTheDocument();
  });
});
