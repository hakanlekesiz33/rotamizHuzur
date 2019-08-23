import React, { Component } from 'react';
import '../styles/carousel.scss';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import Blogs from '../components/Blogs';
import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';


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
          <Carousel>
                <div>
                    <img src="../static/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="../static/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="../static/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            <Blogs blogsArray={blogsArray} />
          </div>
        </div>
      </>

    );
  }
}

export default connect(initsStore)(Index);