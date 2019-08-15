import React, { Component } from 'react';
import '../styles/index.scss'
import { connect } from 'react-redux';
import initsStore from '../store/store';
import Blogs from '../components/Blogs';

class Index extends Component {

  static async getInitialProps({ store }) {
    this.store = store;
    return {};
  }

  render() {

    return (

      <div id='mainPage'>
        <div className="gridWrapper">
          <Blogs />
        </div>
      </div>

    );
  }
}

export default connect(initsStore)(Index);