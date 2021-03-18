'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/short/:key', controller.url.redirectUrl);
  router.get('/url/create', controller.url.genShortUrl);
  router.get('/url/short', controller.url.create);
  router.get('/eat/index', controller.eat.index);
  router.get('/eat/getrestaurant', controller.eat.getrestaurant);
};
