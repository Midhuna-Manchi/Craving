import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import { TouchableOpacity } from 'react-native';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useHistory } from 'react-router-dom';

function Checkout(props)
{
  const [error, setError] = useState(null);
  const [errpay, setErrPay] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setError(null);
    axios.post('http://localhost:4000/delivery_info', {userId : props.userId}).then(response => {
    console.log(response.data.delivery_info);
    let deliveryInfo = response.data.delivery_info;
    console.log(deliveryInfo);
    setDeliveryInfo(deliveryInfo);
    }).catch(err => {
        if (err.response.status === 401)
        setError(this.error.response.data.message);
        else
        setError("Something went wrong. Please try again later.");
         });
    axios.post('http://localhost:4000/paymentDetails', {userId : props.userId}).then(response => {
    console.log(response.data.payment_details);
    let paymentDetails = response.data.payment_details;
    console.log(paymentDetails);
    setPaymentDetails(paymentDetails);
    }).catch(err => {
        if (err.response.status === 401)
        setError(this.error.response.data.message);
        else
        setError("Something went wrong. Please try again later.");
        });
      }, [props.userId]);


  return (
      <div className="row_c">
      <main>
      <h3>Your Cart:</h3>
        <div className="flexbox-container_c">
        {
          props.menu_items.filter(item => item["quantity"] != 0).map(item=>{
            return(
                    <div className="firstblock_c">
                      <div>
                        <img className="imageicon_c" src={require(`../../Images/${item.SmoothiesImage}`)} alt="Nature" align="center" />
                      </div>
                        <NavLink key={item.id} to={`/menu/${item.id}`}>
                          <h1 className="posttitle_c">{item.SmoothiesTitle}</h1>
                        </NavLink>
                      <span className="postedby_c">{item.SmoothiesName}</span>
                      <div className="item_orders_c">
                        <span className="quantity_c">{item.quantity}</span>
                      </div>
                    </div>
                  );
          })
        }
        </div>
        </main>
        <div className="RRC">
        <div className="PDInfo">
        <div className="DInfo">
        {
          deliveryInfo.map(item=>{
            return(
              <div>
              <h3>Delivery Address:</h3>
              <table>
              <tr>
              <td>Name :</td>
              <td>{item.name}</td>
              </tr>
              <tr>
              <td>Address : </td>
              <td>{item.streetadd}, {item.city}, </td>
              </tr>
              <tr>
              <td> {item.state}, {item.zipCd},{item.country} </td>
              </tr>
              </table>
              </div>
            );
          })
      }
        </div>
        <div className="PInfo">
        {
          paymentDetails.map(item=>{
            return(
              <div>
              <h3>Payment Details:</h3>
              <table>
              <tr>
              <td>Name : </td>
              <td> {item.name}</td>
              </tr>
              <tr>
              <td>Card No : </td>
              <td>{item.cardNo.toString().replace(/\d(?=\d{4})/g, "*")}</td>
              </tr>
              <tr>
              <td>Expiry Date : </td>
              <td>{item.expiryDt}</td>
              </tr>
              <tr>
              <td>Billing Address : </td>
              <td>{item.streetadd}, {item.city}, </td>
              </tr>
              <tr>
              <td>{item.state}, {item.zipCd}, {item.country} </td>
              </tr>
              </table>
              </div>
            );
          })
      }
        </div>
        </div>
        <div className="ItemQuantity">
        <div className = "ItemDetails">
        <table>
        <tr>
        <td><b>No of Items added to the cart : </b></td>
        <td>{props.itemsCount}</td>
        </tr>
        <tr>
        <td><b>Tax : </b></td>
        <td> $0 </td>
        </tr>
        <tr>
        <td><b>Payment Due : </b></td>
        <td> ${props.selectedPlanPrice} </td>
        </tr>
        </table>
        </div>
        </div>
        <div className="login_button">
        <input width="50%" type="button" value='Place your Order' onClick={() => history.push('/paymentprocessing')}/>
        </div>
        </div>
        </div>

      );
}

export default Checkout;
