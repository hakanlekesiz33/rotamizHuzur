import React, { Component } from 'react';
import initsStore from '../store/store';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import Lightbox from "react-image-lightbox";
import '../styles/blogDetail.scss';
import '../styles/lightbox.scss';
import { fetchLayoutItems } from '../store/actions/layoutItemsActions';
import ErrorPage from 'next/error';

class BlogDetail extends Component {

    static async getInitialProps({ query, store, res }) {

        await store.dispatch(fetchLayoutItems());
        let cStore = await store.getState();

        let currentBlog = cStore.layoutItems.blogs.filter(function (blog) {
            return blog.SeoUrl === query.slug
        });
       
        const statusCode = currentBlog.length == 0 ? 404 : 200;

        return { currentBlog,statusCode };
    }

    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    handleClickBox = (images) => {

        const { photoIndex } = this.state;
        return (
            <Lightbox
                mainSrc={images[photoIndex].imgPath}
                nextSrc={images[(photoIndex + 1) % images.length].imgPath}
                prevSrc={images[(photoIndex + images.length - 1) % images.length].imgPath}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length
                    })
                }
                onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length
                    })
                }
            />
        );

    }

    render() {
        const {currentBlog, statusCode } = this.props;
    
        if (statusCode === 404) {
            return <ErrorPage statusCode={statusCode} />
        }
        return (

            <div id='blogDetails'>
                <div className="bg" style={{ backgroundImage: `url(${currentBlog[0].ShowCaseImg})` }}></div>
                <div className="gridWrapper">
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
                            {this.handleClickBox(currentBlog[0].GaleryImgs)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(BlogDetail);