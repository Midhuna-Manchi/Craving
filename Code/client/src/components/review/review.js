import React,{Component, useState, useEffect} from 'react';
import axios from 'axios';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink} from 'react-router-dom';
import { TouchableOpacity } from 'react-native';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useHistory } from 'react-router-dom';

function Review(props)
{
  const [error, setError] = useState(null);
  const review = useFormInput('review', '', setError);
  const [reviewInfo, setReviewInfo] = useState([]);
  const[item,setItem]=useState({
              id:"",
          SmoothiesTitle :"",
          SmoothiesName:"",
          SmoothiesImage:"",
          Description:"",
          Calories:"",
          Price:"",
          ingredients:""
        });

  const[itemId,setItemId] = useState('');
  const[hidebox, setHidebox] = useState(true);

  const hideComponent = () => {
        setHidebox(false);
      }

  const handleReview = () => {
          setError(null);
          alert("Thank you for your feedback!!")
          axios.post('http://localhost:4000/users/review', { userId: props.userId, id: itemId, review: review.value}).then(response => {
            }).catch(error => {
              if (error.response.status === 401)
              setError(error.response.data.message);
              else
              setError("Something went wrong. Please try again later.");
            });
          }

useEffect(()=>{
      const itemId=props.match.params.Id;
      const item=props.menu_items.find(item=>item.id==itemId);
      setItem(item);
      setItemId(itemId);
      setError(null);
      axios.post('http://localhost:4000/review_info', {id : itemId}).then(response => {
          let reviewInfo = response.data.reviewInfo;
          setReviewInfo(reviewInfo);
          }).catch(err => {
             if (err.response.status === 401)
            setError(this.error.response.data.message);
             else
            setError("Something went wrong. Please try again later.");
           });
        },[item,props.match.params.Id]);

 if(item.SmoothiesImage=="") return null;

  return (

      <div className="row">
      <Nav />
      <main>

      <div className="table_row1">
      <div className="table_column1">
      <div className="firstblock1">
      <a href="/home">Back to List</a>
      <h4 className="stitle">{item.SmoothiesTitle}</h4>
          <img className="imageicon1" src={require(`../../Images/${item.SmoothiesImage}`)} alt="Smoothie"/>
          <h1 className="posttitle1">{item.SmoothiesTitle}</h1>
          <span className="postedby1">{item.SmoothiesName}</span>

      </div>
      </div>
      <div className="table_column3">

            <div> <b>Ingredients:</b> &nbsp; {item.ingredients} </div><br/>
            <div> <b>Description:</b> &nbsp; {item.Description} </div><br/>
            <div> <b>Calories:</b> &nbsp; {item.Calories} </div><br/>
              </div>
              </div>
     <div>
     Customer Reviews &nbsp; &nbsp; &nbsp;
     <input type="button" value="Leave Review" onClick={hideComponent}/>
     </div>
     {
       (!hidebox)?
    (<div className="subsPlanblock1">
     {props.userFirstName} says:
     <input className="pinput1" type="text" placeholder="type your review here" {...review}></input>
     <input className="pinput1" type="button" className="login_button1" value="Submit" onClick={handleReview}/>
    </div>):
    (<div> </div>)
     }
     <div >
     {
       reviewInfo.map(item =>{
         return(
           <div className="subsPlanblock1">
           {item.firstName} says: {item.review}
           </div>
         );
       })

      }
     </div>

            </main>
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
        if(value.fieldName.toUpperCase() == 'CARD NUMBER')
        {
          if(e.target.value.length < 16)
          {
            new_valid = false;
            new_err_msg = '** ' + value.fieldName + ' must be at least 16 characters long.'
          }
          else
          {
            new_valid = true;
            new_err_msg = '';
          }
        }
        else if(value.fieldName.toUpperCase() == 'EXPIRATION DATE')
        {
          if(/\d\d\/\d\d\d\d/.test(e.target.value))
          {
            new_valid = true;
            new_err_msg = '';
          }
          else
          {
            new_valid = false;
            new_err_msg = '** Please enter '+ value.fieldName +' valid format in MM/YYYY. '
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

export default Review;
