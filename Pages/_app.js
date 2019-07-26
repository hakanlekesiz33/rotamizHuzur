import React from 'react'
import Link from 'next/link';
import App, { Container } from 'next/app'
import { Provider } from 'react-redux';

import withRedux from 'next-redux-wrapper';
import initsStore from '../app/store';
import Layout from '../app/components/Layout';

import { fetchRandomCard } from '../app/actions/cardsActions';


class MyApp extends App {
  static async getInitialProps({ Component, ctx, store }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    if(ctx.req){
    console.log("app");
    await ctx.store.dispatch(fetchRandomCard());
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
                  