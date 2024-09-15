import { setupServer } from 'msw/node';

import { handlers } from '@src/tests/mocks/handlers';

export const server = setupServer(...handlers);
