import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import { View, StyleSheet, Button, Alert } from "react-native";

function SubmitTicket(props) {
        const [error, setError] = useState(null);
        const comments = useFormInput('Comments', '', setError);
        const [value, setValue] = useState('');
        const [loading, setLoading] = useState(false);
        const [tktemail, setTktEmail] = useState("");
        const options = [
          {
            label:"Subscription Inquiry",
            value:"subscription Inquiry",
          },
          {
            label:"Subscription Cancellation",
            value:"subscription Cancellation",
          },
          {
            label:"Order Inquiry",
            value:"order Inquiry",
          },
          {
            label:"Order Delivery",
            value:"order Delivery",
          },
          {
            label:"Order Cancellation",
            value:"order Cancellation",
          },
          {
            label:"Product Inquiry",
            value:"product Inquiry",
          },
          {
            label:"General Inquiry",
            value:"general Inquiry",
          },
        ];


const handleTickets = () => {
        setError(null);
        alert("Your ticket submitted successfully! Confirmation has sent to your email address.")
        console.log(props.userId, props.userFirstName, props.userAddress, value, comments.value);
        console.log("This is for insert statement" + value);
        axios.post('http://localhost:4000/users/ticket', { userId: props.userId, name: props.userFirstName, email: props.userAddress, reason: value, comments: comments.value}).then(response => {
          }).catch(error => {
            if (error.response.status === 401)
            setError(error.response.data.message);
            else
            setError("Something went wrong. Please try again later.");
          });
        }

const handleEmail = () => {
  setError(null);
  setLoading(true);
  axios.post('http://localhost:4000/users/getTicketEmail', { userId: props.userId }).then(response => {
    setLoading(false);
    setTktEmail(response.data);
  }).catch(error => {
    setLoading(false);
    if (error.response.status === 401) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
  });
}

function handleChange(e) {
          setValue(e.target.value);
       }

return(
   <div className="row_a">
   <nav className="navbar">
   <div className="link">
   <NavLink className="home1" to="/submitticket">Submit Ticket</NavLink>
   <NavLink className="home" to="/tickethistory">Ticket History</NavLink>
   </div>
   </nav>
   <main>
   <br/>
   <p className="ticket">Please enter Information about your Issue in the form below: </p>
   <br/>
   <div className="table_column">
   <br/>
   <div className="table_row">
       		<label htmlFor="name"> Name </label>
 		      <input className="pinput" type="text" id="name" defaultValue={props.userFirstName} disabled="true"></input>
	 </div>
   <br/>
   <div className="table_row">
          <label htmlFor="email"> Email </label>
          <input className="pinput" type="text" id="email" defaultValue={props.userAddress} disabled="true"></input>
 		</div>
    <br/>
    <div className="table_row">
          <label htmlFor="reason">Reason</label>
          <select className="pinput" id="reason" onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      <br/>
      <div className="table_row">
            <label htmlFor="comments">Comments</label>
            <textarea rows="4" cols="50" className="pinput" name="comment" id="comments" form="usrform" {...comments}></textarea>
      </div>
      <p class="validationMessage_acctinfo">{comments.err_msg}</p>
      <br/>
      <div className="table_row">
     			<div className="login_button">
          <input width="50%" type="button" value='Submit' onClick={() => {handleTickets(); handleEmail();}}/>
         </div>
    </div>
    <br/>
    <br/>
    <br/>
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

export default SubmitTicket;
