import React,{Component} from 'react';
import './style.css';
import Main from '../maincontent/main';


const Home = (props) => {
  //console.log("Home Entered. menu_items=" + JSON.stringify(props.menu_items));
  return (
      <div className="Home">
      <Main menu_items={props.menu_items} message={props.message} incrementItemCount={props.incrementItemCount} decrementItemCount={props.decrementItemCount}/>
      </div>
      );
}
export default Home;
