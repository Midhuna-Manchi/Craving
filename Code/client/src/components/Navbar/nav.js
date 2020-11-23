import React,{Component} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';

class Nav extends React.Component{
render() {
  return (
    <nav className="navbar">
    <div className="link">
    <NavLink className="home" to="/home">Oat Bowls</NavLink>
    <NavLink className="home" to="/home">Smoothies</NavLink>
    <NavLink className="home" to="/home">Breakfast</NavLink>
    </div>
    </nav>
      );
}
}
export default Nav;
