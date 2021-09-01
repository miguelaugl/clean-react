module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/data/**/index.ts',
    '!<rootDir>/src/domain/**/index.ts',
    '!<rootDir>/src/validation/**/index.ts',
    '!<rootDir>/src/main/**/*',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/main/test/cypress'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
};
