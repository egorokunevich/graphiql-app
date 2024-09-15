import { screen } from '@testing-library/react';

import { ResponseViewer } from '@src/components/ResponseViewer/ResponseViewer';
import { render } from '@src/tests/test-utils';

// jest.mock('next-intl', () => ({
//   useTranslations: () => (key) =>
//     key === 'client' ? 'Mocked Translation' : key,
// }));

jest.mock('react-syntax-highlighter', () => ({
  Light: ({ children }) => <div>{children}</div>,
  Prism: ({ children }) => <div>{children}</div>,
}));

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props) => <img {...props} alt={props.alt} />,
// }));

const mockJsonResponse = {
  status: 200,
  message: '',
  data: '{"key": "value"}',
};

const mockHtmlResponse = {
  status: 200,
  message: '',
  data: '<div><p>Test</p></div>',
};

const mockErrorResponse = {
  status: 500,
  message: 'Internal Server Error',
  data: null,
};

describe('ResponseViewer', () => {
  test('renders loading state', async () => {
    render(
      <ResponseViewer response={null} tabGraphiql={false} resLoading={true} />,
    );
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state with message', () => {
    render(
      <ResponseViewer
        response={mockErrorResponse}
        tabGraphiql={false}
        resLoading={false}
      />,
    );
    expect(screen.getByText('Could not send request')).toBeInTheDocument();
  });

  test('renders JSON data correctly', () => {
    render(
      <ResponseViewer
        response={mockJsonResponse}
        tabGraphiql={false}
        resLoading={false}
      />,
    );
    expect(screen.getByText(/"key": "value"/)).toBeInTheDocument();
  });

  test('renders HTML data correctly', () => {
    render(
      <ResponseViewer
        response={mockHtmlResponse}
        tabGraphiql={false}
        resLoading={false}
      />,
    );
    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  test('renders initial state with welcome message', async () => {
    render(
      <ResponseViewer response={null} tabGraphiql={false} resLoading={false} />,
    );
    expect(
      await screen.findByText('Enter the URL and click Send to get a response'),
    ).toBeInTheDocument();
  });
});
