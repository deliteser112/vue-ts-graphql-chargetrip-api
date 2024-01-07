const path = require('path')

module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    // tell Jest to handle *.vue files
    'vue',
  ],
  transform: {
    // process *.vue files with vue-jest
    '.*\\.(vue)$': 'vue-jest',
    // process js with babel-jest
    '^.+\\.js$': 'babel-jest',
    // process ts with ts-jest
    '^.+\\.ts$': 'ts-jest',
    '\\.graphql$': 'jest-transform-graphql',
  },
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    '^@/(.*)$': path.resolve(__dirname, './src/$1'),
  },
  // serializer for snapshots
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
}
