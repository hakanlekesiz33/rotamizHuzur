import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../../../../store/store';
import Link from 'next/link';

class PopularPosts extends Component {
    render() {

        const store = this.props.getState();
        const popularPostsArray = [];
        for (let key in store.layoutItems.popularPosts) {
            popularPostsArray.push({
                id: store.layoutItems.popularPosts[key].Id,
                config: store.layoutItems.popularPosts[key]
            });
        }
console.log(popularPostsArray)
        return (
            <div className='popularPosts'>
                <h2 className='cTitle'>
                    Popüler Bloglar
                </h2>

                {popularPostsArray.map(item => (
                    <div key={item.id} className='citem'>

                        <Link href={item.config.url}>
                            <a className="citem01">
                                <img src={item.config.img} alt={item.name} />
                            </a>
                        </Link>

                        <Link href={item.config.url}>
                            <a className="citem02">
                                <h6> {item.config.name} </h6>
                            </a>
                        </Link>

                        <Link href={item.config.url}>
                            <a className="citem03">
                                <h5> {item.config.ctg}  </h5>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(initsStore)(PopularPosts);