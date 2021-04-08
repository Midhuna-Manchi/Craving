import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import './style.css';
import {NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';


function TicketHistory(props) {
        const [error, setError] = useState(null);
        const [ticketInfo, setTicketInfo] = useState([]);
        const handleComments = () => {
                setError(null);
                axios.post('http://localhost:4000/ticket_info', {userId: props.userId}).then(response => {
                console.log(response.data.ticketInfo);
                let ticketInfo = response.data.ticketInfo;
                console.log(ticketInfo);
                setTicketInfo(ticketInfo);

                }).catch(error => {
                    if (error.response.status === 401)
                    setError(error.response.data.message);
                    else
                    setError("Something went wrong. Please try again later.");
                  });
                }

return(
   <div className="row_a">
   <nav className="navbar">
   <div className="link">
   <NavLink className="home" to="/submitticket">Submit Ticket</NavLink>
   <NavLink className="home1" to="/tickethistory">Ticket History</NavLink>
   </div>
   </nav>
   <main>
      <div className="table_row1">

      <div className="table_column1">
      <h3> Ticket ID </h3>
      <p> S01-36492 </p>
      <p> S01-36493 </p>
      </div>

      <div className="table_column1">
      <h3> Date Submitted </h3>
      <p> 03/09/2021 </p>
      <p> 04/01/2021 </p>
 			</div>

      <div className="table_column1">
      <h3> Date Resolved </h3>
      <p> 03/13/2021 </p>
      <p> 04/06/2021 </p>
 			</div>

      <div className="table_column1">
      <h3> Status </h3>
      <p>Open</p>
      <p>Closed</p>
      </div>

      <div className="table_column1">
      <h3> Details </h3>
      <Popup trigger={<li><a className="popuplink" onClick={handleComments}>Info</a></li>} position="right center">
      <div>
      {
        ticketInfo.map(item =>{
          return(
            <div>Comments : {item.comments}</div>
          );

      })
      }
      </div>
      </Popup>
      <Popup trigger={<li><a className="popuplink">Info</a></li>} position="right center">
      <div>
      {
        ticketInfo.map(item =>{
          return(
            <div> Comments : {item.comments}</div>
          );

      })
      }
      </div>
      </Popup>
      </div>

  </div>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  </main>
 	</div>
 );

}


export default TicketHistory;
