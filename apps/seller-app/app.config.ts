import { ExpoConfig, ConfigContext } from 'expo/config';

const devBuildConfig = {
  version: '0.0.1',
  ios: {
    buildNumber: '1'
  },
  android: {
    versionCode: 1
  },
  otaVersion: process.env.OTA_VERSION
};

export const DevConfig: ExpoConfig = {
  name: 'Seller (DEV)',
  slug: 'klotti-seller-development',
  version: devBuildConfig.version,
  ios: {
    buildNumber: devBuildConfig.ios.buildNumber,
    bundleIdentifier: 'com.klotti.seller.development',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false
    }
    // googleServicesFile: "./config/dev/GoogleService-Info.plist",
    // entitlements: {
    //   "com.apple.developer.applesignin": ["Default"],
    // },
  },
  android: {
    // TODO: update package for android once it's been fully setup
    package: 'com.klotti.seller.development',
    versionCode: devBuildConfig.android.versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/dev-adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
    // googleServicesFile: "./config/dev/google-services.json",
  },
  icon: './assets/images/dev-icon.png',
  scheme: 'klotti-seller-dev',
  splash: {
    image: './assets/images/dev-splash.png',
    backgroundColor: '#5D5FEF'
  },
  extra: {
    eas: {
      projectId: '08c22811-1438-4854-8a99-9dc1375b88e2'
    }
  },
  updates: {
    url: 'https://u.expo.dev/08c22811-1438-4854-8a99-9dc1375b88e2',
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
    ]
    // [
    //   "react-native-fbsdk-next",
    //   {
    //     appID: "235276509175947",
    //     clientToken: "3a01de02bfc094de74b04a79ddfa15d8",
    //     displayName: "Klotti Dev",
    //     scheme: "fb235276509175947",
    //     autoLogAppEventsEnabled: true,
    //     advertiserIDCollectionEnabled: true,
    //   },
    // ],
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
  name: 'Klotti Seller',
  slug: 'klotti-seller',
  version: prodBuildConfig.version,
  ios: {
    buildNumber: prodBuildConfig.ios.buildNumber,
    bundleIdentifier: 'com.klotti.seller',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    // TODO: update package for android once it's been fully setup
    package: 'com.klotti.seller',
    versionCode: prodBuildConfig.android.versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  icon: './assets/images/icon.png',
  scheme: 'klotti-seller',
  splash: {
    image: './assets/images/splash.png',
    backgroundColor: '#000000'
  },
  extra: {
    eas: {
      projectId: 'b985efd0-ccbb-46b1-91be-b3cc0460c5d6'
    }
  },
  updates: {
    url: 'https://u.expo.dev/b985efd0-ccbb-46b1-91be-b3cc0460c5d6',
    fallbackToCacheTimeout: 0
  },
  runtimeVersion: '1.0.0'
};

const envConfig =
  process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig;

const sharedPlugins: (string | [] | [string] | [string, any])[] | undefined = [
  // "@react-native-google-signin/google-signin",
  // "expo-apple-authentication",
  // '@react-native-firebase/crashlytics',
  // "@react-native-firebase/app",
  'expo-router'
];

const expoRouter = {
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true
  }
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...envConfig,
  extra: {
    ...envConfig.extra
  },
  ...expoRouter,
  owner: 'klotti',
  plugins: [...(envConfig.plugins ?? []), ...sharedPlugins],
  originalFullName: '@owner/slug',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro'
  }
});
