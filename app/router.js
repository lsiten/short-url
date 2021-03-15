'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/short/:key', controller.url.redirectUrl);
  router.get('/url/create', controller.url.genShortUrl);
};
