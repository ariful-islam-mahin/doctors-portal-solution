import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light ">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <Link class="nav-link mr-5" to="/home">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link mr-5" to="/">Patient</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link mr-5" to="/dashboard">Dashboard</Link>
                </li>
                <li class="nav-item">
                    <Link class={`nav-link mr-5 ${window.location.pathname === '/appointment' ? 'text-secondary' : 'text-white'}`}to="/admin">Admin</Link>
                </li>
                <li class="nav-item">
                    <Link class={`nav-link mr-5 ${window.location.pathname === '/appointment' ? 'text-secondary' : 'text-white'}`} to="/">Blogs</Link>
                </li>
                <li class="nav-item">
                    <Link class={`nav-link mr-5 ${window.location.pathname === '/appointment' ? 'text-secondary' : 'text-white'}`} to="/">Contact Us</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;