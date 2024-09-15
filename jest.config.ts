import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/global.d.ts',
    '!**/i18n-config.ts',
    '!**/jest.config.ts',
    '!**/middleware.ts',
    '!**/next-env.d.ts',
    '!**/tailwind.config.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  clearMocks: true,
  transformIgnorePatterns: [
    'node_modules/(?!react-syntax-highlighter)',
    // '@testing-library/jest-dom/extend-expect',
  ],
};

async function transformedJestConfig() {
  const nextJestConfig = await createJestConfig(config)();
  nextJestConfig.transformIgnorePatterns![0] =
    '/node_modules/(?!(react-syntax-highlighter))/';
  return nextJestConfig;
}

export default transformedJestConfig;
