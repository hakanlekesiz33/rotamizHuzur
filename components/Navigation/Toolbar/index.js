import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems';
import SearchBar from '../SearchBar';

const toolbar = () => (
    <header className="header">
        <div className="gridWrapper gridheader">
            <Logo />
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
            <SearchBar/>
        </div>
    </header>
);

export default toolbar;