const Koa=require('koa');
const next=require('next');
const Router=require('koa-router');
const session=require('koa-session');
const RedisSessionStore=require('./server/session-store')
const Redis=require('ioredis');
const oauth =require('./server/oauth')
const port=process.env.PORT||3000
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle=app.getRequestHandler();
const redis=new Redis();

app.prepare().then(()=>{
    const server=new Koa();
    const router=new Router()

    server.keys=['cc develop github app'];
    const SESSION_CONFIG={
        key: 'koa:sess',
        store:new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG,server));
    oauth(server);
    router.get('/a/:id',async ctx=>{
        console.log(ctx.query,'query');
        await app.render(ctx.req,ctx.res,'/a',ctx.query)
        ctx.respond=false
    })
    router.get('/set/user',async ctx=>{
        ctx.session.user={
            name:'cc',
            age:18
        };
        ctx.body='set session s uccess'
    })
    router.get('/del/user',async ctx=>{
        ctx.session={};
        ctx.body='销毁session'
    })

    router.get('*',async ctx=>{
        await handle(ctx.req,ctx.res)
        ctx.respond=false
    })
    server.use(async (ctx,next)=>{
        ctx.res.statusCode=200;
        await next()
    })
    server.use(router.routes())

    server.listen(port,()=>{
        console.log(`> Ready on http://localhost:${port}`)
    })
})