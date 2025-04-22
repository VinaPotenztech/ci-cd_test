// jest.config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs', 'json'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^(.+).mjs$': '$1', // Map .mjs imports correctly
  },
};
