import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar';
import Footer from '../Navigation/Footer';

class Layout extends Component {
  
  render() {

    return (
      <>
        <Toolbar />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </>
    )
  }
}


export default Layout;
