import React, { Component } from 'react';
import '../styles/carousel.scss';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import Blogs from '../components/Blogs';
import MainPageSlider from '../components/Slider/MainPageSlider';
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
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
  />
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
  />
          {/* <meta name="description" content="ana sayfa"></meta> */}
          {/* <meta name="keywords" content="rotamız huzur, gezi yazıları, gezelim görelim, en iyi gezi deneyimleri"></meta> */}
        </Head>
        <div id='mainPage'>
          <div className="gridWrapper">
            <MainPageSlider />
            <Blogs blogsArray={blogsArray} />
          </div>
        </div>
      </>

    );
  }
}

export default connect(initsStore)(Index);