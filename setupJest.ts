import '@testing-library/jest-dom';
export const mockPush = jest.fn();

jest.mock('next/navigation', () => {
  const router = {
    push: mockPush,
    replace: jest.fn(),
  };

  return {
    useParams: jest.fn().mockReturnValue({ lang: 'en' }),
    usePathname: jest.fn().mockReturnValue(''),
    useRouter: jest.fn().mockReturnValue(router),
  };
});

global.TextEncoder = require('util').TextEncoder;
