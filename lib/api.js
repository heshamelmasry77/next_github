
const isServer=typeof window === 'undefined'
const github_base_url = 'https://api.github.com'

async function reqestGithub(method,url,data,headers={}){
    const params={  method,headers,body:data,headers}
    if(method==='GET'){
        delete params.body;
    }
    return await fetch(`${github_base_url}${url}`,params).then(res=>res.json())
}
const request=({url,method='GET',data={}},req,res)=>{
    if(!url){
        throw Error ('url mast require');
    }
  if(isServer){
      const session=req.session;
      const githubAuth = session.githubAuth || {};

      const headers={};
      if(githubAuth.access_token){
        headers.Authorization = `${githubAuth.token_type} ${githubAuth.access_token}`
      }
      return reqestGithub(method,url,data,headers)
  }
  return reqestGithub(method,`/github${url}`,data);
}
module.exports={
    request,
    reqestGithub
}