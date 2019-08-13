
const GETHUB_OAUTH_URL='https://github.com/login/oauth/authorize';
const GETHUB_ACCESS_TOKEN='https://github.com/login/oauth/access_token'
const client_id="501e86d1162e89658b55";
const SCOPE='user';

const githubConfig={
        client_id,
        client_secret:"f93488dcdb4b81e24ccb3dc9dfb0a379b866e4f3",
        oauth_url:`${GETHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
        access_token_url:GETHUB_ACCESS_TOKEN
}

module.exports=githubConfig