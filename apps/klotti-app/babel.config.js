const path = require('path');

module.exports = function (api) {
  const envName = process.env.NODE_ENV || 'development';
  const dotEnvPath = path.resolve(__dirname, '../..', `.env.${envName}`);

  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
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
      'react-native-reanimated/plugin',
      'expo-router/babel',
      'nativewind/babel'
    ]
  };
};
