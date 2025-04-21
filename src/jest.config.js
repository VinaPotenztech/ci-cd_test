export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  testMatch: ['**/tests/**/*.test.js'],
  roots: ['<rootDir>/src'], // Ensure Jest looks in the src directory for tests
  moduleDirectories: ['node_modules', 'src'], // Ensure node_modules is correctly resolved
};
