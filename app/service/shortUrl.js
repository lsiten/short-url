// app/service/shortUrl.js
const Service = require('egg').Service;
const murmurhash = require('murmurhash');
const base62 = require('base62/lib/ascii');

class ShortUrlService extends Service {
  /**
   * 通过key值获取长链接
   * @param {*} key 
   */
  async getLongUrlByKey(key) {
    const longUrl = await this.ctx.model.ShortUrl.findOne({
      shortUrl: key,
    })
    if (!longUrl) {
      return false;
    }
    await this.ctx.model.ShortUrl.updateOne(longUrl, { $inc: { "visit": 1 } });
    return longUrl.longUrl;
  }
  
  /**
   * 通过userid值获取生成记录
   * @param {*} userid 
   */
  async getLogs(userid) {
    const now = Date.now();
    let logs = await this.ctx.model.ShortUrl.find({
      userid,
      expireTime: {
        $gte: now - 86400000 * 6
      }
    }).sort({_id:-1});
    if (!logs) {
      return false;
    }
    logs = logs.map(item => {
      return {
        shortUrl:'https://' + this.ctx.host + '/short/' + item.shortUrl,
        longUrl: item.longUrl,
      };
    });
    return logs;
  }
  /**
   * 生成短链接
   * @param {String} longUrl 长链接 
   * @param {String} userid 用户key fingerprint生成
   */

   async createUrl(longUrl, userid) {
    let shortUrl = '';
    // 判断数据库中是否已经有生成的短链接
    const exitOne = await this.ctx.model.ShortUrl.findOne({
      longUrl,
      userid,
      expireTime: {
        $gte: Date.now()
      }
    })
    if (exitOne) {
      shortUrl = exitOne.shortUrl;
    } else {
      const now = Date.now();
      shortUrl = this._hash(longUrl + userid);
      this.ctx.model.ShortUrl.create({
        shortUrl,
        longUrl,
        userid,
        expireTime: (now + 86400000),
      });
    }
    return shortUrl;
  }

  /**
   * hash生成短链 (使用类方法便于测试时mock)
   * @param {*} url
   */
  _hash(url) {
    return base62.encode(murmurhash.v3(url, Math.random()));
  }
}

module.exports = ShortUrlService;