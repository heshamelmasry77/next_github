import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import WithRedux from '../lib/with-redux'
//引入全局样式
import 'antd/dist/antd.css'
class MyApp extends App {
    render() {
        const { Component, pageProps, reduxStore } = this.props
        console.log(reduxStore,'store');
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}
export default WithRedux(MyApp);