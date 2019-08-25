const Koa = require('koa');
const koaBody=require('koa-body')
const next = require('next');
const Router = require('koa-router');
const session = require('koa-session');
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis');
const oauth = require('./server/oauth')
const githubAPI =require('./server/api')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const redis = new Redis();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router()
    server.keys = ['cc develop github app'];
    const SESSION_CONFIG = {
        key: 'koa:github',
        store: new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG, server));
    server.use(koaBody())
    oauth(server);
    githubAPI(server);
    // router.get('/a/:id',async ctx=>{
    //     await app.render(ctx.req,ctx.res,'/a',ctx.query)
    //     ctx.respond=false
    // })

    router.get('*', async ctx => {
        //将服务端获取session 传递给next中间件
        ctx.req.session = ctx.session;
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next()
    })
    server.use(router.routes())

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})