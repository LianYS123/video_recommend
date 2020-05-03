const Router = require('koa-router');
let router = new Router();
let auth = require('../middleware/auth');
router.options('*', ctx => {
    ctx.body = { ok: true }
})
router.use('/api', require('./api'));
router.use('/user', require('./user'));
router.use('/space', auth, require('./space'));
router.use('/article', require('./article'));

module.exports = router.routes();