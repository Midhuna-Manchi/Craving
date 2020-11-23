import React,{Component} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			selection:"login"
		}
	}
	
	render()
	{
	  return (
		<div className="outermost">
			<div className="inner">
				<div className="selection_panel">
					<button className="panel_button" value="login" onClick={(e) => this.setState({selection:"login"})}>Login</button>
					<button className="panel_button" value="signup" onClick={(e) => this.setState({selection:"signin"})}>Sign-Up</button>
				</div>
				{this.state.selection == "login" ?
					(
						<div className="reflection_panel">
							<div className="LoginInputs">
								<p>Username</p>
								<input type="text" id="username"></input>
								<p>Password</p>
								<input type="text" id="password"></input>
							</div>
							<br/>
							<button className="login_button">Submit</button>
						</div>
					) :
					(
						<div className="reflection_panel">
							<div className="LoginInputs">
								<p>Fisrt Name</p>
								<input type="text" id="fisrt_name"></input>
								<p>Last Name</p>
								<input type="text" id="last_name"></input>
								<p>Address</p>
								<input type="text" id="address"></input>
								<p>Contact #</p>
								<input type="text" id="contact"></input>
								<p>Username</p>
								<input type="text" id="username"></input>
								<p>Password</p>
								<input type="text" id="password"></input>
							</div>
							<br/>
							<button className="signup_button">Submit</button>
						</div>
					)
				}
			</div>
		</div>
		);
	}
}
export default Login;
