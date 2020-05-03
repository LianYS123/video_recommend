const Koa = require('koa');
const koaStatic = require('koa-static');
const body = require('koa-better-body');
const {SERVER_PORT, PATH_STATIC, PATH_UPLOAD, baseURL} = require('./config');
const convert = require('koa-convert');
const notice = require('./libs/notice');
let server = new Koa();
server.context.db = require('./libs/database');
server.context.baseURL = baseURL;
server.use(async (ctx,next) => {
    ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials":"*"
    })
    await next();
})
server.use(convert(body({
    uploadDir: PATH_UPLOAD
})))
server.use(koaStatic(PATH_STATIC,{}));

server.use(async (ctx,next) => {
    try{
        await next();
    } catch(e){
        if(typeof e === 'string'){
            ctx.status = 400;
            ctx.body = {ok: false, msg: e};
        } else {
            if(e.status !== 401){
                ctx.status = 500;
                ctx.body = {ok: false, msg: 'Interval server error'};
                notice(e);
            } else {
                ctx.status = 401;
                ctx.body = {ok:false, msg: 'Authentication Error'};
            }
        }
    }
})
server.use(require('./middleware/ip'));
server.use(require('./routers'));

server.listen(SERVER_PORT);
