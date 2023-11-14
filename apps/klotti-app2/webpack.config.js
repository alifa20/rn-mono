const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['nativewind']
      }
    },
    argv
  );
  // Customize the config before returning it.
  // Maybe you want to turn off compression in dev mode.
  if (config.mode === 'development') {
    config.devServer.compress = false;
  }

  // Or prevent minimizing the bundle when you build.
  if (config.mode === 'production') {
    config.optimization.minimize = false;
  }

  // You can override the config here, for example:
  config.resolve.alias = {
    ...config.resolve.alias,
    '@react-native-firebase/app$': path.resolve(
      __dirname,
      'config/webpack/firebase/app.js'
    ),
    '@react-native-firebase/auth$': path.resolve(
      __dirname,
      'config/webpack/firebase/auth.js'
    ),
    'react-native-fbsdk-next$': path.resolve(
      __dirname,
      'config/webpack/react-native-fbsdk-next.js'
    ),
    '@react-native-google-signin/google-signin$': path.resolve(
      __dirname,
      'config/webpack/react-native-google-signin.js'
    )
  };
  // /Users/senghuotlay/Klotti/klotti/apps/klotti-app/webpack/app.js

  config.module.rules.push({
    test: /\.css$/i,
    use: ['postcss-loader']
  });

  return config;
};
