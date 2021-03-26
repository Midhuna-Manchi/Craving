import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import Nav from '../Navbar/nav';

function PaymentProcessing(props){
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
      <br/>
      <br/>
      <p><b><i>Order Number CR7328739</i></b></p>
      <p><i>Thank you for shopping with us!!</i></p>
      <p><i>Your order has been placed and its in processing stage.</i></p>
      <p><i>Will keep you posted with the latest status.</i></p>
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

export default PaymentProcessing;
