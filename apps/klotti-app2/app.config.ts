import { ExpoConfig, ConfigContext } from 'expo/config';

const devBuildConfig = {
  version: '0.0.98',
  ios: {
    buildNumber: '98'
  },
  android: {
    versionCode: 98
  },
  otaVersion: process.env.OTA_VERSION
};

export const DevConfig: ExpoConfig = {
  name: 'Klotti Deprecated (DEV)',
  slug: 'klotti-development-deprecated',
  version: devBuildConfig.version,
  ios: {
    buildNumber: devBuildConfig.ios.buildNumber,
    bundleIdentifier: 'com.klotti.development-deprecated',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false
    },
    googleServicesFile: './config/dev/GoogleService-Info.plist',
    entitlements: {
      'com.apple.developer.applesignin': ['Default']
    }
  },
  android: {
    // TODO: update package for android once it's been fully setup
    package: 'com.klotti.development',
    versionCode: devBuildConfig.android.versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/dev-adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    googleServicesFile: './config/dev/google-services.json'
  },
  icon: './assets/images/dev-icon.png',
  scheme: 'klotti-dev',
  splash: {
    image: './assets/images/dev-splash.png',
    backgroundColor: '#5D5FEF'
  },
  extra: {
    eas: {
      projectId: 'ba2f6606-f235-4356-9a87-7e75a6eb1d2b'
    }
  },
  updates: {
    url: 'https://u.expo.dev/ba2f6606-f235-4356-9a87-7e75a6eb1d2b',
    fallbackToCacheTimeout: 0
  },
  runtimeVersion: devBuildConfig.version,
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ],
    [
      'react-native-fbsdk-next',
      {
        appID: '235276509175947',
        clientToken: '3a01de02bfc094de74b04a79ddfa15d8',
        displayName: 'Klotti Dev',
        scheme: 'fb235276509175947',
        autoLogAppEventsEnabled: true,
        advertiserIDCollectionEnabled: true
      }
    ]
  ]
};

const prodBuildConfig = {
  version: '1.0.2',
  ios: {
    buildNumber: '2'
  },
  android: {
    versionCode: 2
  }
};

export const ProdConfig: ExpoConfig = {
  name: 'Klotti',
  slug: 'klotti',
  version: prodBuildConfig.version,
  ios: {
    buildNumber: prodBuildConfig.ios.buildNumber,
    bundleIdentifier: 'com.klotti',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    // TODO: update package for android once it's been fully setup
    package: 'com.klotti',
    versionCode: prodBuildConfig.android.versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  icon: './assets/images/icon.png',
  scheme: 'klotti',
  splash: {
    image: './assets/images/splash.png',
    backgroundColor: '#000000'
  },
  extra: {
    eas: {
      projectId: '9395a3fa-d974-477c-870e-f0e0a63a00bb'
    }
  },
  updates: {
    url: 'https://u.expo.dev/ba2f6606-f235-4356-9a87-7e75a6eb1d2b',
    fallbackToCacheTimeout: 0
  },
  runtimeVersion: '1.0.0'
};

const envConfig = process.env.APP_ENV === 'production' ? ProdConfig : DevConfig;

const sharedPlugins: (string | [] | [string] | [string, any])[] | undefined = [
  '@react-native-google-signin/google-signin',
  'expo-apple-authentication',
  // '@react-native-firebase/crashlytics',
  '@react-native-firebase/app'
];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...envConfig,
  extra: {
    ...envConfig.extra
  },
  plugins: [...(envConfig.plugins ?? []), ...sharedPlugins],
  originalFullName: '@owner/slug',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  web: {
    favicon: './assets/images/favicon.png'
  }
});
