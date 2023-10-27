// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
'use strict';

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const {
    resolver: {assetExts},
  } = defaultConfig;

  // Thêm các phần mở rộng tài sản bạn muốn hỗ trợ
  const newAssetExts = [
    ...assetExts,
    'obj',
    'mtl',
    'JPG',
    'vrx',
    'hdr',
    'gltf',
    'glb',
    'GLB',
    'bin',
    'arobject',
    'gif',
    'mp4',
  ];

  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: newAssetExts,
    },
  });
})();
