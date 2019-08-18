import React, { Component } from 'react';
import Link from 'next/link';

class NavigationItem extends Component {
    render() {

        return (
            <li className="NavigationItem">
                <Link href={this.props.link}>
                    <a> {this.props.children} </a>
                </Link>

                {this.props.hasSubMenu ?
                    <>
                        <span className="angle-down"></span>
                        <ul className="subMenu">
                            {this.props.subItems.map(item => (
                                <li key={item.id}>
                                    <Link href={"/kategoriler/" + item.config.url}>
                                        <a className="subItem">
                                            {item.config.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                    :
                    null
                }
            </li>
        );
    }
}

export default NavigationItem;
