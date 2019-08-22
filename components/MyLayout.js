import { useCallback, useState } from 'react'
import { Layout, Icon, Input, Avatar, Dropdown, Menu, Tooltip } from 'antd'
import Container from '../components/container'
import { connect } from 'react-redux'
import githubConfig from '../github.config'
import { logout } from '../store/store'
const { Header, Content, Footer } = Layout

const githubIconStyle = {
    color: 'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    marginRight: 20
}

function MyLayout({ user, logout, ...props }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = useCallback((event) => {
        setSearchValue(event.target.value);
    }, [searchValue]);
    const handleLogout = useCallback(() => {
        logout();
    }, [])

    const menu = (
        <Menu>
            <Menu.Item>
                <a href='javascript:void(0)' onClick={handleLogout}>退出</a>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout>
            <Header>
                <Container comp={<div className="container" />}>
                    <div className='content-left'>
                        <div className='logo'>
                            <Icon type='github' style={githubIconStyle} />
                        </div>
                        <div className="search">
                            <Input.Search value={searchValue} onChange={handleSearch} />
                        </div>
                    </div>
                    <div className="content-right">
                        {
                            user && user.id ?
                                <Dropdown overlay={menu}>
                                    <a href='#'><Avatar src={user.avatar_url} size={40} /></a>
                                </Dropdown>
                                :
                                <Tooltip title='点击登录'>
                                    <a href={githubConfig.oauth_url}><Avatar icon='user' size={40} /></a>
                                </Tooltip>
                        }
                    </div>
                </Container>
            </Header>
            <Content>
                <Container style={{ color: 'red' }}>
                    {props.children}
                </Container>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                next@2019 Created by CC <a href='mailto:chenorange12@gamil.com'>chenorange12@gmail.com</a>
            </Footer>
            <style jsx>{`
                .container{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                .content-left{
                    display:flex;
                    justify-content:flex-start
                }
                .content-left .logo{
                    font-size:40px;
                    color:white;

                }
                .content-left .search{
                    margin-left:30px
                }
                .content-right{
                    color:white;
                }
               
            `}
            </style>
            <style global jsx>{`
                #__next{
                    height:100vh;
                    width:100vw;
                }
                .ant-layout{
                    height:100vh;
                }
                .ant-layout-header{
                    padding-left: 0;
                    padding-right:0;
                }
            `}
            </style>
        </Layout>
    )
}
const mapStateProps = (state) => ({ user: state.user })
const mapDispatchProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(mapStateProps, mapDispatchProps)(MyLayout)