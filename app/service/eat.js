// app/service/user.js
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
class EatService extends Service {
  // 随机选择一家餐厅
  getRandomRestaurant (restaurants) {
    const randIndex = Math.floor(restaurants.length * Math.random());
    return restaurants[randIndex];
  }
  dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
  }
  async eat() {
    const time = this.dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
    const eats = await this.getrestaurant();
    const restaurants = eats.restaurants || [];
    const customizeMessage = eats.message || '';
    const extendsConfig = eats.extends || {};
    const messageMain = eats.body || '';

    const content = `叮叮叮～～,干饭时间到了～～ \n当前时间<font color="warning">${time}</font>，请相关同事注意.${messageMain}\n\n今日选择餐厅：${this.getRandomRestaurant(restaurants)}${customizeMessage}`;
    const res = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=dbdef7b2-b359-4536-8f73-9da1aef8228e', {
      dataType: 'json',
      method: 'POST',
      headers:{
        "Accept": "*/*",
        "Content-Type":"application/json"
      },
      data: {
        msgtype: 'markdown',
        markdown: {
          content,
          ...extendsConfig,
        }
      }
    });
     console.log(res.data)
    return res.data;
  }
  async getrestaurant () {
    let eats = (await fs.readFileSync(path.resolve('./JSON/eatConfig.json'))).toString();
    try {
      eats = JSON.parse(eats);
    } catch (error) {
      eats = {};
    }
    return eats;
  }
}

module.exports = EatService;
