---
id: 'custom-webpack-config'
title: 'Custom Webpack Config'
---

## Default mode


That's why we allow you to customize our webpack setup by providing a `webpack.config.js` file exporting a **webpack 4** compatible config exported as a **commonjs module**.

There are a few ways to do it:

## Extend Mode

You'll get _extend-mode_ by returning an object.

Let's say you want to add [SASS](http://sass-lang.com/) support to Storybook. This is how to do it.
Add the following content to a file called `webpack.config.js` in your Storybook config directory (`.storybook` by default ).

```js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};
```

Since this config file stays in the Storybook directory, you need to set the include path as above. If the config directory stays in a different directory, you need to set the include path relative to that.

You also need to install the loaders (style, css, sass, as well as node-sass) used in above config manually.

> Once you create this `webpack.config.js` file, Storybook won't load the [default webpack config](/configurations/default-config/) other than loading JS files with the Babel loader. This will disable included functionality like svg loading. Read on to learn how to [retain defaults](#full-control-mode--default).

### Supported Webpack Options

You can add any kind of webpack configuration options with the above config, whether they are plugins, loaders, or aliases.
But you won't be able to change the following config options:

* entry
* output
* js loader with babel

For the advanced usage we strongly recommend [full control mode](#full-control-mode).

## Full Control Mode

Sometimes, you will want to have full control over the webpack configuration.
Maybe you want to add different configurations for dev and production environments.
That's where you can use our full control mode.

To enable that, you need to export a **function** from the above `webpack.config.js` file, just like this:

```js
const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });

  // Return the altered config
  return storybookBaseConfig;
};
```

Storybook uses the config returned from the above function. So, try to edit the `storybookBaseConfig` with care. Make sure to preserve the following config options:

* entry
* output
* first loader in the module.loaders (Babel loader for JS)
* all existing plugins

> If your custom webpack config uses a loader that does not explicitly include specific file extensions via the `test` property, it is necessary to `exclude` the `.ejs` file extension from that loader.

## Full control mode + default

You may want to keep Storybook's [default config](/configurations/default-config), but just need to extend it.
If so, this is how you do it using the Full Control Mode.
Add following content to the `webpack.config.js` in your Storybook config directory.

```js
const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("ts-loader")
  });
  defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};
```

For full instructions on Typescript setup, check [our dedicated Typescript page](/configurations/typescript-config/).

## Using Your Existing Config

You may have an existing webpack config for your project. So, you may need to copy and paste some config items into Storybook's custom webpack config file.

But you don't need to. There are a few options:

* Import your main webpack config into Storybook's `webpack.config.js` and use the loaders and plugins used in that.
* Create a new file with common webpack options and use it in both inside the main webpack config and inside Storybook's `webpack.config.js`.
