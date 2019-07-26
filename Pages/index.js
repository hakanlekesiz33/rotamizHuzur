import React, { Component } from 'react';
import '../styles/index.scss'
import Link from 'next/link';
import { connect } from 'react-redux';
import initsStore from '../app/store';

class Index extends Component {

  static async getInitialProps({ store }) {
    this.store = store;
    return {};
  }

  render() {

    const store = this.props.getState();
    const card = store.cards.details;

    return (

      <div className="ahmet">
        {card.name}
        <Link href="/search">
         <a>tıkla</a> 
        </Link>
      </div>

    );
  }
}

export default connect(initsStore)(Index);
