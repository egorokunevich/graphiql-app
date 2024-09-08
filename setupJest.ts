// This mocks will run before all tests

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ lang: 'en' }),
  usePathname: jest.fn().mockReturnValue(''),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
