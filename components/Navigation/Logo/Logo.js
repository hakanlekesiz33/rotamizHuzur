import React from 'react';
import Link from 'next/link';

const logo = () => (
    <div className="logo">
        <Link href="/">
         <a> <img src="../../../static/logo.png" alt="rotamiz-huzur-logo" /></a> 
        </Link>
    </div>
);

export default logo;