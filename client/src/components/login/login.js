import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import { withRouter } from 'react-router-dom';

function Login(props) {
  const [error, setError] = useState(null);
  const username = useFormInput('Username' ,'', setError);
  const password = useFormInput('Password' ,'', setError);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
      setError(null);
      setLoading(true);
      axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
        console.log('Received data from server as ' + JSON.stringify(response.data.user));
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.setUser(response.data.user);
        props.history.push('/home');
      }).catch(error => {
         setLoading(false);
         setError(error.response.data.message);
       });
  }

  return (
	<div className="outermost">
		<div className="intro_panel">

    </div>

      <img className="homeimg" src={require('../../Images/Home_image.png')} alt="Food" />

    <div className="login_panel">
			<h2>Login</h2>
			<div className="LoginInputs">
				<input type="text" placeholder="Username" {...username}></input>
        <p class="validationMessage">{username.err_msg}</p>
				<input type="password" placeholder="Password" {...password}></input>
        <p class="validationMessage">{password.err_msg}</p>
			</div>
			<div className="login_button">
				<input width="50%" type="button" value='Submit' onClick={handleLogin} disabled={!(username.valid && password.valid)} />
        <p class="validationMessage">{error}</p>
        <p className="links">Forgot Password?&nbsp;<Link to="/restoreCreds">Click Here</Link></p>
        <p className="links">New User?&nbsp;<Link to="/signup">Click Here</Link></p>
			</div>
		</div>
	</div>
  );
}

const useFormInput = (fieldName, initialValue, setError) => {
  const [value, setValue] = useState({"fieldName":fieldName, "value":initialValue, "valid":false, "err_msg":""});

  const handleChange = e => {
    console.log(value.fieldName + ' value has changed.');

    // validate the data for accuracy
    var new_valid = ''
    var new_err_msg = ''
    if(e.target.value == '')
    {
        new_valid = false;
        new_err_msg = '** ' + value.fieldName + ' cannot be blank.'
    }
    else
    {
        new_valid = true;
        new_err_msg = '';
    }


    var new_value = {"fieldName":value.fieldName, "value": e.target.value, "valid": new_valid, "err_msg": new_err_msg};
    setValue(new_value);
    setError(false);
    console.log(JSON.stringify(new_value));
  }
  return {
    value: value.value,
    valid: value.valid,
    err_msg: value.err_msg,
    onChange: handleChange,
    onBlur: handleChange
  }
}


export default Login;
