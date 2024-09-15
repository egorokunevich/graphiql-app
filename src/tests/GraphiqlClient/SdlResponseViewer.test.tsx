import { render, screen } from '@testing-library/react';

import { SdlResponseViewer } from '@/src/components/GraphiQLClient/SdlViewer';

const mockSdlResponse = {
  data: '{"key": "value"}',
};

test('renders JSON data correctly', () => {
  render(<SdlResponseViewer sdlResponse={mockSdlResponse} loading={false} />);

  expect(screen.getByText(/"key"/)).toBeInTheDocument();
});

test('renders HTML data correctly', () => {
  const mockHtmlResponse = {
    data: '<div><p>Test</p></div>',
  };
  render(<SdlResponseViewer sdlResponse={mockHtmlResponse} loading={false} />);

  expect(screen.getByText(/Test/)).toBeInTheDocument();
});
