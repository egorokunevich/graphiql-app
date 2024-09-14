import { delay, http, HttpResponse } from 'msw';

import { mockResponse } from './mockResponse';

export const handlers = [
  http.get('mock-endpoint.com', async () => {
    await delay();
    return HttpResponse.json(mockResponse);
  }),
];
