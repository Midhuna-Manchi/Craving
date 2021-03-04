require('dotenv').config();

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;

// static user details
userData = {};

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

//MySQL details
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Mallika@1990',
    database : 'cravings_db'
});

// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});


// validate the user credentials
app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  console.log("New signin request received with username=" + user + " and password=" + pwd);
  if (user && pwd)
  {
	connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [user, pwd], function(error, results, fields)
	{
			if (results.length > 0)
			{
				userData = results[0];
				// generate token
			    const token = utils.generateToken(userData);
			    // get basic user details
			    const userObj = utils.getCleanUser(userData);
			    // return the token along with user details
			    return res.json({ user: userObj, token });
			}
			else
			{
				// return 400 status if username/password is incorrect
				return res.status(401).json({
				error: true,
				message: "Username or Password is incorrect."
				});
			}
	});
  }
  else
  {
	// return 400 status if username/password is not exist
    return res.status(400).json({
      error: true,
      message: "Username and Password required."
    });
  }
});


// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.UserId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

// sign-up the user
app.post('/users/signup', function (req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const username = req.body.username;
  const pwd = req.body.password;

  if (firstname && username && pwd)
  {
  	connection.query('INSERT INTO users( FirstName, LastName, Address, Username, Password) VALUES (? ,? ,? ,? ,?);', [firstname, lastname, address, username, pwd], function(error, results, fields)
  	{
      if (!error)
      {
        console.log('User ' + firstname + ' sign-up successful.');
        return res.json({
    			error: false,
    			message: 'User ' + firstname + ' sign-up successful.'
  			});
  		}
  		else
  		{
  			// return 401 status if signup not successful
        console.log('User ' + firstname + ' sign-up failed.');
  			return res.status(401).json({
  			error: true,
  			message: 'error connecting: ' + error.stack
  			});
  		}
  	});
  }
  else
  {
	   // return 400 status if username/password is not exist
     return res.status(400).json({
      error: true,
      message: "Firstname, Username or Password required."
    });
  }
});

app.post('/users/getEmail', function (req, res) {
  const username = req.body.username;
  if (username)
  {
  	connection.query('SELECT Address, Password from users WHERE Username = ?;', [username], function(error, results, fields)
  	{
      if (results.length > 0)
      {
        if (!error)
        {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'midhu.sailu@gmail.com',
                pass: 'Mallika!1'
              }
            });
            var mailOptions = {
              from: 'midhu.sailu@gmail.com',
              to: results[0].Address,
              subject: 'Password Reset request from Cravings',
              text: 'Hi ' + username + ',\nYour new password is ' + results[0].Password + ".\nThanks & Regards,\nCravings Team"
            }

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.json({
                value : results,
          			error: false,
          			message: 'Password reset successful! Please check your e-mail \'' + results[0].Address + '\' for further instructions.'
        			});
            }
          });
          console.log('Password reset for ' + username + ' successful.');
    		}
    		else
    		{
    			// return 401 status if signup not successful
          console.log('Password retrieval failed for ' + username + '.');
    			return res.status(401).json({
    			error: true,
    			message: 'error connecting: ' + error.stack
    			});
    		}
      }
      else
    	{
    		// return 400 status if username/password is incorrect
    		return res.status(401).json({
    		error: true,
    		message: "Username or Password is incorrect."
    		});
    	}
  	});
  }
  else
  {
	   // return 400 status if username/password is not exist
     return res.status(400).json({
      error: true,
      message: "Username is required."
    });
  }
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});

// return the list of menu items
app.get('/menu', function (req, res) {
	connection.query('SELECT id, SmoothiesTitle, SmoothiesName, SmoothiesImage, Description, Calories, Price FROM menu', [], function(error, results, fields)
	{
		if (results.length > 0)
		{
			// return the list of menu items
			console.log(Date.now() + ": Fetched " + results.length + " items from menu.");
			return res.json({ menu_items: results });
		}
		else
		{
			// return 400 status if username/password is incorrect
			return res.status(400).json({
			error: true,
			message: "No menu items found."
			});
		}
		return res.status(401).json({
        error: true,
        message: "Something went wrong in menu retrieval."
      });
	});
});

// return the list of menu items
app.get('/subs_plans', function (req, res) {
	connection.query('SELECT PlanId, PlanType, PlanName, PlanDescription, PlanPrice, PlanSize FROM SUBSCRIPTION_PLANS', [], function(error, results, fields)
	{
		if (results.length > 0)
		{
			// return the list of menu items
			console.log("Fetched " + results.length + " plans from subscriptions.");
			return res.json({ subs_plans : results });
		}
		else
		{
			// return 400 status if no subscription plans were retrieved
			return res.status(400).json({
			error: true,
			message: "No subscription plans found."
			});
		}
		return res.status(401).json({
        error: true,
        message: "Something went wrong in subscription plans retrieval."
      });
	});
});

// Display Account Info
app.post('/users/accountInfo', function (req, res) {
  var user = req.body.userId;
  console.log("AccountInfo required for " + user);
  connection.query('SELECT firstname, lastname, address, username, password FROM users WHERE UserId = ?', [user], function(error, results, fields)
	{
			if (results.length > 0)
			{
        console.log("Fetched " + results.length + " account info from users.");
  			return res.json({ acct_info : results });
			}
			else
			{
				// return 400 status if username/password is incorrect
				return res.status(400).json({
				error: true,
				message: "Incorrect UserId."
				});
			}
	// return 400 status if username/password is not exist
    return res.status(401).json({
      error: true,
      message: "Something went wrong in accountinfo withdrawl."
    });
  });
});

//Inserting into payment information

// PaymentInfo of the user
app.post('/users/paymentInfo', function (req, res) {
  var userId = req.body.userId;
  const name = req.body.name;
  const cardNo = req.body.cardNo;
  const expiryDt = req.body.expiryDt;
  const securityCd = req.body.securityCd;
  const streetadd = req.body.streetadd;
  const city = req.body.city;
  const state = req.body.state;
  const zipCd = req.body.zipCd;
  const country = req.body.country;

  connection.query('INSERT INTO payment( userId, name, cardNo, expiryDt, securityCd, streetadd, city, state, zipCd, country) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,?);', [userId, name, cardNo, expiryDt, securityCd, streetadd, city, state, zipCd, country], function(error, results, fields)
  	{
      if (!error)
      {
        console.log('User ' + name + ' Payment details entered successfully.');
        return res.json({
    			error: false,
    			message: 'User ' + name + ' Payment details entered successfully.'
  			});
  		}
  		else
  		{
  			// return 401 status if signup not successful
        console.log('User ' + name + ' Payment details failed.');
  			return res.status(401).json({
  			error: true,
  			message: 'error connecting: ' + error.stack
  			});
  		}

	   // return 400 status if username/password is not exist
     return res.status(400).json({
      error: true,
      message: "Cardno , securityCd are required"
    });
  });
});


app.post('/updateaccountInfo', function (req, res) {
  var userId = req.body.userId;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var address = req.body.address;
  var username = req.body.username;
  var pwd = req.body.password;

  console.log(firstname+"|"+lastname+"|"+address+"|"+username+"|"+pwd);

    connection.query('UPDATE users set FirstName=?, LastName=?, Address=?, Username=?, Password=? WHERE UserId=?;', [firstname, lastname, address, username, pwd, userId], function(error, results, fields)
    {
      if (!error)
      {
        console.log('User ' + firstname + ' account details updated successfully.');
        return res.json({
    			error: false,
    			message: 'User ' + firstname + ' account details updated successfully.'
  			});
  		}
  		else
  		{
  			// return 401 status if signup not successful
        console.log('User ' + firstname + ' update failed.');
  			return res.status(401).json({
  			error: true,
  			message: 'error connecting: ' + error.stack
  			});
  		}

	   // return 400 status if username/password is not exist
     return res.status(400).json({
      error: true,
      message: "all the fields required"
    });
  });
});
