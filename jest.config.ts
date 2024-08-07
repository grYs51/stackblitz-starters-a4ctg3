import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    'transformRegex': ["ts-jest", { "tsconfig": "<rootDir>/tsconfig.spec.json" }],
  },
};

export default jestConfig;