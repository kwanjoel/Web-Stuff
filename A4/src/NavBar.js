import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" href="/">WEB422 - Project Portal</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;