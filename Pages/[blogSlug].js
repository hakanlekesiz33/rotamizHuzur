import { useRouter } from 'next/router';
import React, { Component } from 'react';
import initsStore from '../store/store';
import { connect } from 'react-redux';


class BlogDetail extends Component {

    render() {
        console.log();
        const store = this.props.getState();

        let currentBlog = store.layoutItems.blogs.filter(function (blog) {
            return blog.SeoUrl === "bir-tane-antalya-gezisi"
        });
        console.log(currentBlog[0].SeoUrl);

        return (

            <div id='blogDetails'>
                <div className="gridWrapper">
                    {currentBlog[0].Desc}
                </div>
            </div>

        );
    }
}

export default connect(initsStore)(BlogDetail);