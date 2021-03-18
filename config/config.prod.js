/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612862514402_4104';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://admin:123456@mongo:27017/short?authSource=admin',
      options: {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
