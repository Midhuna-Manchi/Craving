import React,{Component, useState, useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';


function AccountInfo(props){
  const [error, setError] = useState(null);
  const [editEnabled1, setEditEnabled1] = useState(true);
  const [editEnabled2, setEditEnabled2] = useState(true);
  const [editEnabled3, setEditEnabled3] = useState(true);
  const [editEnabled4, setEditEnabled4] = useState(true);
  const [editEnabled5, setEditEnabled5] = useState(true);

  const [firstname, setfirstname] = useState(props.accountInfo.firstname);
  const [lastname, setlastname] = useState(props.accountInfo.lastname);
  const [email,setemail] = useState(props.accountInfo.address);
  const [username, setusername] = useState(props.accountInfo.username);
  const [password, setpassword] = useState(props.accountInfo.password);

  const setFirstName = e => {setfirstname(e.target.value)}
  const setLastName = e => {setlastname(e.target.value)}
  const setEmail = e => {setemail(e.target.value)}
  const setUserName = e => {setusername(e.target.value)}
  const setPassword = e => {setpassword(e.target.value)}


  const handleAccount = () => {
    setError(null);
    axios.post('http://localhost:4000/updateaccountInfo', {firstname: firstname.value, lastname: lastname.value, address: email.value, username: username.value, password: password.value, userId: props.userId}).then(response => {
    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const toggleEditEnabled1 = () => {
    if(editEnabled1==true)
      setEditEnabled1(false);
    else {
      setEditEnabled1(true);
    }
  }
  const toggleEditEnabled2 = () => {
    if(editEnabled2==true)
      setEditEnabled2(false);
    else {
      setEditEnabled2(true);
    }
  }
  const toggleEditEnabled3 = () => {
    if(editEnabled3==true)
      setEditEnabled3(false);
    else {
      setEditEnabled3(true);
    }
  }
  const toggleEditEnabled4 = () => {
    if(editEnabled4==true)
      setEditEnabled4(false);
    else {
      setEditEnabled4(true);
    }
  }
  const toggleEditEnabled5 = () => {
    if(editEnabled5==true)
      setEditEnabled5(false);
    else {
      setEditEnabled5(true);
    }
  }

  return(
    <div className="row_a">
    <nav className="navbar">
    <div className="link">
    <NavLink className="home1" to="/accountInfo">Account Info</NavLink>
    <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
    <NavLink className="home" to="/home">Delivery Address</NavLink>
    </div>
    </nav>
    <div className="acct">
      <div>
      {
        props.menu_items.map(item=>{
          <h1> {firstname} </h1>
          <div className="login_panel1">
            <div className="LoginInputs1">
              <div className="row_a">
                <label htmlFor="fname">FirstName : </label>
                <input className="pinput" type="text" id="fname" defaultValue={props.accountInfo.firstname} onChange={setFirstName} disabled={editEnabled1}></input>
                <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={toggleEditEnabled1}/>
              </div>
              <p class="validationMessage">{firstname}</p>
              <div className="row_a">
                <label htmlFor="lname">LastName : </label>
                <input className="pinput" type="text" id="lname" defaultValue={props.accountInfo.lastname} onChange={setLastName} disabled={editEnabled2}></input>
                <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={toggleEditEnabled2}/>
              </div>
              <br/>
              <div className="row_a">
                <label htmlFor="email">E-mail Address : </label>
                <input className="pinput" type="text" id="email" defaultValue={props.accountInfo.address} onChange={setEmail} disabled={editEnabled3}></input>
                <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={toggleEditEnabled3}/>
              </div>
              <p class="validationMessage">{email}</p>
              <div className="row_a">
                <label htmlFor="uname">Username : </label>
                <input className="pinput" type="text" id="uname" defaultValue={props.accountInfo.username} onChange={setUserName} disabled={editEnabled4}></input>
                <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={toggleEditEnabled4}/>
              </div>
              <p class="validationMessage">{username}</p>
              <div className="row_a">
                <label htmlFor="pwd">Password : </label>
                <input className="pinput" type="password" id="pwd" defaultValue={props.accountInfo.password} onChange={setPassword} disabled={editEnabled5}></input>
                <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={toggleEditEnabled5}/>
              </div>
              <p class="validationMessage">{password}</p>
              <div className="login_button">
                <p class="validationMessage"></p>
                <input type="button" value='Save' onClick={handleAccount} disabled={(editEnabled1 && editEnabled2 && editEnabled3 && editEnabled4 && editEnabled5)}/>
              </div>
            </div>
           </div>

        </div>

    </div>
    });}
  </div>
)


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
        if(value.fieldName.toUpperCase() == 'PASSWORD')
        {
          if(e.target.value.length < 6)
          {
            new_valid = false;
            new_err_msg = '** ' + value.fieldName + ' must be alteast 6 characters long.'
          }
          else
          {
            new_valid = true;
            new_err_msg = '';
          }
        }
        else if(value.fieldName.toUpperCase() == 'E-MAIL ADDRESS')
        {
          if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(e.target.value))
          {
            new_valid = true;
            new_err_msg = '';
          }
          else
          {
            new_valid = false;
            new_err_msg = '** Please enter a valid ' + value.fieldName + '.'
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


export default AccountInfo;
