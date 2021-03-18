// app/service/user.js
const Service = require('egg').Service;

class EatService extends Service {
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
  async index() {
    const time = this.dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
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
          content: `打卡打卡～～～，别忘了 \n当前时间<font color="warning">${time}</font>`
        }
      }
    });
     console.log(res.data)
    return res.data;
  }
}

module.exports = EatService;
