# 服务端渲染问题？
- 服务端如何写入数据到store
- 如何同步服务端的数据到客户端

# OAuth介绍与使用
OAuth 是一种授权机制。数据的所有者告诉系统,同意授权第三方应用进入系统,获取这些数据。系统从而产生一个短期的进入令牌(token),用来代替密码,供第三方应用使用。

## 授权方式
1. 授权码(authorization-code)
2. 隐藏式(implicit)
3. 密码式(password)
4. 客户端凭证(client credentials)
*: 以上应用授权方式在获取令牌之前都需要先到系统备案，然后拿到客户端ID(client ID)和客户端密钥(client secret)。
[详细区别请看这里](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)

## github OAuth 实践
1. 申请 OAuth 权限
步骤查看[github Creating OAuth App](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

2. 获取授权码

`请求地址`
```
https://github.com/login/oauth/authorize?client_id=xxx&scope=user
```
授权后会跳转至在`github Creating OAuth App`中设置的 `redirect_url`,然后后端通后路由获取到前端code参数并 access token:

3. 获取令牌(token)
   
```js
require('isomorphic-unfetch')

const oauth=async (ctx, next) => {  
    const { client_id, client_secret,access_token_url} = githubConfig
    try {
        const tokenResponse = await fetch(`${access_token_url}?client_id=${client_id}&client_secret=${client_secret}&code=${ctx.query.code}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json());
        // 存储令牌... (一般存储cookies 或者redis中)
        
        //下一步获取用户数据

    } catch (error) {
        ctx.body='error request';
        console.log(error,'error');
    }
}
 route.get('/oauth',oauth)
```
4. 获取github 数据
```js
if(tokenResponse&&tokenResponse.access_token){
    const user=await fetch('https://api.github.com/user',{
        headers:{
            Authorization:`token ${tokenResponse.access_token}`
        }
    }).then(response=>response.json())
    console.log(user);
    ctx.body=JSON.stringify(user);
}
```

