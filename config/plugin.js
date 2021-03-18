'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  view: {
    enable: true,
    package: 'egg-view-pug'
  }
};
