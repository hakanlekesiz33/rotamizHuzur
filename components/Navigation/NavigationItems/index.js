import React, { Component } from 'react';
import NavigationItem from './NavigationItem';

import initsStore from '../../../store/store';
import { connect } from 'react-redux';
class NavigationItems extends Component {



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

            <ul className="NavigationItems">
                <NavigationItem link="/iletisim">İletişim</NavigationItem>
                <NavigationItem link="/hakkimizda">Hakkımızda</NavigationItem>
                <NavigationItem
                    link="/kategoriler"
                    hasSubMenu={true}
                    subItems={categoriesArray}>
                    Kategoriler
                    </NavigationItem>
            </ul>

        );
    }
}

export default connect(initsStore)(NavigationItems);