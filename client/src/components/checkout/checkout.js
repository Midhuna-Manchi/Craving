import React,{useState,useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import { TouchableOpacity } from 'react-native';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

function Checkout(props)
{
  return (
    <div className="row_c">
      <Nav />
      <main>
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
    </div>
      );
}

export default Checkout;
