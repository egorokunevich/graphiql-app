// import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest';

// const jestConfig: JestConfigWithTsJest = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   testEnvironmentOptions: {
//     customExportConditions: [''],
//   },
//   transform: {
//     ...createDefaultPreset().transform,
//     '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
//     '.+\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
//   },
//   moduleNameMapper: {
//     '\\.(gif|ttf|eot|svg|png|css|scss|sass|less)$': 'jest-transform-stub',
//     '^@/(.*)$': '<rootDir>/$1',
//     '^@src/(.*)$': '<rootDir>/src/$1',
//     '^@app/(.*)$': '<rootDir>/app/$1',
//   },
//   moduleDirectories: ['node_modules', '<rootDir>'],
//   collectCoverage: true,
//   collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/.next/**'],
//   globals: {
//     // NextJS forces to "jsx": "preserve", which fails with Jest. This makes it run with "jsx": "react-jsx"
//     'ts-jest': {
//       tsconfig: {
//         jsx: 'react-jsx',
//       },
//     },
//   },
// };

// export default jestConfig;
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
  },
  collectCoverageFrom: ['**/*.{ts,tsx}'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
