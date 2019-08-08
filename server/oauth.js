module.exports=(server)=>{
    server.use(async(ctx,next)=>{
        if(ctx.path==='/auth'){

        }else{
            await next();
        }
    })
}