import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import Nav from '../Navbar/nav';

function PaymentProcessing(props){

const [orderInfo, setOrderInfo] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  setError(null);
  axios.post('http://localhost:4000/orders_info', {userId : props.userId}).then(response => {
  console.log(response.data.orderInfo);
  let orderInfo = response.data.orderInfo;
  console.log(orderInfo);
  setOrderInfo(orderInfo);
  }).catch(err => {
      if (err.response.status === 401)
      setError(this.error.response.data.message);
      else
      setError("Something went wrong. Please try again later.");
       });
  }, [props.userId]);

    return(
      <div className="row">
      <nav className="navbar">
      <div className="link">
      <NavLink className="home" to="/accountInfo">Account Info</NavLink>
      <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
      <NavLink className="home" to="/delivery">Delivery Address</NavLink>
       <NavLink className="home" to="/orders">Order Cancel/history</NavLink>
      </div>
      </nav>
      <main>
      <br/>
      <br/>
      <br/>
      <p><b><i>Order Number #CR12577</i></b></p>
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
