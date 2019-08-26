import { useCallback, useEffect } from 'react';
import { Button, Icon, Tabs } from 'antd'
import { connect } from 'react-redux'
import LRU from 'lru-cache'
import { withRouter } from 'next/router'
import Repo from '../components/Repo'
import githubConfig from '../github.config'
import api from '../lib/api'

const options = {
    maxAge: 1000 * 60 * 10,
}
const cache = new LRU(options);
const isServer = typeof window === 'undefined'
const HomePage = ({ user, userRepos = [], userStarredRepos = [], router }) => {
    const tabKey = router.query.key || '1';
    const handleTabClick = useCallback((key) => {
        router.push(`/?key=${key}`)
    })
    useEffect(() => {
        if (!isServer) {
            if (userRepos && userStarredRepos) {
                cache.set('cahceRepos', { userRepos, userStarredRepos })
            }
        }
        
    }, [userRepos, userStarredRepos])

    if (!user.id) {
        return (
            <div className="root">
                <p>您还未登录，请登录</p>
                <Button type='primary'>
                    <a href={githubConfig.oauth_url}>登录github</a>
                </Button>
                <style jsx>{`
                    .root{
                        height:400px;
                        display:flex;
                        flex-direction:row;
                        justify-content:center;
                        align-items:center;
                    }
                `}</style>
            </div>
        )
    }
    return (
        <div className="root">
            <div className="user-info">
                <img className="avatar" src={user.avatar_url} alt="user avatar" />
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="email">
                    <Icon type="mail" style={{ marginRight: 10 }} />
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
            <div className="user-repos">
                <Tabs defaultActiveKey={tabKey} onChange={handleTabClick}>
                    <Tabs.TabPane key="1" tab='Repositories'>
                        {
                            userRepos.map(repo => <Repo key={repo.id} {...repo} />)
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab='Starts'>
                        {
                            userStarredRepos.map(repo => <Repo key={repo.id} {...repo} />)
                        }
                    </Tabs.TabPane>
                </Tabs>

            </div>
            <style jsx>{` 
                .root{
                    display:flex;
                    align-items:flex-start;
                    padding: 10px;
                }
                .user-info{
                    width: 200px;
                    margin-right:40px;
                    flex-shrink:0;
                    display:flex; 
                    flex-direction:column;
                }
                .avatar{
                     width:100%;
                     border-radius:5px;
                }
                .login{
                    font-size:20px;
                    font-weight:800;
                    margin-top: 20px;
                }
                .name{
                    font-size:16px;
                    color:#333;
                }
                .bio{
                    margin:20px 0;
                    color:#333;
                }
               .user-repos{
                   width:100vw;
               }
            `}</style>
        </div>
    )
}

HomePage.getInitialProps = async ({ req, res }) => {
    if (!isServer) {
        const repos = cache.get('cahceRepos');
        if (repos && repos.userRepos && repos.userStarredRepos) {
            const { userRepos, userStarredRepos } = repos;
            return {
                userRepos,
                userStarredRepos
            }
        }
    }
    const userRepos = await api.request({ url: '/user/repos' }, req, res)
    const userStarredRepos = await api.request({ url: '/user/starred' }, req, res);

    return {
        userStarredRepos,
        userRepos,
    }
}


const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage))