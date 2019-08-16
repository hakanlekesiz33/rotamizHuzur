import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../../store/store';
import Link from 'next/link';


const BlogLink = props => (
        <Link href="/[blogSlug]?id=1" as={`/${props.blogSlug}`}>
            <a className="citem01-A">
                {props.blogLinkName}
            </a>
        </Link>
);



class Blogs extends Component {



    render() {

        const store = this.props.getState();
        const blogsArray = [];
        for (let key in store.layoutItems.blogs) {
            blogsArray.push({
                id: store.layoutItems.blogs[key].Id,
                config: store.layoutItems.blogs[key]
            });
        }
        return (
            <div className='blogs'>

                {blogsArray.map(item => {
                    if (item.config.IsShowHomePage) {
                        return (

                            <div key={item.id} className='citem'>
                                <div className='citem01'>
                                    <BlogLink blogSlug={item.config.SeoUrl} blogLinkName={item.config.CategoryName} />
                                    <div className='citem01-B'>
                                        {item.config.Date}
                                    </div>
                                </div>
                                <div className='citem02'>
                                    {item.config.PageTitle}
                                </div>
                                <img className='citem03' src={item.config.GaleryImgs[0].imgPath} alt={item.config.PageTitle} />
                            </div>

                        );
                    }
                    return null;

                })}
            </div>
        );
    }
}

export default connect(initsStore)(Blogs);