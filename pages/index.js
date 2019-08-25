import { Button } from 'antd'
import githubConfig from '../github.config'
import api from '../lib/api'

const HomePage=()=>{
    return(
        <div>
            <Button>登录</Button>
            <a href={githubConfig.oauth_url}>登录github</a>
        </div>
    )
}
HomePage.getInitialProps=async ({ctx,req,res})=>{
//   const result=await fetch('/github/search/repositories?q=react').then(resp=>resp.json())
//   console.log(result,'result fetch search data ');
    const result=await api.request({url:'/search/repositories?q=react'},req,res);    
    return {
        data:result.items
    }
}
export default HomePage