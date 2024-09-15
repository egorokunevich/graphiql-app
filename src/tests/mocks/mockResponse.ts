import { HistoryEntry } from '@/src/types';

export const mockResponse = {
  data: 'mock',
  status: '200',
};

export const mockHistoryRecord: HistoryEntry = {
  type: 'rest-client',
  method: 'GET',
  url: 'mock-endpoint.com',
  headers: { 'Content-Type': 'application/json' },
  body: '{mock}',
  sdlUrl: 'mock-endpoint.com',
  variables: [{ key: 'name', value: 'mock' }],
};
