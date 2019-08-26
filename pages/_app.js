import App, { Container } from 'next/app'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
import Layout from '../components/MyLayout'
import WithRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'

//引入全局样式
// import 'antd/dist/antd.css'

class MyApp extends App {
    state = {
        loading: false
    }
    startLoading = () => {
        this.setState({
            loading: true
        })
    }
    stopLoading = () => {
        this.setState({
            loading: false
        })
    }
    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading);
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)

        // this.fetchData();
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.startLoading);
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }
    fetchData = async () => {
        const result = await fetch('/github/search/repositories?q=react').then(resp => resp.json())
        console.log(result, 'result fetch search data ');

    }
    render() {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                    {this.state.loading ? <PageLoading /> : null}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
}
export default WithRedux(MyApp);