// use this to automatically import all modules with module name matching filename

import camelCase from 'lodash/camelCase';

const requireModule = require.context(
  '.', false, /\.js$/,
);

const modules = {};

// don't load dummy when creating state
requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') {
    return;
  }

  const moduleConfig = requireModule(fileName);
  // Convert name to camel case. Remove ./ from name. Remove .js from name
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
