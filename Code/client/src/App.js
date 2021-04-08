import React,{Component, useState, useEffect} from 'react';
import Header from './components/headercomponent/header';
import Footer from './components/footercomponent/footer';
import Post from './components/post/post';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import SubsPlans from './components/subPlans/subPlans';
import Checkout from './components/checkout/checkout';
import RestoreCreds from './components/restoreCreds/restoreCredsInput';
import AccountInfo from './components/accountinfo/accountInfo';
import PaymentInfo from './components/paymentInfo/paymentInfo';
import Delivery from './components/delivery/delivery';
import PaymentProcessing from './components/paymentprocessing/paymentprocessing';
import SubmitTicket from './components/submitticket/submitticket';
import TicketHistory from './components/history/tickethistory';
import TeamInfo from './components/teaminfo/teaminfo';

import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import axios from 'axios';
import { getUser } from './Utils/Common';
import Moment from 'moment';


class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      menu_items : [],
      accountInfo: [],
      userId  : '',
      firstName : '',
      address  : '',
      subsCount : 0,
      itemsCount : 0,
      message : [],
      error : null,
      dateYMD : null,
      selectedPlanId : null,
      selectedPlanPrice : null
    };
    this.fetchMenuItem = this.fetchMenuItem.bind(this);
  }

  setMenuItems = (props) => {
    this.setState({menu_items:props});
  }

  setSubsCount = (props) => {
    this.setState({subsCount:props});
  }

  setItemsCount = (props) => {
    this.setState({itemsCount:props});
  }

  setUser = (props) => {
    console.log("Setting value of user to " + JSON.stringify(props));
    this.setState({userId:props.userId});
    this.setState({firstName:props.firstName});
    this.setState({address:props.address});
  }

  setPlanId = (props) => {
    this.setState({selectedPlanId:props});
  }

  setPlanPrice = (props) => {
    this.setState({selectedPlanPrice:props});
  }

  setaccountInfo = (props) => {
    this.setState({accountInfo:props});
  }

  setError = (props) => {
    this.setState({error:props});
  }

fetchMenuItem = () => {
   	this.setError(null);
   	axios.get('http://localhost:4000/menu', {}).then(response => {
   		let menu_items = response.data.menu_items;
       menu_items.forEach(function(e){
           e["quantity"] = 0;
       });
   		this.setMenuItems(menu_items);
       }).catch(err => {
         if (err.response.status === 401)
   		  this.setError(this.error.response.data.message);
         else
   		  this.setError("Something went wrong. Please try again later.");
       });
  }

  setMessage = (msg) => {
    this.setState({message:msg});
  }

  incrementItemCount = (itemKey) => {
    var new_menu = this.state.menu_items;
    if(this.state.subsCount == 0)
    {
      this.setMessage(["No subscriptions found."]);
    }
    else if(this.state.itemsCount >= this.state.subsCount)
    {
      this.setMessage(["Subscription full."]);
    }
    else
    {
      new_menu = this.state.menu_items.map((item, index) => {
        if (index == itemKey - 1)
        {
            item["quantity"] = item["quantity"] + 1;
            this.setItemsCount(this.state.itemsCount + 1);
        }
        return item;
      });
    }
    this.setMenuItems(new_menu);
  }

  decrementItemCount = (itemKey) => {
    console.log('decrementing');
    const new_menu = this.state.menu_items.map((item, index) => {
      if (index == itemKey - 1 && this.state.itemsCount > 0)
      {
        if(item["quantity"] > 0)
        {
          item["quantity"] = item["quantity"] - 1;
          this.setItemsCount(this.state.itemsCount - 1);
        }
      }
      return item;
    });
    this.setMenuItems(new_menu);
  }

  componentWillMount()
  {
     this.fetchMenuItem();
  };

  render() {
    return (
      <Router className="App">
  		<Header menu_items={this.state.menu_items} userId={this.state.userId} userFirstName={this.state.firstName} subsCount={this.state.subsCount} itemsCount={this.state.itemsCount} setaccountInfo={this.setaccountInfo}/>
  		<Switch>
        <Route path="/" exact render={(props) => (<Login {...props} setUser={this.setUser}/>)} />
        <Route path="/login" exact render={(props) => (<Login {...props} setUser={this.setUser} />)} />
        <Route path="/signup" exact component={Signup}/>
  			<Route path="/home" exact render={(props) => (<Home menu_items={this.state.menu_items} message={this.state.message} incrementItemCount={this.incrementItemCount} decrementItemCount={this.decrementItemCount}/>)}/>
        <Route path="/subPlans" render={(props) => (<SubsPlans {...props} setSubsCount={this.setSubsCount} setMessage={this.setMessage} subsCount={this.state.subsCount} itemsCount={this.state.itemsCount} selectedPlanId={this.state.selectedPlanId} setPlanId={this.setPlanId} selectedPlanPrice={this.state.selectedPlanPrice} setPlanPrice={this.setPlanPrice}/>)}/>
  			<Route path="/post/:postId" exact component={Post}/>
        <Route path="/checkout" exact render={(props) => (<Checkout menu_items={this.state.menu_items} userId={this.state.userId} itemsCount={this.state.itemsCount} selectedPlanPrice={this.state.selectedPlanPrice}/>)}/>
        <Route path="/restoreCreds" exact render={(props) => (<RestoreCreds {...props}/>)} />
        <Route path="/paymentprocessing" exact render={(props) => (<PaymentProcessing {...props}/>)} />
        <Route path="/accountInfo" exact render={(props) => (<AccountInfo {...props} userId={this.state.userId}/>)} />
        <Route path="/paymentInfo" exact render={(props) => (<PaymentInfo {...props} userId={this.state.userId} userFirstName={this.state.firstName}/>)} />
        <Route path="/delivery" exact render={(props) => (<Delivery {...props} userId={this.state.userId} userFirstName={this.state.firstName} />)} />
        <Route path="/submitticket" exact render={(props) => (<SubmitTicket {...props} userId={this.state.userId} userFirstName={this.state.firstName} userAddress={this.state.address}/>)} />
        <Route path="/tickethistory" exact render={(props) => (<TicketHistory {...props} userId={this.state.userId} userFirstName={this.state.firstName} />)} />
        <Route path="/teaminfo" exact render={(props) => (<TeamInfo {...props} userId={this.state.userId} userFirstName={this.state.firstName} />)} />
      </Switch>
  		<Footer />
      </Router>
    );
  };
}
export default App;
