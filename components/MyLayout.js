import { Layout, Icon, Input } from 'antd'
const { Header, Content, Footer } = Layout
export default function MyLayout(props) {
    return (
        <Layout>
            <Header>
                <div className="container">
                    <div className='content-left'>
                        <div className='logo'>
                            <Icon type='github'/>
                        </div>
                        <div className="search">
                            <Input.Search />
                        </div>
                    </div>
                    <div className="content-right">
                        icon
                    </div>
                </div>

            </Header>
            <Content>
                {props.children}
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
            `}
            </style>
        </Layout>
    )
}