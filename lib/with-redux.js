import React from 'react'
import { initializeStore } from '../store/store.js'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
    // 保证在服务端store是新的
    if (isServer) {
        return initializeStore(initialState)
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

export default App => {
    return class WidthRedux extends React.Component {
        static async getInitialProps(appContext) {
            const { ctx: { req } } = appContext
            let reduxStore = getOrCreateStore();

            if (isServer) {
                const session = req.session;
                if (session && session.userInfo) {
                    reduxStore = getOrCreateStore({ user: session.userInfo });
                }
            }

            //将store提供给 pages
            appContext.reduxStore = reduxStore;

            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext)
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            }
        }
        constructor(props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}


// const WithRedux = (Comp) => {
//     function HocComp({ Component, pageProps, ...rest }) {
//         if (pageProps) {
//             pageProps.test = '123';
//         }
//         return <Comp Component={Component} pageProps={pageProps} {...rest} />
//     }
//     HocComp.getInitialProps = Comp.getInitialProps
//     return HocComp;
// }
// export default WithRedux;