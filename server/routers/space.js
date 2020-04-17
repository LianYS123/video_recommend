let Router = require('koa-router');
let router = new Router();
router.get('/test', async ctx => {
    ctx.body = { ok: true, msg: '这是一条来自后端的数据,需要登录认证权限才能获取' };
})

module.exports = router.routes();