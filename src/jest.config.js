export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs', 'json'],
  testMatch: ['**/tests/**/*.test.js'],
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '/^(.+).js$/': '$1', // Resolve .js imports
    'ipaddr.js': require.resolve('ipaddr.js'), // Explicitly map ipaddr.js if necessary
  },
};
