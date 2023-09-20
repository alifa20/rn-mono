// // Learn more https://docs.expo.dev/guides/monorepos
// const { getDefaultConfig } = require('expo/metro-config');
// // const { getDefaultConfig } = require('expo/metro-config');
// const { makeMetroConfig } = require('@rnx-kit/metro-config');
// const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

// // const { FileStore } = require('metro-cache');
// // const path = require('path');

// const projectRoot = __dirname;
// // const workspaceRoot = path.resolve(projectRoot, '../..');

// const expoConfig = getDefaultConfig(projectRoot);
// const config = makeMetroConfig({
//   ...expoConfig,
//   resolver: {
//     ...expoConfig.resolver,
//     resolveRequest: MetroSymlinksResolver(),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// });

// // // #1 - Watch all files in the monorepo
// // config.watchFolders = [workspaceRoot];
// // // #3 - Force resolving nested modules to the folders below
// // config.resolver.disableHierarchicalLookup = true;
// // // #2 - Try resolving with project modules first, then workspace modules
// // config.resolver.nodeModulesPaths = [
// //   path.resolve(projectRoot, 'node_modules'),
// //   path.resolve(workspaceRoot, 'node_modules'),
// // ];

// // // Use turborepo to restore the cache when possible
// // config.cacheStores = [
// //   new FileStore({ root: path.join(projectRoot, 'node_modules', '.cache', 'metro') }),
// // ];

// config.resolver.resolverMainFields = ['sbmodern', ...config.resolver.resolverMainFields];

// module.exports = config;

// packages/mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const { makeMetroConfig } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const symlinkResolver = MetroSymlinksResolver();

const requestResolver = (context, moduleName, platform, realName) => {
  // patch for unpatched dependencies
  // e.g. react-native-version-check-expo
  if (moduleName === '@unimodules/core') {
    const expoModules = 'expo-modules-core';
    return symlinkResolver(context, expoModules, platform, expoModules);
  }

  return symlinkResolver(context, moduleName, platform, realName);
};

module.exports = {
  ...defaultConfig,
  ...makeMetroConfig({
    projectRoot: __dirname,
    resolver: {
      resolveRequest: requestResolver,
    },
  }),
};
