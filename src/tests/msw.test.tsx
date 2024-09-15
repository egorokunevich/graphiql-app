import { mockResponse } from './mocks/mockResponse';

import { server } from '@src/tests/mocks/server';

describe('MSW', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should mock response', async () => {
    const response = await fetch('mock-endpoint.com');

    const data = await response.json();

    expect(data).toEqual(mockResponse);
  });
});
