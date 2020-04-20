const Router = require('koa-router');
const { test, testAll } = require('../libs/validator');
const { sign } = require('../libs/common');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config');
const auth = require('../middleware/auth');
const db = require('../libs/database')
let router = new Router();
router.get('/login', async ctx => {
    ctx.body = { ok: true, msg: 'test' };
})
router.get('/info', auth, async ctx => {
    let { id } = ctx.state.user.data;
    if (id) {
        let userInfo = (await db.select('user', ['username'], db.convert({ user_id: id })))[0]
        ctx.body = {
            ok:true,
            userInfo
        }
    } else {
        ctx.body = {
            ok: false,
            message: '没id'
        }
    }
})

router.post('/login', async ctx => {
    let { username, password } = ctx.request.fields;
    testAll({ username, password });
    password = sign(password);
    let rows = await ctx.db.select('user', ['user_id'], `${ctx.db.convert({ username, password })}`);
    if (rows.length) {
        let { user_id: id } = rows[0];
        let token = jsonwebtoken.sign({
            exp: Math.floor(Date.now() / 1000) + 1000,
            data: { username, id }
        }, secret)

        ctx.body = {
            ok: true, token, userInfo: {
                id,
                username,
            }
        };
    } else {
        ctx.status = 400;
        ctx.body = { ok: false, msg: '用户名或密码错误' };
    }
})

router.post('/reg', async ctx => {
    let { username, password } = ctx.request.fields;
    testAll({ username, password });
    password = sign(password);
    let count = await ctx.db.getCount('user', `${ctx.db.convert({ username })}`);
    if (count) {
        ctx.status = 400;
        ctx.body = { ok: false, msg: '用户名已存在' };
    } else {
        let { insertId: id } = await ctx.db.insert('user', { username, password });
        let token = jsonwebtoken.sign({
            exp: Math.floor(Date.now() / 1000) + 1000,
            data: { username, id }
        }, secret)
        ctx.body = {
            ok: true, token, userInfo: {
                id,
                username,
            }
        };
    }
})


module.exports = router.routes();