import React, { Component } from 'react';
import initsStore from '../store/store';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import Lightbox from "react-image-lightbox";
import '../styles/blogDetail.scss';
import '../styles/lightbox.scss';
import { fetchLayoutItems } from '../store/actions/layoutItemsActions';
import ErrorPage from 'next/error';
import Head from 'next/head';

class BlogDetail extends Component {

    static async getInitialProps({ query, store, res }) {

        await store.dispatch(fetchLayoutItems());
        let cStore = await store.getState();

        let currentBlog = cStore.layoutItems.blogs.filter(function (blog) {
            return blog.SeoUrl === query.slug
        });

        const statusCode = currentBlog.length == 0 ? 404 : 200;

        return { currentBlog, statusCode };
    }

    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    handleClick = (key) => {
        this.setState({ photoIndex: key, isOpen: true })
    }

    render() {
        const { currentBlog, statusCode } = this.props;
        const { photoIndex, isOpen } = this.state;
        if (statusCode === 404) {
            return <ErrorPage statusCode={statusCode} />
        }
        return (
            <>
                <Head>
                    <title>Rotamız Huzur | {currentBlog[0].PageTitle}</title>

                    {
                        currentBlog[0].MetaKeywords.length != 0 ? (
                            <meta name="keywords" content={currentBlog[0].MetaKeywords.join(",")}></meta>
                        ) : (
                                null
                            )
                    }
                    {
                        currentBlog[0].MetaDescription == "" ? (
                            <meta name="description" content={currentBlog[0].MetaDescription}></meta>
                        ) : (
                                null
                            )
                    }
                </Head>
                <div id='blogDetails'>

                    <div className="bg" style={{ backgroundImage: `url(${currentBlog[0].ShowCaseImg})` }}></div>
                    <div className="gridWrapper">
                        <div className="row">
                            <div className="postContent">
                                <div className="postTitle">
                                    <h1>{currentBlog[0].PageTitle}</h1>
                                    <p className="postShortInfo">
                                        <img src="/static/tag.png" />
                                        <a>{currentBlog[0].CategoryName}</a>
                                        <img src="/static/oclock.png" />
                                        <a>{currentBlog[0].Date}</a>
                                    </p>
                                </div>
                                {renderHTML(currentBlog[0].Desc)}
                                <div className="gallery">
                                    {currentBlog[0].GaleryImgs.map((item, key) =>

                                        <div className="galleryImg" onClick={() => this.handleClick(key)} style={{ backgroundImage: `url(${item.imgPath})` }}>

                                        </div>
                                    )}

                                    {isOpen && (
                                        <Lightbox
                                            mainSrc={currentBlog[0].GaleryImgs[photoIndex].imgPath}
                                            nextSrc={currentBlog[0].GaleryImgs[(photoIndex + 1) % currentBlog[0].GaleryImgs.length].imgPath}
                                            prevSrc={currentBlog[0].GaleryImgs[(photoIndex + currentBlog[0].GaleryImgs.length - 1) % currentBlog[0].GaleryImgs.length].imgPath}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            onMovePrevRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + currentBlog[0].GaleryImgs.length - 1) % currentBlog[0].GaleryImgs.length,
                                                })
                                            }
                                            onMoveNextRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + 1) % currentBlog[0].GaleryImgs.length,
                                                })
                                            }
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default connect(initsStore)(BlogDetail);