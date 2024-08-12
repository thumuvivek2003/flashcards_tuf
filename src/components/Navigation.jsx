import React from 'react';

const Navbar = () => (
    <nav className="navbar">
        <div className="brand">Flashcard App</div>
        <div>
            <a href="/">Home</a>
            <a href="/admin">Dashboard</a>
        </div>
    </nav>
);

export default Navbar;
