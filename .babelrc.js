module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    'babel-plugin-emotion',
    'babel-plugin-macros',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['babel-plugin-require-context-hook', 'babel-plugin-dynamic-import-node'],
    },
  },
  overrides: [
    {
      test: './examples/vue-kitchen-sink',
      presets: ['@babel/preset-env', 'babel-preset-vue'],
    },
    {
      test: [
        './lib/core/src/server',
        './lib/node-logger',
        './lib/codemod',
        './addons/storyshots',
        './addons/storysource/src/loader',
        './app/**/src/server/**',
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '8.11',
            },
          },
        ],
      ],
    },
  ],
};
