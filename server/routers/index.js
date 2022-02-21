const Router = require('koa-router');
let router = new Router();
let auth = require('../middleware/auth');
router.options('*', ctx => {
    ctx.body = { ok: true }
})
router.use('/api', require('./api'));
router.use('/api/user', require('./user'));
router.use('/api/space', auth, require('./space'));
router.use('/api/article', require('./article'));

module.exports = router.routes();