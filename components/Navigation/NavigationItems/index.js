import React from 'react';
import NavigationItem from './NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/iletisim">İletişim</NavigationItem>
        <NavigationItem link="/hakkimizda">Hakkımızda</NavigationItem>
        <NavigationItem link="/kategoriler">Kategoriler</NavigationItem>
    </ul>
);

export default navigationItems;