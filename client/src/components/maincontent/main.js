import React,{useState,useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import { TouchableOpacity } from 'react-native';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactDOM from 'react-dom';

function Main(props)
{
  return (
    <div className="row">
      <Nav />
      <main>
        <div className="error-message-box">
          {
            props.message.map(item => {
              if(item == "No subscriptions found.")
              {
                return (<p className="error-message">No subscriptions found. Please select a subscriptons plan&nbsp;<NavLink to={`/subPlans`}>here</NavLink>.</p>)
              }
              else if (item == "Subscription full.")
              {
                return (<p className="error-message">Your subscriptions is full. Please select an upgraded subscriptons plan&nbsp;<NavLink to={`/subPlans`}>here</NavLink>.</p>)
              }
            })
          }
        </div>
        <div className="flexbox-container">
        {
          props.menu_items.map(item=>{
            return(
                    <div className="firstblock">
                      <img className="imageicon" src={require(`../../Images/${item.SmoothiesImage}`)} alt="Nature" align="center" />
                        <NavLink key={item.id} to={`/menu/${item.id}`}>
                          <h1 className="posttitle">{item.SmoothiesTitle}</h1>
                        </NavLink>
                        <span className="postedby">{item.SmoothiesName}</span>
                        <div className="item_orders">
                          <TouchableOpacity className="orderButton" onPress={() => props.decrementItemCount(item.id)}>
                            <RemoveCircleIcon/>
                          </TouchableOpacity>
                          <span className="quantity">{item.quantity}</span>
                          <TouchableOpacity className="orderButton" onPress={() => props.incrementItemCount(item.id)}>
                            <AddCircleIcon/>
                          </TouchableOpacity>
                        </div>
                        <div className="postMessage">
                          {item.message}
                        </div>
                    </div>
                  );
          })
        }
        </div>
      </main>
    </div>
      );
}

export default Main;
