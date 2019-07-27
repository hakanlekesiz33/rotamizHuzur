import React, { Component } from 'react';

class SearhBar extends Component {
    render () {
        return (
            <div className="searchbar">
                <input placeholder="Arama"></input>
                <div className='searchIcon'></div>
            </div>
        )
    }
}

export default SearhBar;