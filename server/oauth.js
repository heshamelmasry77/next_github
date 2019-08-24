
require('isomorphic-unfetch')

const githubConfig = require('../github.config');

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === '/oauth') {
            const { client_id, client_secret, access_token_url } = githubConfig
            try {
                const { access_token, token_type } = await fetch(`${access_token_url}?client_id=${client_id}&client_secret=${client_secret}&code=${ctx.query.code}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => response.json())

                if (access_token) {
                    const user = await fetch('https://api.github.com/user', {
                        headers: {
                            Authorization: `${token_type} ${access_token}`
                        }
                    }).then(response => response.json())
                    ctx.session.userInfo = user;
                    //跳转到用户之前进入授权页面
                    ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/');
                    //清空 url
                    ctx.session.urlBeforeOAuth=null;
                    // ctx.body='ok'
                }
            } catch (error) {
                ctx.body = 'error request';
                console.log(error, 'error');
            }
        } else {
            await next();
        }
    })
    server.use(async (ctx, next) => {
        const { path, method } = ctx;
        if (path === '/logout' && method === 'POST') {
            ctx.session = null;
            ctx.body = { status: 200 }
        } else {
            await next()
        }
    })
    //记录用户授权之前的页面地址
    server.use(async (ctx, next) => {
        const { path, query: { url } } = ctx;
        if (path === '/prepare-auth') {
            ctx.session.urlBeforeOAuth = url;
            ctx.body = { status: 200 };
        } else {
            await next();
        }
    })
}