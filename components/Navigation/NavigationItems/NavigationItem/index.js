import React from 'react';
import Link from 'next/link';

const navigationItem = ( props ) => (
    <li className="NavigationItem">
        <Link href={props.link}>
         <a> {props.children} </a> 
        </Link>
    </li>
);

export default navigationItem;