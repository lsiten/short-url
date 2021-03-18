'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  // 生成短链接
  async genShortUrl() {
    const { ctx } = this;
    let longUrl = ctx.query.url || ctx.request.body.url || '';
    if (!ctx) {
      ctx.body = {
        code: 400,
        data: {
          url: ''
        },
        message: '请输入链接！'
      };
      return false;
    }
    const url = await this.service.shortUrl.createUrl(longUrl);
    ctx.body = {
      code: 200,
      data: {
        url: 'https://' + this.ctx.host + '/short/' + url,
      },
      message: '',
    }
  }
  /**
   * 短链接跳转
   */
  async redirectUrl () {
    // let key = ctx.
    const { ctx } = this;
    const key = ctx.params.key || '';
    if (!key) {
      ctx.body = '请输入正确的短链接';
      return false;
    }

    const longUrl = await this.service.shortUrl.getLongUrlByKey(key);
    if (!longUrl) {
      ctx.body = '请输入正确的短链接';
      return false;
    }
    this.ctx.redirect(longUrl);
    
  }
  // 生成短链接界面
  async create() {
    console.log('create');
    const { ctx } = this;
    await ctx.render('url/create.pug');
  }
}

module.exports = UrlController;
