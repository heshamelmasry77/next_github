import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/MyLayout'
import WithRedux from '../lib/with-redux'

//引入全局样式
// import 'antd/dist/antd.css'

class MyApp extends App {
    render() {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
}
export default WithRedux(MyApp);