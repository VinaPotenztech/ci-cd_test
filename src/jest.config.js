// src/jest.config.js
export default {
  testEnvironment: 'node',
  transform: {}, // No Babel, just pure ESM
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.js'],
};
