import React from 'react';
import logoPath from '../../../assets/images/logo.png';
import Link from 'next/link';

const logo = () => (
    <div className="logo">
        <Link href="/search">
         <a> <img src={logoPath} alt="rotamiz-huzur-logo" /></a> 
        </Link>
    </div>
);

export default logo;