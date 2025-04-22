// jest.config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs', 'json'],
  testMatch: ['**/tests/**/*.test.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^(.+).js$': '$1',
    'ipaddr.js': require.resolve('ipaddr.js'),
  },
};
