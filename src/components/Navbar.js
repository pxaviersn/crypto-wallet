import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" style={{ paddingLeft: '2rem', paddingRight: '2rem'}}>
      <a className="navbar-brand" href="/">
        <span className="brand-bit">Bit</span>
        <span className="brand-tracker">Tracker</span>
      </a>
      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/operations/new">+Add</a>
        <a href="/operations/">Manage</a>
        <a href="/about">About</a>
        <a href="/login">Logout</a>
      </div>
    </nav>
  );
}
