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
      <Titlebar history={props.history} menu_items={props.menu_items} userId={props.userId} userFirstName={props.userFirstName} subsCount={props.subsCount} itemsCount={props.itemsCount} setaccountInfo={props.setaccountInfo}/>
      </div>
      </header>
      <Border/>
      </div>
      );

}
export default Header;
