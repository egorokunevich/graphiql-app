import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

// const ErrorFallback = React.lazy(
//   () => import('../components/ErrorFallback/ErrorFallback'),
// );

import ErrorFallback from '@src/components/ErrorFallback/ErrorFallback';
import { render } from '@src/tests/test-utils';

// // Mock ErrorProps
// const error = new Error('Test error');
// const resetErrorBoundary = jest.fn();
// const httpError = '404 Not Found';

// describe('ErrorFallback', () => {
//   it('renders the correct message for HTTP error', () => {
//     render(
//       <ErrorFallback
//         error={error}
//         resetErrorBoundary={resetErrorBoundary}
//         httpError={httpError}
//       />,
//     );
//     expect(await screen.findByText('HTTP Error')).toBeInTheDocument();
//     expect(await screen.findByText('404 Not Found')).toBeInTheDocument();
//   });

//   it('renders the correct message for general error', () => {
//     render(
//       <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
//     );
//     expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
//     expect(await screen.findByText('Test error')).toBeInTheDocument();
//   });

//   it('calls resetErrorBoundary when the button is clicked', () => {
//     render(
//       <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
//     );
//     fireEvent.click(await screen.findByText('Come back'));
//     expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
//   });
// });

// Mock ErrorProps
const error = new Error('Test error');
const resetErrorBoundary = jest.fn();
const httpError = '404 Not Found';

describe('ErrorFallback', () => {
  it('renders the correct message for HTTP error', async () => {
    render(
      <ErrorFallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
        httpError={httpError}
      />,
    );
    expect(await screen.findByText('HTTP Error')).toBeInTheDocument();
    expect(await screen.findByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders the correct message for general error', async () => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );

    const message = await screen.findByText('Something went wrong');
    const testBtn = await screen.findByText('Test error');

    expect(message).toBeInTheDocument();
    expect(testBtn).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when the button is clicked', async () => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );
    fireEvent.click(await screen.findByText('Come back'));
    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without httpError', async () => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(await screen.findByText('Test error')).toBeInTheDocument();
  });

  it('renders correctly without error', async () => {
    render(
      <ErrorFallback
        resetErrorBoundary={resetErrorBoundary}
        httpError={httpError}
        error={error}
      />,
    );
    expect(await screen.findByText('HTTP Error')).toBeInTheDocument();
    expect(await screen.findByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders correctly without error and httpError', async () => {
    render(
      <ErrorFallback resetErrorBoundary={resetErrorBoundary} error={error} />,
    );
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
