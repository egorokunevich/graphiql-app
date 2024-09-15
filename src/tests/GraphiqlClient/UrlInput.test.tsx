import { render, screen, fireEvent } from '@testing-library/react';

import UrlInput from '@/src/components/GraphiQLClient/UrlInput';

const mockSetSdlUrl = jest.fn();
const mockSetEndpoint = jest.fn();

const initialProps = {
  sdlUrl: 'http://example.com?sdl',
  setSdlUrl: mockSetSdlUrl,
  endpoint: 'http://example.com',
  setEndpoint: mockSetEndpoint,
  urlError: false,
};

beforeAll(() => {
  globalThis.Buffer = {
    from: (str: string) => ({
      toString: () => btoa(str),
    }),
  } as unknown as typeof Buffer;
});

test('renders component correctly', () => {
  render(<UrlInput {...initialProps} />);
  expect(screen.getByLabelText(/GraphQL Endpoint URL/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/SDL Endpoint URL/i)).toBeInTheDocument();
});

test('handles URL change and updates state and URL', () => {
  render(<UrlInput {...initialProps} />);
  const endpointInput = screen.getByLabelText(
    /GraphQL Endpoint URL/i,
  ) as HTMLInputElement;
  fireEvent.change(endpointInput, { target: { value: 'http://newurl.com' } });
  expect(mockSetEndpoint).toHaveBeenCalledWith('http://newurl.com');
  expect(mockSetSdlUrl).toHaveBeenCalledWith('http://newurl.com?sdl');
  const url = new URL(window.location.href);
  expect(url.searchParams.get('encodedUrl')).toBe(btoa('http://newurl.com'));
});

test('handles empty URL and updates state and URL', () => {
  render(<UrlInput {...initialProps} />);
  const endpointInput = screen.getByLabelText(
    /GraphQL Endpoint URL/i,
  ) as HTMLInputElement;
  fireEvent.change(endpointInput, { target: { value: '' } });
  expect(mockSetSdlUrl).toHaveBeenCalledWith('?sdl');
  const url = new URL(window.location.href);
  expect(url.searchParams.get('encodedUrl')).toBeNull();
});

test('handles SDL URL change', () => {
  render(<UrlInput {...initialProps} />);
  const sdlInput = screen.getByLabelText(
    /SDL Endpoint URL/i,
  ) as HTMLInputElement;
  fireEvent.change(sdlInput, { target: { value: 'http://newurl.com?sdl' } });
  expect(mockSetSdlUrl).toHaveBeenCalledWith('http://newurl.com?sdl');
});

test('shows error tooltip when urlError is true', () => {
  render(<UrlInput {...initialProps} urlError={true} />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
