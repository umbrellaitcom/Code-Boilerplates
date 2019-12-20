const extensions = ['.ts', '.tsx', '.js', '.jsx'];

module.exports = {
  extends: '@umbrellait/eslint-config-react',
  settings: {
    'import/resolver': {
      node: {
        extensions,
        moduleDirectory: ['node_modules'],
      },
      alias: {
        map: [['~', './src']],
        extensions,
      },
    },
  },
};
