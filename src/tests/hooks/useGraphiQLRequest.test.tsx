import { renderHook, act } from '@testing-library/react';
import axios from 'axios';

import { useGraphiQLRequest } from '@/src/hooks/useGraphqlRequest';

jest.mock('axios');

describe('useGraphiQLRequest', () => {
  const mockResponse = {
    status: 200,
    data: { data: 'response data' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send a GraphQL request successfully', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() =>
      useGraphiQLRequest('https://example.com/graphql', 'query', '{}', [], ''),
    );

    await act(async () => {
      await result.current.handleSendRequest();
    });

    expect(axios.post).toHaveBeenCalledWith(
      'https://example.com/graphql',
      { query: 'query', variables: {} },
      { headers: {} },
    );
    expect(result.current.response).toEqual({
      status: 200,
      data: { data: 'response data' },
    });
    expect(result.current.resLoading).toBe(false);
  });

  it('should handle invalid endpoint URL', async () => {
    const { result } = renderHook(() =>
      useGraphiQLRequest('', 'query', '{}', [], ''),
    );

    await act(async () => {
      await result.current.handleSendRequest();
    });

    expect(result.current.urlError).toBe(true);
    expect(result.current.response).toBe(null);
  });

  it('should handle a network error', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() =>
      useGraphiQLRequest('https://example.com/graphql', 'query', '{}', [], ''),
    );

    await act(async () => {
      await result.current.handleSendRequest();
    });

    expect(result.current.response?.message).toEqual('Network Error');
  });
});
