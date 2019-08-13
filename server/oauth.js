
require('isomorphic-unfetch')

const githubConfig = require('../github.config');

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === '/oauth') {
            const { client_id, client_secret,access_token_url} = githubConfig
            try {
                const tokenResponse = await fetch(`${access_token_url}?client_id=${client_id}&client_secret=${client_secret}&code=${ctx.query.code}`,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => response.json())
                if(tokenResponse&&tokenResponse.access_token){
                    const user=await fetch('https://api.github.com/user',{
                        headers:{
                            Authorization:`token ${tokenResponse.access_token}`
                        }
                    }).then(response=>response.json())
                    console.log(user);
                    ctx.body=JSON.stringify(user);
                }
            } catch (error) {
                ctx.body='error request';
                console.log(error,'error');
            }


        } else {
            await next();
        }
    })
}