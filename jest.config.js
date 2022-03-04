module.exports = {
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        sourceMap: true,
        inlineSourceMap: true,
      },
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/test/**/?(*.)+(spec|test).[jt]s?(x)'],
};
