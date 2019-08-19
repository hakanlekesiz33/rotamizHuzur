import React, { Component } from 'react';
import initsStore from '../../store/store';
import { connect } from 'react-redux';
import Blogs from '../../components/Blogs';
import ErrorPage from 'next/error';
import { fetchLayoutItems } from '../../store/actions/layoutItemsActions';
import Head from 'next/head';


class CtgDetail extends Component {
    static async getInitialProps({ query, store, res }) {

        await store.dispatch(fetchLayoutItems());
        let cStore = await store.getState();

        let currentCategory = cStore.layoutItems.categories.filter(function (ctg) {
            return ctg.url === query.slug
        });

        const blogsArray = [];
        let statusCode = 404;

        if (currentCategory.length != 0) {
            statusCode = 200;
            for (let key in cStore.layoutItems.blogs) {
                if (cStore.layoutItems.blogs[key].CategoryName == currentCategory[0].name) {
                    blogsArray.push({
                        id: cStore.layoutItems.blogs[key].Id,
                        config: cStore.layoutItems.blogs[key]
                    });
                }

            }
        }


        return { blogsArray, statusCode,currentCategory };
    }


    render() {
        const { blogsArray, statusCode, currentCategory } = this.props;
        if (statusCode === 404) {
            return <ErrorPage statusCode={statusCode} />
        }

        return (
            <>
                <Head>
                    <title>Rotamız Huzur | {currentCategory[0].name}</title>
                </Head>
                <div id='ctgDetail'>
                    <div className="gridWrapper">
                        <Blogs blogsArray={blogsArray} />
                    </div>
                </div>
            </>

        );
    }
}

export default connect(initsStore)(CtgDetail);