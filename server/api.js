require('isomorphic-unfetch')
const {reqestGithub} =require('../lib/api')
const github_base_url = 'https://api.github.com'

module.exports = (server) => {
    server.use(async (ctx, next) => {
        const {path,method,url} = ctx;
        if (path.startsWith('/github/')) {
            const githubPath = url.replace('/github/', '/');
            const githubAuth = ctx.session.githubAuth || {};
            const headers={};
            if(githubAuth.access_token){
              headers.Authorization = `${githubAuth.token_type} ${githubAuth.access_token}`
            }
            try {
                const result= await reqestGithub(method,githubPath,ctx.request.body,headers)
                if (result) {
                    ctx.body = result

                } else {
                    ctx.body = {
                        success: false
                    }
                }
                ctx.set('Content-Type', 'application/json')

            } catch (error) {
                console.error(error);
            }
        } else {
            await next()
        }
    })
}

// module.exports = (server) => {
//     server.use(async (ctx, next) => {
//         const { path } = ctx;
//         if (path.startsWith('/github/')) {
//             const githubAuth = ctx.session.githubAuth;
//             const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`;

//             const token = githubAuth && githubAuth.access_token;
//             let headers = {}
//             if (token) {
//                 headers.Authorization = `${githubAuth.token_type} ${githubAuth.access_token}`
//             }
//             try {
//                 const result = await fetch(githubPath, {
//                     method: 'GET',
//                     headers,
//                 }).then(resp=>resp.json());
//                 if(result) {
//                     ctx.body ={...result}

//                 }else{
//                     ctx.body={
//                         success:false
//                     }
//                 }
//                 ctx.set('Content-Type', 'application/json')

//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             await next()
//         }
//     })
// }