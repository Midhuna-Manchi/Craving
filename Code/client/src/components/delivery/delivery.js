import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';


function Delivery(props) {
        const [error, setError] = useState(null);
        const name = useFormInput('Name on the card', '', setError);
        const streetadd = useFormInput('Street address', '', setError);
        const city = useFormInput('City', '', setError);
        const state = useFormInput('State', '', setError);
        const zipCd = useFormInput('Zip', '', setError);
        const country = useFormInput('Country', '', setError);


const handleDelivery = () => {
        setError(null);
        axios.post('http://localhost:4000/users/delivery', { userId: props.userId, name: name.value, streetadd: streetadd.value, city: city.value, state: state.value, zipCd: zipCd.value, country: country.value}).then(response => {
        }).catch(error => {
            if (error.response.status === 401)
            setError(error.response.data.message);
            else
            setError("Something went wrong. Please try again later.");
          });
        }

return(
   <div className="row_a">
   <nav className="navbar">
   <div className="link">
   <NavLink className="home" to="/accountInfo">Account Info</NavLink>
   <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
   <NavLink className="home1" to="/delivery">Delivery Address</NavLink>
   <NavLink className="home" to="/orders">Order Cancel/history</NavLink>
   </div>
   </nav>
   <main>
    <h3 className="fname">Hi,{props.userFirstName}! </h3>
    <div className="table_column">
    <h4>Where are we delivering to? </h4>
    <br/>
      <div className="table_row">
         		<label htmlFor="name"> Name </label>
 			      <input className="pinput" type="text" id="name" {...name} ></input>
	    </div>
      <p class="validationMessage_acctinfo">{name.err_msg}</p>
      <br/>
      <div className="table_row">
            <label htmlFor="add">Street address</label>
            <input className="pinput" type="text" id="add" {...streetadd}></input>
 			</div>
      <p class="validationMessage_acctinfo">{streetadd.err_msg}</p>
      <br/>
      <div className="table_row">
            <label htmlFor="city">City</label>
            <input className="pinput" type="text" id="city" {...city}></input>
      </div>
      <p class="validationMessage_acctinfo">{city.err_msg}</p>
      <br/>
      <div className="table_row">
            <label htmlFor="state">State</label>
            <input className="pinput" type="text" id="state" {...state}></input>
      </div>
      <p class="validationMessage_acctinfo">{state.err_msg}</p>
      <br/>
      <div className="table_row">
            <label htmlFor="zip">Zip</label>
            <input className="pinput" type="number" pattern="[0-9]*" id="zip" {...zipCd}></input>
      </div>
      <p class="validationMessage_acctinfo">{zipCd.err_msg}</p>
      <br/>
      <div className="table_row">
            <label htmlFor="Country">Country</label>
            <input className="pinput" type="text" id="Country" {...country}></input>
      </div>
      <p class="validationMessage_acctinfo">{country.err_msg}</p>
      <br/>
      <div className="table_row">

      </div>
      <div className="table_row">
 			<div className="login_button">
          <p class="validationMessage_acctinfo">{error}</p>
 				  <input type="button" value='Use this address' onClick={handleDelivery} />
 			</div>
      </div>
  </div>
  </main>
 	</div>
 );

}

const useFormInput = (fieldName, initialValue, setError) => {
  const [value, setValue] = useState({"fieldName":fieldName, "value":initialValue, "valid":false, "err_msg":""});

  const handleChange = e => {
    console.log(value.fieldName + ' value has changed.');

    // validate the data for accuracy
    var new_valid = ''
    var new_err_msg = ''
    if(e.target.value == '')
    {
        new_valid = false;
        new_err_msg = '** ' + value.fieldName + ' cannot be blank.'
    }
    else
    {
        if(value.fieldName.toUpperCase() == 'CARD NUMBER')
        {
          if(e.target.value.length < 16)
          {
            new_valid = false;
            new_err_msg = '** ' + value.fieldName + ' must be at least 16 characters long.'
          }
          else
          {
            new_valid = true;
            new_err_msg = '';
          }
        }
        else if(value.fieldName.toUpperCase() == 'EXPIRATION DATE')
        {
          if(/\d\d\/\d\d\d\d/.test(e.target.value))
          {
            new_valid = true;
            new_err_msg = '';
          }
          else
          {
            new_valid = false;
            new_err_msg = '** Please enter '+ value.fieldName +' valid format in MM/YYYY. '
          }
        }
        else
        {
          new_valid = true;
          new_err_msg = '';
        }
    }


    var new_value = {"fieldName":value.fieldName, "value": e.target.value, "valid": new_valid, "err_msg": new_err_msg};
    setValue(new_value);
    setError(false);
    console.log(JSON.stringify(new_value));
  }
  return {
    value: value.value,
    valid: value.valid,
    err_msg: value.err_msg,
    onChange: handleChange,
    onBlue: handleChange
  }
}

export default Delivery;
