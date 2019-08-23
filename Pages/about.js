import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import { fetchAboutPageItems } from '../store/actions/getAboutPageActions';


class About extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchAboutPageItems());
    let aboutStore = await store.getState().aboutPageItems;

    return { aboutStore }
  }

  render() {
    const { aboutStore} = this.props
    return (
      <>
        <div>akjdaks</div>
      </>
    )
  }
}
export default connect(initsStore)(About);