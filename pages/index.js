import { Button } from 'antd'
import githubConfig from '../github.config'

const HomePage=()=>{
    return(
        <div>
            <Button>登录</Button>
            <a href={githubConfig.oauth_url}>登录github</a>
        </div>
    )
}
export default HomePage