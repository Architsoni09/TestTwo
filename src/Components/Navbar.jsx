import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar(props) {
    return (
        <nav className="navbar bg-gradient bg-black text-white">
            <div className="container-fluid text-white">
                <span className="navbar-brand mb-0  text-white h1">Navbar</span>
            </div>
        </nav>
    );
}

export default Navbar;