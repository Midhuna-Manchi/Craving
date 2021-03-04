import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import Login from '../../components/login/login';

function Signup(props) {
  const [error, setError] = useState(null);
  const firstname = useFormInput('First Name', '', setError);
  const lastname = useFormInput('Last Name', '', setError);
  const email = useFormInput('E-mail Address', '', setError);
  const username = useFormInput('Username', '', setError);
  const password = useFormInput('Password', '', setError);
  const [loading, setLoading] = useState(false);

  // handle button click of Signup form
  const handleSignup = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signup', { firstname: firstname.value, lastname: lastname.value, address: email.value, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
	<div className="outermost">
		<div className="intro_panel">

		</div>
        <img className="homeimg" src={require('../../Images/Home_image.png')} alt="Food" />
		<div className="login_panel">
			<h2>Sign-up</h2>
			<div className="LoginInputs">
				<input type="text" placeholder="First Name" {...firstname} ></input>
				<p class="validationMessage">{firstname.err_msg}</p>
        <input type="text" placeholder="Last Name"></input>
				<br/>
        <input type="text" placeholder="E-mail Address" {...email} ></input>
				<p class="validationMessage">{email.err_msg}</p>
        <input type="text" placeholder="Username" {...username}></input>
				<p class="validationMessage">{username.err_msg}</p>
				<input type="password" placeholder="Password" {...password}></input>
				<p class="validationMessage">{password.err_msg}</p>
			</div>
			<div className="login_button">
        <p class="validationMessage">{error}</p>
				<input type="button" value={loading ? 'Loading...' : 'Submit'} onClick={handleSignup} disabled={!(firstname.valid && email.valid && username.valid && password.valid)} />
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
        if(value.fieldName.toUpperCase() == 'PASSWORD')
        {
          if(e.target.value.length < 6)
          {
            new_valid = false;
            new_err_msg = '** ' + value.fieldName + ' must be alteast 6 characters long.'
          }
          else
          {
            new_valid = true;
            new_err_msg = '';
          }
        }
        else if(value.fieldName.toUpperCase() == 'E-MAIL ADDRESS')
        {
          if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(e.target.value))
          {
            new_valid = true;
            new_err_msg = '';
          }
          else
          {
            new_valid = false;
            new_err_msg = '** Please enter a valid ' + value.fieldName + '.'
          }
        }
        else
        {
          new_valid = true;
          new_err_msg = '';
        }
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
    onBlue: handleChange
  }
}

export default Signup;
