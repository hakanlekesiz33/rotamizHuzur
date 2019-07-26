import React, { Component } from 'react';
import '../styles/index.scss'

import { connect } from 'react-redux';
import initsStore from '../store/store';

class Search extends Component {

  static async getInitialProps({ store }) {
    this.store = store;
    return {};
  }


  render() {

    const store = this.props.getState();
    const card = store.cards.details;

    return(

      <div className="ahmet">
         {card.name }
      </div>
      
    );
  }
}

export default connect(initsStore)(Search);
