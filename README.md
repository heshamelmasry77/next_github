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