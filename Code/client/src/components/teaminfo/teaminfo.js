import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import Nav from '../Navbar/nav';

function TeamInfo(props){
    return(
      <div className="row">
      <nav className="navbar">
      <div className="link">
      <NavLink className="home" to="/accountInfo">Account Info</NavLink>
      <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
      <NavLink className="home" to="/delivery">Delivery Address</NavLink>
      </div>
      </nav>
      <main>
      <br/>
      <h1><b><i>Craving!</i></b></h1>
      <br/>
      <br/>
      <p><i>Craving is a Web Application that will provide users with a user-friendly interface that will allow them to browse the variety of products and create the custom box containing different variety items from three major categories of products such as smoothies, Oats, and breakfast bowls. Users will be provided with 5 different versions of subscription plans that will allow them to customize the number of items received with each order. The application will also allow users to customize the products offerings filtering out the products they dislike based on the ingredients. The application will also offer the ability to create the list of favorite products, rate the products and leave the reviews for the products.</i></p>
      <h3><i><b> About Us :</b></i></h3>
      <h3> Irina Sachovska - Project Manager </h3>
      <h3> Midhuna Manchi - Lead Developer </h3>
      <h3> Tejashri Parukar - Data Analyst </h3>
      <h3> Shubam Trivedi - QA test Lead </h3>
      <h3> Onyekachi Benjamin - Product Owner </h3>
      <h3> Akshay Pesari - Business Analyst </h3>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      </main>
      </div>
);

}

export default TeamInfo;
