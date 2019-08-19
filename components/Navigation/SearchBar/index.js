import React, { Component } from 'react';
import initsStore from '../../../store/store';
import { connect } from 'react-redux';
import Link from 'next/link';

class SearhBar extends Component {
    state = {
        searchParam: {
            value: '',
            touched: false
        },
        blogsArray: [],
        showSearchResults: false,
        isResults: false,
    }

    inputChangedHandler = (event) => {
        const updatedsearchParam = {
            ...this.state.searchParam
        };
        updatedsearchParam.value = event.target.value;
        updatedsearchParam.touched = true;

        const store = this.props.getState();
        const updateBlogsArray = [];
        let updatedShowSearchResults = false;
        let updatedIsResults = false;

        if (event.target.value.length > 2) {
            for (let key in store.layoutItems.blogs) {
                if (store.layoutItems.blogs[key].PageTitle.toLowerCase().includes(event.target.value) || store.layoutItems.blogs[key].Desc.toLowerCase().includes(event.target.value)) {
                    updateBlogsArray.push({
                        id: store.layoutItems.blogs[key].Id,
                        config: store.layoutItems.blogs[key]
                    });
                }
            }
            updateBlogsArray.length != 0 ? (
                updatedShowSearchResults = true
            ) : (
                    updatedShowSearchResults = false,
                    updatedIsResults = true
                )
        }

        this.setState({
            searchParam: updatedsearchParam,
            blogsArray: updateBlogsArray,
            showSearchResults: updatedShowSearchResults,
            isResults: updatedIsResults
        });

    }

    render() {

        return (
            <div className="searchbar">
                <input
                    value={this.state.searchParam.value}
                    onChange={(event) => this.inputChangedHandler(event)}
                    placeholder="Arama"></input>
                <div className='searchIcon'></div>
                {
                    this.state.showSearchResults || this.state.isResults ? (
                        <div className="searchResults">
                            {
                                this.state.isResults ? (
                                    <div>
                                        Sonuç Bulunamadı.
                                    </div>
                                ) : (
                                        this.state.blogsArray.map(item => (
                                            <div key={item.id} className='citem'>
                                                <Link href={item.config.SeoUrl}>
                                                    <a className="citem01">
                                                        {item.config.PageTitle}
                                                    </a>
                                                </Link>
                                            </div>
                                        ))
                                    )
                            }


                        </div>
                    ) : (
                            null
                        )
                }

            </div>
        )
    }
}
export default connect(initsStore)(SearhBar);
