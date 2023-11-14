// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

// module.exports = config;
module.exports = makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
});
