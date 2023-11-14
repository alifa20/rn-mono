import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Klotti Storybook',
  slug: 'klotti-storybook',
  android: {
    package: 'com.klotti.storybook'
  },
  ios: {
    bundleIdentifier: 'com.klotti.storybook'
  },
  web: {
    bundler: 'metro'
  }
});
