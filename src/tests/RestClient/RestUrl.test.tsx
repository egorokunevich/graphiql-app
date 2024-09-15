import { render, screen, fireEvent } from '@testing-library/react';

import { RestUrl } from '@/src/components/RestClient/RestUrl';

jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
}));

describe('RestUrl', () => {
  const setUrlMock = jest.fn();
  const setMethodMock = jest.fn();
  const handleSendRequestMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and allows URL change', () => {
    render(
      <RestUrl
        url=""
        setUrl={setUrlMock}
        method="GET"
        setMethod={setMethodMock}
        urlError={false}
        handleSendRequest={handleSendRequestMock}
      />,
    );

    const input = screen.getByLabelText('endpointURL');
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(setUrlMock).toHaveBeenCalledWith('https://example.com');
  });

  test('handles method change', () => {
    render(
      <RestUrl
        url=""
        setUrl={setUrlMock}
        method="GET"
        setMethod={setMethodMock}
        urlError={false}
        handleSendRequest={handleSendRequestMock}
      />,
    );

    fireEvent.mouseDown(screen.getByLabelText('method'));
    fireEvent.click(screen.getByText('POST'));

    expect(setMethodMock).toHaveBeenCalledWith('POST');
  });

  test('calls handleSendRequest on button click', () => {
    render(
      <RestUrl
        url=""
        setUrl={setUrlMock}
        method="GET"
        setMethod={setMethodMock}
        urlError={false}
        handleSendRequest={handleSendRequestMock}
      />,
    );

    fireEvent.click(screen.getByText('send'));

    expect(handleSendRequestMock).toHaveBeenCalled();
  });
});
