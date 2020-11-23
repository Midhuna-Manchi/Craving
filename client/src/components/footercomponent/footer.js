import React,{Component} from 'react';
import './style.css';
import Border from '../border/border';

class Footer extends React.Component{
render() {
  return (
    <div>
    <Border/>
    <footer>
        <p>Copyright © Craving.com</p>
    </footer>
    </div>
      );
}
}
export default Footer;
