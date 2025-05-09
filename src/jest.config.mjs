export default {
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.mjs'],
  transform: {
    // '^.+\\.m?[jt]sx?$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  injectGlobals: true,
  moduleFileExtensions: ['js', 'mjs'],
  testEnvironment: 'node',
  globals: {
    __DEV__: true, // if needed for your setup
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  //extensionsToTreatAsEsm: ['.js', '.mjs'],
};

// transform: {},
