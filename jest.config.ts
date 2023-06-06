module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  testEnvironment: 'jsdom',
};
