import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../../../../store/store';
import Link from 'next/link';

class SiteMap extends Component {
    render() {
        const store = this.props.getState();

        const siteMapArray = [];
        for (let key in store.layoutItems.siteMap) {
            siteMapArray.push({
                id: store.layoutItems.siteMap[key].Id,
                config: store.layoutItems.siteMap[key]
            });
        }
        return (
            <div className='siteMap'>
                <h2 className='cTitle'>
                    Site Haritası
                </h2>
                <nav>
                    <ul>
                        {siteMapArray.map(item => (
                            <li key={item.id}>
                                <Link href={item.config.url}>
                                    <a className="citem">
                                        {item.config.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default connect(initsStore)(SiteMap);
