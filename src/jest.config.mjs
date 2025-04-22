// jest.config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs', 'json'],
  testMatch: ['<rootDir>/tests/**/*.test.js'], // now <rootDir> is src/
  roots: ['<rootDir>'], // this will point to src/
  moduleDirectories: ['node_modules', '<rootDir>'], // so imports work like 'routes/somefile'
  moduleNameMapper: {
    '^(.+).js$': '$1',
    'ipaddr.js': require.resolve('ipaddr.js'),
  },
};
