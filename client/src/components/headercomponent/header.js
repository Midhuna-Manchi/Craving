import React,{Component} from 'react';
import './style.css';
import Logo from '../logo/logo';
import Titlebar from '../titlebar/titlebar';
import Border from '../border/border';

function Header(props)
{

  return (
    <div>
      <header>
      <div className="flexbox">
      <Logo/>
      <Titlebar menu_items={props.menu_items} userId={props.userId} userFirstName={props.userFirstName} subsCount={props.subsCount} itemsCount={props.itemsCount}/>
      </div>
      </header>
      <Border/>
      </div>
      );

}
export default Header;
