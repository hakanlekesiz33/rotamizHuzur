import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../../store/store';
import Link from 'next/link';


class Blogs extends Component {
    render() {


        return (
            <div className='blogs'>
                {this.props.blogsArray.map(item => {
                    return (
                        <div key={item.id} className='citem'>
                            <div className='citem01'>
                                <Link href={"/kategoriler/" + item.config.CtgUrl}>
                                    <a className="citem01-A">
                                        {item.config.CategoryName}
                                    </a>
                                </Link>
                                <div className='citem01-B'>
                                    {item.config.Date}
                                </div>
                            </div>
                            <div className='citem02'>
                                {item.config.PageTitle}
                            </div>
                            <Link href={`/blog?slug=${item.config.SeoUrl}`} as={`/${item.config.SeoUrl}`}>
                                <a>
                                    <img className='citem03' src={item.config.GaleryImgs[0].imgPath} alt={item.config.PageTitle} />
                                </a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default connect(initsStore)(Blogs);