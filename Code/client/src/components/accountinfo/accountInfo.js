import React,{Component, useState, useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function AccountInfo(props){

  const [acctInfo, setacctInfo] = useState([]);
  const [error, setError] = useState(null);
  const [validationerr, setValidationerr] = useState([{err_firstname:"",
                                                      err_lastname:"",
                                                      err_address:"",
                                                      err_username:"",
                                                      err_password:""
                                                      }]);

  const [disabledStatus, setDisabledStatus] = useState({
                                        disabled1:true,
                                        disabled2:true,
                                        disabled3:true,
                                        disabled4:true,
                                        disabled5:true,
                                    });

  function toggleDisabled(e)
  {
    setDisabledStatus({
                        disabled1:(e==1?!disabledStatus.disabled1: disabledStatus.disabled1),
                        disabled2:(e==2?!disabledStatus.disabled2: disabledStatus.disabled2),
                        disabled3:(e==3?!disabledStatus.disabled3: disabledStatus.disabled3),
                        disabled4:(e==4?!disabledStatus.disabled4: disabledStatus.disabled4),
                        disabled5:(e==5?!disabledStatus.disabled5: disabledStatus.disabled5)
                    });
  }

  const setAcctParameter = e => {
                                  setValidationerr([{
                                      err_firstname: (e.target.id=="firstname"?(e.target.value==""?"** firstname cannot be null":""): validationerr[0].err_firstname),
                                      err_lastname : (e.target.id=="lastname"?(e.target.value==""?"** lastname cannot be null":""): validationerr[0].err_lastname),
                                      err_address  : (e.target.id=="address"?((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(e.target.value))?"":"** Please enter a valid e-mail"): validationerr[0].err_address),
                                      err_username : (e.target.id=="username"?(e.target.value==""?"** username cannot be null":""): validationerr[0].err_username),
                                      err_password : (e.target.id=="password"?(e.target.value.length < 6?"** password must be alteast 6 characters long":""): validationerr[0].err_password)

                                  }]);

                                  console.log("Checking validationerr values :" + validationerr[0].err_firstname);
                                  console.log("Setting paramter " + e.target.id + " to " + e.target.value + ".");
                                    setacctInfo([{
                                                firstname : (e.target.id=="firstname"?e.target.value: acctInfo[0].firstname),
                                                lastname  : (e.target.id=="lastname"?e.target.value: acctInfo[0].lastname),
                                                address   : (e.target.id=="address"?e.target.value: acctInfo[0].address),
                                                username  : (e.target.id=="username"?e.target.value: acctInfo[0].username),
                                                password  : (e.target.id=="password"?e.target.value: acctInfo[0].password)
                                            }]);


                                }

  function updateAccountInfo(e)
  {
    console.log("Updating details for userId:" + props.userId + " as " + acctInfo[0].firstname + "|" + acctInfo[0].lastname + "|" + acctInfo[0].address + "|" + acctInfo[0].username + "|" + acctInfo[0].password);
    setError(null);
    axios.post('http://localhost:4000/updateaccountInfo', {firstname: acctInfo[0].firstname, lastname: acctInfo[0].lastname, address: acctInfo[0].address, username: acctInfo[0].username, password: acctInfo[0].password, userId: props.userId}).then(response => {
    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    toggleDisabled(e);
  }

  useEffect(() => {
    setError(null);
      axios.post('http://localhost:4000/users/accountInfo', {userId : props.userId}).then(response => {
        console.log(response.data.acct_info);
        let acctInfo = response.data.acct_info;
        console.log(acctInfo);
         setacctInfo(acctInfo);
         //console.log(acctInfo);
         }).catch(err => {
           if (err.response.status === 401)
          setError(this.error.response.data.message);
           else
          setError("Something went wrong. Please try again later.");
         });
     }, [props.userId]);

  return (
    <div className="row">
    <nav className="navbar">
    <div className="link">
    <NavLink className="home1" to="/accountInfo">Account Info</NavLink>
    <NavLink className="home" to="/paymentInfo">Payment details</NavLink>
    <NavLink className="home" to="/delivery">Delivery Address</NavLink>
    <NavLink className="home" to="/orders">Order Cancel/history</NavLink>
    </div>
    </nav>
    <main>

        {
          acctInfo.map(item=>{
            return(
                  <div className="table_column">
                    <br/>
                    <div className="table_row">
                      <label htmlFor="firstname">First Name </label>
                      <input className="pinput" type="text" id="firstname" defaultValue={item.firstname} disabled={disabledStatus.disabled1} onChange={setAcctParameter}></input>
                      {
                        disabledStatus.disabled1?
                        <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => toggleDisabled(1)}/> :
                        (
                          validationerr[0].err_firstname.length==0?
                          <CheckIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => updateAccountInfo(1)} disabled={validationerr[0].err_firstname.length==0} />:
                          <ErrorOutlineIcon fontSize="small" color="action" className="checkoutComponent1" />
                        )
                      }
                      </div>
                      <p className="validationMessage_acctinfo">{validationerr[0].err_firstname}</p>
                        <br/>
                    <div className="table_row">
                      <label htmlFor="lastname">Last Name </label>
                      <input className="pinput" type="text" id="lastname" defaultValue={item.lastname} disabled={disabledStatus.disabled2} onChange={setAcctParameter}></input>
                      {disabledStatus.disabled2?
                        <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => toggleDisabled(2)}/> :
                        (
                          validationerr[0].err_lastname.length==0?
                          <CheckIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => updateAccountInfo(2)}/>:
                          <ErrorOutlineIcon fontSize="small" color="action" className="checkoutComponent1" />
                        )

                      }
                    </div>
                    <p className="validationMessage_acctinfo">{validationerr[0].err_lastname}</p>
                    <br/>
                    <div className="table_row">
                      <label htmlFor="address">Email </label>
                      <input className="pinput" type="text" id="address" defaultValue={item.address} disabled={disabledStatus.disabled3} onChange={setAcctParameter}></input>
                      {disabledStatus.disabled3?
                      <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => toggleDisabled(3)}/> :
                      (
                        validationerr[0].err_address.length==0?
                        <CheckIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => updateAccountInfo(3)}/>:
                        <ErrorOutlineIcon fontSize="small" color="action" className="checkoutComponent1" />
                    )

                    }
                    </div>
                    <p className="validationMessage_acctinfo">{validationerr[0].err_address}</p>
                    <br/>
                    <div className="table_row">
                      <label htmlFor="username">Username </label>
                      <input className="pinput" type="text" id="username" defaultValue={item.username} disabled={disabledStatus.disabled4} onChange={setAcctParameter}></input>
                      {disabledStatus.disabled4?
                      <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => toggleDisabled(4)}/> :
                      (
                        validationerr[0].err_username.length==0?
                        <CheckIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => updateAccountInfo(4)}/>  :
                        <ErrorOutlineIcon fontSize="small" color="action" className="checkoutComponent1" />

                      )

                    }
                    </div>
                    <p className="validationMessage_acctinfo">{validationerr[0].err_username}</p>
                    <br/>
                    <div className="table_row">
                      <label htmlFor="password">Password </label>
                      <input className="pinput" type="password" id="password" defaultValue={item.password} disabled={disabledStatus.disabled5} onChange={setAcctParameter}></input>
                      {disabledStatus.disabled5?
                      <EditIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => toggleDisabled(5)}/> :
                      (
                        validationerr[0].err_password.length==0?
                        <CheckIcon fontSize="small" color="action" className="checkoutComponent1" onClick={() => updateAccountInfo(5)}/>:
                        <ErrorOutlineIcon fontSize="small" color="action" className="checkoutComponent1" />

                      )

                    }
                    </div>
                    <p className="validationMessage_acctinfo">{validationerr[0].err_password}</p>

                </div>
                  );
          })
        }
      </main>
    </div>
      );
}


export default AccountInfo;
