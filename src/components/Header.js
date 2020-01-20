import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// NavLink

const Header = (props) => {

  return (
    <header className="app-header">

      <nav className="fl-links-left">
        <NavLink to="/" exact activeClassName="active">Dashboard</NavLink>
        <span className="separator"></span>
        <NavLink to="/introspect" activeClassName="active">Introspect</NavLink>
      </nav>

      <h1 className="title">
        <Link to="/">GraphQL</Link>
        <span className="subtitle">Documentation Generator</span>
      </h1>
      <nav className="fl-links-right">
        <NavLink to="/dev" activeClassName="active">Developer Notes</NavLink>
      </nav>


    </header>
  )

}

export default Header;
