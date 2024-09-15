import axios from 'axios';

import { sendHttpRequest } from '@src/hooks/useHttpRequest';

jest.mock('axios');

describe('sendHttpRequest', () => {
  it('should send a GET request successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: 'success' });

    const response = await sendHttpRequest('GET', 'https://example.com');

    expect(axios.get).toHaveBeenCalledWith('https://example.com');
    expect(response?.data).toEqual('success');
  });

  it('should throw an error for invalid method', async () => {
    await expect(
      sendHttpRequest('INVALID', 'https://example.com'),
    ).rejects.toThrow('Invalid HTTP method');
  });

  it('should handle a POST request', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: 'created' });

    const response = await sendHttpRequest('POST', 'https://example.com');

    expect(axios.post).toHaveBeenCalledWith('https://example.com');
    expect(response?.data).toEqual('created');
  });
});
