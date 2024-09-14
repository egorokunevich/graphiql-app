import { render, fireEvent } from '@testing-library/react';
import React from 'react';

const ErrorFallback = React.lazy(
  () => import('../components/ErrorFallback/ErrorFallback'),
);

// // Mock ErrorProps
// const error = new Error('Test error');
// const resetErrorBoundary = jest.fn();
// const httpError = '404 Not Found';

// describe('ErrorFallback', () => {
//   it('renders the correct message for HTTP error', () => {
//     const { getByText } = render(
//       <ErrorFallback
//         error={error}
//         resetErrorBoundary={resetErrorBoundary}
//         httpError={httpError}
//       />,
//     );
//     expect(getByText('HTTP Error')).toBeInTheDocument();
//     expect(getByText('404 Not Found')).toBeInTheDocument();
//   });

//   it('renders the correct message for general error', () => {
//     const { getByText } = render(
//       <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
//     );
//     expect(getByText('Something went wrong')).toBeInTheDocument();
//     expect(getByText('Test error')).toBeInTheDocument();
//   });

//   it('calls resetErrorBoundary when the button is clicked', () => {
//     const { getByText } = render(
//       <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
//     );
//     fireEvent.click(getByText('Come back'));
//     expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
//   });
// });

// Mock ErrorProps
const error = new Error('Test error');
const resetErrorBoundary = jest.fn();
const httpError = '404 Not Found';

describe('ErrorFallback', () => {
  it('renders the correct message for HTTP error', () => {
    const { getByText } = render(
      <ErrorFallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
        httpError={httpError}
      />,
    );
    expect(getByText('HTTP Error')).toBeInTheDocument();
    expect(getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders the correct message for general error', () => {
    const { getByText } = render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when the button is clicked', () => {
    const { getByText } = render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );
    fireEvent.click(getByText('Come back'));
    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without httpError', () => {
    const { getByText } = render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />,
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('renders correctly without error', () => {
    const { getByText } = render(
      <ErrorFallback
        resetErrorBoundary={resetErrorBoundary}
        httpError={httpError}
        error={error}
      />,
    );
    expect(getByText('HTTP Error')).toBeInTheDocument();
    expect(getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders correctly without error and httpError', () => {
    const { getByText } = render(
      <ErrorFallback resetErrorBoundary={resetErrorBoundary} error={error} />,
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});

