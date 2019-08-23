import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/Layout';
import initsStore from '../store/store';
import { fetchLayoutItems } from '../store/actions/layoutItemsActions';
import '../styles/Common.scss';
import '../styles/Components.scss';


class MyApp extends App {
  static async getInitialProps({ Component, ctx, store }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
     
    }
    
    if(ctx.req){
    await ctx.store.dispatch(fetchLayoutItems());
    }      
    return { pageProps, store }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </Provider>
      </Container>
    )
  }
}
export default withRedux(initsStore)(MyApp);