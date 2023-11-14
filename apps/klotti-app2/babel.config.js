const fs = require('fs');
const path = require('path');
// To access env inside the config file, use the following:
// https://www.harrytheo.com/blog/2021/07/environment-variables-and-babel/#access-env-variables-inside--babelconfigjs
// https://github.com/brysgo/babel-plugin-inline-dotenv/issues/38#issuecomment-510135137

module.exports = function (api) {
  api.cache(true);

  const envName = process.env.APP_ENV || 'development';
  const dotEnvPath = path.resolve(__dirname, `.env.${envName}`);

  console.log('envName', envName);

  if (!process.env.APP_ENV && !fs.existsSync(dotEnvPath)) {
    throw new Error(
      `Babel config couldn't find dot env file path: ${dotEnvPath}`
    );
  }
  console.info(`Loading environment variables from: ${dotEnvPath}`);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: dotEnvPath,
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true
        }
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@app': './app',
            '@config': './config',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
};
