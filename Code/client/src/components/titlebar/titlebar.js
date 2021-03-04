import React,{Component, useState, useEffect} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { getUser } from '../../Utils/Common';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Titlebar(props)
{
  const [error, setError] = useState(null);
  let history = useHistory();
  //console.log("Titlebar entered. menu_items=" + JSON.stringify(props.menu_items) + "\nUser = " + props.userId + ", " + props.firstName);

  function myFunc(sum, item)
  {
    return sum + item["quantity"];
  }

  const fetchaccountInfo = () => {
  setError(null);
  axios.post('http://localhost:4000/users/accountinfo', {userId : props.userId}).then(response => {
//  console.log('Received data from server as ' + JSON.stringify(response.data.acct_info));
  let acct_info = response.data.acct_info;
  props.setaccountInfo(acct_info);
  history.push('/accountInfo');
  console.log('Received data from server as ' + JSON.stringify(acct_info));
}).catch(error => {
  setError(error.response.data.message);
  });
  }

  if(props.userId == '')
  {
    return (
              <nav className="titlebar">
                <NavLink className="bar" to="/home"><HomeIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/accountInfo"><InfoIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/login"><PowerSettingsNewIcon fontSize="large" className="checkoutComponent"/></NavLink>
              </nav>
            )
    }
  else {
    return (
              <nav className="titlebar">
                <NavLink className="bar" to="/checkout">
                  <div className="checkout">
                    <p className="checkoutComponent">{props.itemsCount}/{props.subsCount}</p>
                    <ShoppingCartIcon fontSize="small" className="checkoutComponent"/>
                  </div>
                </NavLink>
                <NavLink className="bar" to="/subPlans"><PlaylistAddIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/home"><HomeIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/home"><InfoIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/home"><HelpIcon fontSize="large" className="checkoutComponent"/></NavLink>
                <NavLink className="bar" to="/accountInfo">
                  <div className="checkout">
                    <AccountCircleIcon fontSize="small" className="checkoutComponent" onClick={() => fetchaccountInfo()} />
                    <p className="checkoutComponent">{props.userFirstName}</p>
                  </div>
                </NavLink>
                <NavLink className="bar" to="/">
                  <div className="checkout">
                    <PowerSettingsNewIcon fontSize="large" className="checkoutComponent"/>
                  </div>
                </NavLink>
              </nav>
            )
  }
};

export default Titlebar;
