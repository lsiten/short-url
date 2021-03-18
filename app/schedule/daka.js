const Subscription = require('egg').Subscription;

class Eat extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // 每周1，2，3，4，5，6早上11点55 下午5点55执行
      cron: '0 30 20 * * 1,2,3,4,5',
      type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = await this.ctx.service.daka.index();
  }
}

module.exports = Eat;