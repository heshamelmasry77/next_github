
class RedisSessionStore {
    constructor(client) {
        this.client = client;
    }
    //get session object by key
    async get(sid) {
        // console.log(sid,'session set');
        const id = getRedisSessionId(sid);
        const data = await this.client.get(id);
        if (!data) {
            return null
        }
        try {
            const result= JSON.parse(data);
            return result;
        } catch (error) {
            console.err(err);
        }
    }
    //maxAge is ms
    async set(sid, sess, maxAge) {
        const id = getRedisSessionId(sid);
        if (typeof maxAge === 'number') {
            maxAge = Math.ceil(maxAge / 1000)
        }
        try {
            const sessStr = JSON.stringify(sess);
            if (maxAge) {
                await this.client.setex(id,maxAge,sessStr)

            } else {
                await this.client.set(id, sessStr)
            }
        } catch (err) {
            console.error(err)
        }
    }
    async destroy(sid) {
        const id=getRedisSessionId(sid);
        await this.client.del(id)
    }
}
module.exports=RedisSessionStore

function getRedisSessionId(sid) {
    return `github:${sid}`
}