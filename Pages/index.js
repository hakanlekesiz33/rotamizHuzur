import React, { Component } from 'react';
import '../styles/index.scss';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import Blogs from '../components/Blogs';
import Head from 'next/head';

class Index extends Component {

  render() {

    const store = this.props.getState();
    const blogsArray = [];
    for (let key in store.layoutItems.blogs) {
      if (store.layoutItems.blogs[key].IsShowHomePage) {
        blogsArray.push({
          id: store.layoutItems.blogs[key].Id,
          config: store.layoutItems.blogs[key]
        });
      }

    }

    return (
      <>
        <Head>
          <title>Rotamız Huzur | Ana Sayfa</title>
          {/* <meta name="description" content="ana sayfa"></meta> */}
          {/* <meta name="keywords" content="rotamız huzur, gezi yazıları, gezelim görelim, en iyi gezi deneyimleri"></meta> */}
        </Head>
        <div id='mainPage'>
          <div className="gridWrapper">
            <Blogs blogsArray={blogsArray} />
          </div>
        </div>
      </>

    );
  }
}

export default connect(initsStore)(Index);