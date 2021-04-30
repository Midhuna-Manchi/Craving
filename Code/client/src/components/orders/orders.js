import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';


function Orders(props) {
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

    const handleDelete = () => {
            setError(null);
            axios.post('http://localhost:4000/orders_delete', { userId: props.userId, ordersId:orderInfo[3].ordersId}).then(response => {
            }).catch(error => {
                if (error.response.status === 401)
                setError(error.response.data.message);
                else
                setError("Something went wrong. Please try again later.");
              });
              alert("Your Order has been cancelled successfully.");
            }

return(
   <div className="row_a">
   <nav className="navbar">
   <div className="link">
   <NavLink className="home" to="/accountInfo">Account Info</NavLink>
   <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
   <NavLink className="home" to="/delivery">Delivery Address</NavLink>
   <NavLink className="home1" to="/orders">Order Cancel/history</NavLink>
   </div>
   </nav>
   <main>

            <div className="table_row2">
            <div className="table_column2">
            <h3> Order ID </h3>
            {
            orderInfo.map(item => {
            return(
              <p> #CR{item.ordersId} </p>
              );
            })
            }

            </div>

            <div className="table_column2">
            <h3> Order Date </h3>
            {
            orderInfo.map(item => {
            return(
              <p> {item.ordersDate} </p>
              );
            })
            }
           </div>

            <div className="table_column2">
            <h3> Status </h3>
            {
            orderInfo.map(item => {
            return(
              <p> {item.status} </p>
              );
            })
            }
            </div>

            <div className="table_column2">
            <h3> Total </h3>
            {
            orderInfo.map(item => {
            return(
              <p> ${(0.052 * item.total) + (1*item.total)} </p>
                );
            })
            }
            </div>

            <div className="table_column2">
            <h3> Action </h3>
            {
            orderInfo.map(item => {
            return(
              <p><a href="#" onClick={handleDelete}>{item.action}</a></p>
              );
            })
            }

            </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
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


export default Orders;
