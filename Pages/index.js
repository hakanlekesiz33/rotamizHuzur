import React, { Component } from 'react';
import '../styles/index.scss';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import Blogs from '../components/Blogs';

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

      <div id='mainPage'>
        <div className="gridWrapper">
          <Blogs blogsArray={blogsArray} />
        </div>
      </div>

    );
  }
}

export default connect(initsStore)(Index);