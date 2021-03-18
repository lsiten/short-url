'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await this.service.eat.eat();
    ctx.body = '1111';
  }
  async getrestaurant() {
    const { ctx } = this;
    const restaurants = await this.service.eat.getrestaurant();
    ctx.body = restaurants;
  }
}

module.exports = HomeController;
