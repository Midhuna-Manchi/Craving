import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import Login from '../../components/login/login';
import { Link } from 'react-router-dom';

function RestoreCreds(props) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const username = useFormInput('Username', '', setError);
  const [loading, setLoading] = useState(false);

  // handle button click of Signup form
  const handleClick = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/getEmail', { username: username.value }).then(response => {
      setLoading(false);
      setEmail(response.data);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
  <div className="outermost">
  {
    email == "" ?
	 <div className="floating_central_block">
    <div className="title">
		  <h2>Reset Password</h2>
    </div>
    <p class="userMessage">Please enter username:&nbsp;&nbsp;&nbsp;<input type="text" placeholder="Username" {...username}></input></p>
    <div className="title">
		  <p class="validationMessage">{username.err_msg}</p>
      <p class="validationMessage">{error}</p>
    </div>
    <div className="title">
		  <input type="button" value={loading ? 'Loading...' : 'Submit'} onClick={handleClick} disabled={!(username.valid)} />
    </div>
	 </div>
  :
    <div className="floating_central_block">
     <div className="title">
 		  <h2 class="statusMessage">{email.message}</h2>
      <Link className="loginLink" to="/login">&lt;&lt; Back to Login</Link>
     </div>

 	 </div>
  }
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

export default RestoreCreds;
