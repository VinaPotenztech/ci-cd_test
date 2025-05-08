export default {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js', // Adjust if your tests have .spec.js or .ts
  ],
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  collectCoverage: true,
};
