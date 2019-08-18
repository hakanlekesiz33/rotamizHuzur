import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../../../../store/store';
import Link from 'next/link';

class Categories extends Component {
    render() {

        const store = this.props.getState();

        const categoriesArray = [];
        for (let key in store.layoutItems.categories) {
            categoriesArray.push({
                id: store.layoutItems.categories[key].Id,
                config: store.layoutItems.categories[key]
            });
        }
        return (
            <div className='categories'>
                <h2 className='cTitle'>
                    Kategoriler
                </h2>
                <nav>
                    <ul>
                        {categoriesArray.map(item => (
                            <li key={item.id}>
                                <Link href={"/kategoriler/"+item.config.url}>
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


export default connect(initsStore)(Categories);